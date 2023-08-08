import type {Server} from 'http';
import {agent as request} from 'supertest';

import productsMock from '../../__mocks__/products.json';
import Product from '../../models/Product';
import {init} from '../../server';

const v1 = '/api/v1';
let server: Server;

beforeAll(async () => {
  const jsonValues: IProduct[] = productsMock;
  const exec = jest.fn().mockResolvedValue(jsonValues);
  const lean = jest.fn(() => ({exec}));
  Product.find = jest.fn(() => ({lean} as never));
  server = await init();
});

afterAll(() => {
  server.close();
});

describe('Testing server routes', () => {
  it(`GET "${v1}/products" responds with list of Product`, async () => {
    const reply = await request(server).get(`${v1}/products`);
    expect(reply.statusCode).toEqual(200);
    expect(reply.body.data).toHaveLength(2);
    expect(Product.find).toHaveBeenCalledTimes(1);
  });
});
