import {type Request, type Response} from 'express';

import HealthCheck from '../models/HealthCheck';
import messages from '../utils/messages';
import {sendError, sendSuccess} from '../utils/responses';

export async function healthCheck(req: Request, res: Response) {
  const healthStatus = {
    server: {isUp: true},
    database: {isUp: false},
  };
  const findEvent = {event: 'check'};
  const updateOptions = {
    new: true,
    upsert: true,
  };

  try {
    const data: IHealthCheck = await Promise.resolve(
      HealthCheck.findOneAndUpdate(findEvent, findEvent, updateOptions),
    );
    if (data) {
      healthStatus.database.isUp = true;
      sendSuccess(res, messages.SUCCESSFUL, healthStatus);
    } else {
      sendSuccess(res, messages.SERVICE_UNAVAILABLE, healthStatus);
    }
  } catch (err) {
    sendError(res, err);
  }
}
