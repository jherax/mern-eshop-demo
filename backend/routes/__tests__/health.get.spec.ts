import type {Server} from 'http';
import {agent as request} from 'supertest';

import HealthCheck from '../../models/HealthCheck';
import {NodeServer} from '../../server';
import messages from '../../server/messages';

const {SERVICE_UNAVAILABLE, INTERNAL_SERVER_ERROR, TOO_MANY_REQUESTS} =
  messages;

describe(`Testing GET "/healthcheck"`, () => {
  jest.spyOn(NodeServer.prototype, 'start').mockImplementation(jest.fn());
  const findOneAndUpdateSpy = jest.spyOn(HealthCheck, 'findOneAndUpdate');
  let appInstance: NodeServer;
  let server: Server;

  beforeAll(async () => {
    appInstance = new NodeServer();
    server = appInstance.server;
  });

  afterEach(() => {
    findOneAndUpdateSpy.mockClear();
  });

  afterAll(() => {
    server.close();
  });

  it(`should respond with the check event from the database`, async () => {
    findOneAndUpdateSpy.mockResolvedValue({
      id: '64da7432ad8c2e8f887b75b8',
      event: 'check',
    });

    const reply = await request(server).get(`/healthcheck`);
    const response: ServerResponse = reply.body;

    expect(reply.statusCode).toEqual(200);
    expect(response.data).toStrictEqual({
      server: {isUp: true},
      database: {isUp: true},
    });
    expect(findOneAndUpdateSpy).toHaveBeenCalledWith(
      {event: 'check'},
      {event: 'check'},
      {new: true, upsert: true},
    );
  });

  // Tests that when the database is down, a service unavailable response is sent
  it('should send 503 service unavailable response when database is down', async () => {
    findOneAndUpdateSpy.mockResolvedValue(null);

    const reply = await request(server).get(`/healthcheck`);
    const response: ServerResponse = reply.body;

    expect(reply.statusCode).toEqual(503);
    expect(response.message).toBe(SERVICE_UNAVAILABLE.message);
    expect(response.data).toStrictEqual({
      server: {isUp: true},
      database: {isUp: false},
    });
  });

  // Tests that when an error occurs, an error response is sent
  it('should send error 500 response when an error occurs', async () => {
    findOneAndUpdateSpy.mockRejectedValue(new Error('Database error'));

    const reply = await request(server).get(`/healthcheck`);
    const response: ServerResponse = reply.body;

    expect(reply.statusCode).toEqual(500);
    expect(response.message).toBe(INTERNAL_SERVER_ERROR.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toBe('Database error');
    expect(response.error.stack).toBeDefined();
  });

  // Tests that the rate limiter middleware is used when making a GET request to '/healthcheck'
  it('should use rate limiter middleware and get an error for limit of requests exceeded', async () => {
    // limit each IP to 3 requests per window (every hour)
    const responses = await Promise.all([
      request(server).get(`/healthcheck`),
      request(server).get(`/healthcheck`),
      request(server).get(`/healthcheck`),
    ]);

    const lastResponse: ServerResponse = responses.pop().body;
    expect(lastResponse).toStrictEqual({
      message: TOO_MANY_REQUESTS.message,
      statusCode: 429,
      success: false,
      error: {
        message: 'Limit of requests exceeded, please try again later',
        stack: null,
      },
    });
  });
});
