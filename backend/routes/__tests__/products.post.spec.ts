import type {Server} from 'http';
import {agent as request} from 'supertest';

import * as dbMock from '../../__mocks__/mongo.db';
import Product from '../../models/Product';
import {NodeServer} from '../../server';
import messages from '../../server/messages';

const PRODUCTS_PATH = `/api/v1/products`;
const {SUCCESSFUL_ADDED, INCOMPLETE_REQUEST, INTERNAL_SERVER_ERROR} = messages;

describe(`Testing POST "${PRODUCTS_PATH}" routes`, () => {
  jest.spyOn(NodeServer.prototype, 'start').mockImplementation(jest.fn());
  const ProductSave = jest.spyOn(Product.prototype, 'save');
  let appInstance: NodeServer;
  let server: Server;

  const PAYLOAD: IProduct = {
    name: 'Mortal Kombat 3',
    size: 'S',
    unitaryPrice: 3.99,
    description: 'A 1995 arcade fighting game developed by Midway Games.',
  };

  beforeAll(async () => {
    await dbMock.setUp();
    appInstance = new NodeServer();
    server = appInstance.server;
  });

  afterEach(async () => {
    await dbMock.dropCollections();
    ProductSave.mockClear();
  });

  afterAll(async () => {
    await dbMock.dropDatabase();
    server.close();
  });

  it(`should respond with the Product entity created`, async () => {
    // odd fix for Jest open handle error
    await Promise.resolve(process.nextTick(Boolean));
    const reply = await request(server).post(PRODUCTS_PATH).send(PAYLOAD);
    const outData: IProduct = reply.body.data;

    expect(reply.statusCode).toEqual(200);
    expect(outData._id).toBeDefined();
    expect(outData.createdAt).toBeDefined();
    expect(outData.name).toBe(PAYLOAD.name);
    expect(ProductSave).toHaveBeenCalledTimes(1);
    expect(reply.body.message).toBe(SUCCESSFUL_ADDED.message);
  });

  it(`should return a 422 error when the body parameters are not valid`, async () => {
    // odd fix for Jest open handle error
    await Promise.resolve(process.nextTick(Boolean));
    const reply = await request(server).post(PRODUCTS_PATH).send({});
    const response: ServerResponse = reply.body;
    const error = response.error;

    expect(response.statusCode).toBe(422);
    expect(response.message).toBe(INCOMPLETE_REQUEST.message);
    expect(response.success).toBe(false);
    expect(error.message).toBe('Required parameters missing');
    expect(error.stack).toContain('There are errors in the body payload');
  });

  it(`should return a 500 error when adding a product to the database`, async () => {
    ProductSave.mockRejectedValue(new Error('Database error'));

    // odd fix for Jest open handle error
    await Promise.resolve(process.nextTick(Boolean));
    const reply = await request(server).post(PRODUCTS_PATH).send(PAYLOAD);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(INTERNAL_SERVER_ERROR.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toBe('Database error');
    expect(response.error.stack).toBeDefined();
  });
});
