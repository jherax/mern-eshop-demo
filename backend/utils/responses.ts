import type {Response} from 'express';

import messages from '../utils/messages';

export function sendSuccess<T = JSONObject>(
  response: Response,
  serverMsg: ServerResponse,
  data?: NonNullable<T>,
) {
  serverMsg.data = data || {};
  return response.status(serverMsg.code).json(serverMsg);
}

export function sendError(response: Response, err: Error) {
  const errorCode = (err as any).code ?? 500;
  const msgKey = Object.keys(messages).find(key => {
    return messages[key].code === errorCode;
  });
  const serverMsg: ServerResponse = messages[msgKey];
  serverMsg.error = {
    message: err.message,
    stack: err.stack,
  };
  return response.status(errorCode).json(serverMsg);
}
