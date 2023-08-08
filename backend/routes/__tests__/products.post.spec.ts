import type {Server} from 'http';
import {agent as request} from 'supertest';

import * as dbMock from '../../__mocks__/mongo.db';
import Product from '../../models/Product';
import {init} from '../../server';

let server: Server;
const v1 = '/api/v1';

beforeAll(async () => {
  await dbMock.setUp();
  server = await init();
});

afterEach(async () => {
  await dbMock.dropCollections();
});

afterAll(async () => {
  await dbMock.dropDatabase();
  server.close();
});

describe('Testing server routes', () => {
  it(`POST "${v1}/products" responsd with the entity created`, async () => {
    const ProductSave = jest.spyOn(Product.prototype, 'save');

    const payload: IProduct = {
      name: 'Mortal Kombat 3',
      size: 'S',
      unitaryPrice: 3.99,
      description:
        'Mortal Kombat 3 is a 1995 arcade fighting game developed by Midway Games.',
    };

    const reply = await request(server)
      .post(`${v1}/products`)
      .field('name', payload.name)
      .field('size', payload.size)
      .field('unitaryPrice', payload.unitaryPrice)
      .field('description', payload.description);
    const outData: IProduct = reply.body.data;

    expect(reply.statusCode).toEqual(200);
    expect(outData._id).toBeDefined();
    expect(outData.createdAt).toBeDefined();
    expect(outData.name).toBe(payload.name);
    expect(ProductSave).toHaveBeenCalledTimes(1);
  });
});
