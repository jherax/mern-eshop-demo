import {setTimeout} from 'node:timers/promises';

import type {Server} from 'http';
import mongoose, {type Mongoose} from 'mongoose';

import {initServer} from '../../server';
import config from '../../server/config';
import logger from '../../utils/logger';
import connectDb from '../mongodb';

const {host, port, database, username, password} = config.db;
const connectUrl = `mongodb://${username}:${password}@${host}:${port}/${database}`;
const connectOptions: mongoose.ConnectOptions = {
  autoIndex: false,
};

jest.mock('node:timers/promises', () => {
  return {setTimeout: jest.fn().mockResolvedValue(void 0)};
});

// prevent the logger methods from writting the terminal
jest.mock('../../utils/logger', () => {
  return {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
});

describe('Connect database with retry using MongoDB and Mongoose', () => {
  let server: Server;

  beforeAll(async () => {
    server = await initServer();
  });

  afterAll(() => {
    server.close();
  });

  // Database connection is successfully established with MongoDB
  it('should emit SERVER_READY event when database connection is successful', async () => {
    const connectMock = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      .mockReturnValueOnce(Promise.resolve(mongoose));

    await connectDb(server);
    expect(connectMock).toHaveBeenCalledWith(connectUrl, connectOptions);
    expect(logger.info).toHaveBeenCalledWith('🍃 MongoDB is connected');
    connectMock.mockRestore();
  });

  // Invalid database credentials result in connection failure (with retries)
  it('should log error when database connection fails', async () => {
    const errorMsg = 'Maximum number of connection retries reached';
    const rejection = new Error('Authentication failed');
    const connecMock = jest
      .spyOn<Mongoose, 'connect'>(mongoose, 'connect')
      .mockRejectedValue(rejection);

    try {
      await connectDb(server);
    } catch (error) {
      expect(connecMock).toHaveBeenCalledTimes(5);
      expect(setTimeout).toHaveBeenCalledTimes(4);
      expect(logger.warn).toHaveBeenCalledTimes(4);
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error.message).toBe(errorMsg);
    }
  });
});
