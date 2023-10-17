import type {Server} from 'http';
import mongoose, {type Mongoose} from 'mongoose';

import config from '../../config/server.cfg';
import {initServer} from '../../server';
import connectDb from '../mongodb';

const {host, port, database, username, password} = config.db;

const expectedArgs = {
  connectSuccess: '🍃 MongoDB is connected',
  connectFail: '🍃 MongoDB connection failed, retry in 2 secs.',
  connectUrl: `mongodb://${username}:${password}@${host}:${port}/${database}`,
  connectOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
  },
};

describe('Connect database with retry', () => {
  // prevent the console methods from writting the terminal
  const logError = jest.spyOn(console, 'error').mockImplementation(jest.fn());
  const logInfo = jest.spyOn(console, 'info').mockImplementation(jest.fn());
  let server: Server;

  beforeAll(async () => {
    const TIMESTAMP = new Date().toISOString();
    jest.useFakeTimers().setSystemTime(new Date(TIMESTAMP));
    server = await initServer();
  });

  beforeEach(() => {
    logInfo.mockClear();
  });

  afterAll(() => {
    jest.clearAllTimers();
    server.close();
  });

  // Tests that the function successfully connects to MongoDB
  it('should connect to MongoDB', async () => {
    const mongooseConnectSpy = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      .mockReturnValue(Promise.resolve(mongoose));

    await connectDb(server);
    const {connectUrl, connectOptions, connectSuccess} = expectedArgs;
    expect(mongooseConnectSpy).toBeCalledWith(connectUrl, connectOptions);
    expect(logInfo).toBeCalledWith(connectSuccess);
    mongooseConnectSpy.mockRestore();
  });

  // Tests that the function emits a 'ready' event on successful connection
  it('should emit a "ready" event on successful connection', async () => {
    const mongooseConnectSpy = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      .mockReturnValue(Promise.resolve(mongoose));

    const serverEmitSpy = jest.spyOn(server, 'emit');

    await connectDb(server);
    expect(serverEmitSpy).toHaveBeenCalledWith('ready');
    mongooseConnectSpy.mockRestore();
  });

  // Tests that the function fails to connect to MongoDB
  it('should fail to connect to MongoDB', async () => {
    const errorMsg = 'Reject connection to MongoDB';
    const mongooseConnectSpy = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      .mockReturnValueOnce(Promise.reject(Error(errorMsg)));
    try {
      await connectDb(server);
    } catch (error) {
      const {connectUrl, connectOptions, connectFail} = expectedArgs;
      expect(mongooseConnectSpy).toBeCalledWith(connectUrl, connectOptions);
      expect(logInfo).toBeCalledWith(connectFail);
      expect(logError).toHaveBeenCalled();
      expect(setTimeout).toHaveBeenCalled();
      mongooseConnectSpy.mockRestore();
    }
  });
});
