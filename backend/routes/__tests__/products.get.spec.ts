import type {Server} from 'http';
import {agent as request} from 'supertest';

import productsMock from '../../__mocks__/products.json';
import Product from '../../models/Product';
import {initServer} from '../../server';
import messages from '../../server/messages';

let server: Server;
const v1 = '/api/v1';
const {SUCCESSFUL, INTERNAL_SERVER_ERROR} = messages;

beforeAll(async () => {
  server = await initServer();
});

afterAll(() => {
  server.close();
});

describe(`Testing GET "${v1}/products" routes`, () => {
  it(`should respond with a list of Product`, async () => {
    mockProductFind(productsMock);
    const reply = await request(server).get(`${v1}/products`);
    expect(reply.statusCode).toEqual(200);
    expect(reply.body.data).toHaveLength(2);
    expect(Product.find).toHaveBeenCalledTimes(1);
  });

  it(`should respond with an empty list`, async () => {
    mockProductFind([]);
    const reply = await request(server).get(`${v1}/products`);
    const response: ServerResponse = reply.body;
    expect(response).toStrictEqual({
      statusCode: 200,
      message: SUCCESSFUL.message,
      success: true,
      data: [],
    });
    expect(Product.find).toHaveBeenCalledTimes(1);
  });

  it(`should respond with 3 products when called with valid query parameters: "/products?page=2&limit=3"`, async () => {
    const PAGE = 2;
    const LIMIT = 3;
    const mokedData: IProduct[] = [...productsMock, ...productsMock]
      .map((item, index) => {
        const id = index + LIMIT + 1;
        return {...item, _id: `${id}`};
      })
      .slice(0, LIMIT);
    const spyOnMethods = mockProductFind(mokedData);

    const reply = await request(server).get(
      `${v1}/products?page=${PAGE}&limit=${LIMIT}`,
    );

    const data: IProduct[] = reply.body.data;
    expect(data[0]._id).toBe('4');
    expect(data[2]._id).toBe('6');
    expect(data).toHaveLength(LIMIT);
    expect(reply.statusCode).toEqual(200);
    expect(spyOnMethods.skip).toHaveBeenCalledWith(3);
    expect(spyOnMethods.limit).toHaveBeenCalledWith(LIMIT);
  });

  it(`should return a 500 error when retrieving products from the database has failed`, async () => {
    jest.spyOn(Product, 'find').mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockRejectedValue(new Error('Database error')),
    } as never);

    const reply = await request(server).get(`${v1}/products`);
    const response: ServerResponse = reply.body;

    expect(response.statusCode).toBe(500);
    expect(response.message).toBe(INTERNAL_SERVER_ERROR.message);
    expect(response.success).toBe(false);
    expect(response.error.message).toBe('Database error');
    expect(response.error.stack).toBeDefined();
  });
});

function mockProductFind(items: IProduct[]) {
  const spyOnMethods = {
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn().mockReturnThis(),
    lean: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValueOnce(items),
  };
  Product.find = jest.fn().mockReturnValue(spyOnMethods);
  return spyOnMethods;
}
