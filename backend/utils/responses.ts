import type {Response} from 'express';

export function sendSuccess<T = JSONObject>(
  response: Response,
  serverMsg: ServerResponse,
  data?: NonNullable<T>,
) {
  serverMsg.data = data || {};
  response.status(serverMsg.code).json(serverMsg);
  return response;
}

export function sendError(
  response: Response,
  serverMsg: ServerResponse,
  err: Error,
) {
  serverMsg.error = {
    message: err.message,
    stack: err.stack,
  };
  response.status(serverMsg.code).json(serverMsg);
  return response;
}
