import type {Response} from 'express';

import messages from './messages';

export function sendSuccess<T = JSONObject>(
  response: Response,
  serverMsg: ServerResponse,
  data?: NonNullable<T>,
) {
  serverMsg.data = data || {};
  return response.status(serverMsg.statusCode).json(serverMsg);
}

export function sendError(response: Response, err: ServerError) {
  const errorCode = err.code ?? 500;
  const msgKey = Object.keys(messages).find(key => {
    return messages[key].statusCode === errorCode;
  });
  const serverMsg: ServerResponse = messages[msgKey];
  serverMsg.error = {
    message: err.message,
    stack: err.stack,
  };
  return response.status(errorCode).json(serverMsg);
}

interface ServerError extends Partial<Error> {
  code?: number;
}
