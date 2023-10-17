const messages: Record<string, ServerMessage> = {
  // SUCCESSFUL MESSAGES
  SUCCESSFUL_LOGIN: {
    statusCode: 200,
    message: 'Successfully logged in',
    success: true,
  },
  SUCCESSFUL_DELETE: {
    statusCode: 200,
    message: 'Successfully deleted',
    success: true,
  },
  SUCCESSFUL_UPDATE: {
    statusCode: 200,
    message: 'Updated successfully',
    success: true,
  },
  SUCCESSFUL_ADDED: {
    statusCode: 200, // 201
    message: 'Created successfully',
    success: true,
  },
  SUCCESSFUL: {
    statusCode: 200,
    success: true,
    message: 'Successfully completed',
  },
  ALREADY_EXIST: {
    statusCode: 200, // 409
    success: true,
    message: 'Already exists',
  },

  // ERROR MESSAGES
  BAD_REQUEST: {
    statusCode: 400,
    message: 'Bad request. Please try again with valid parameters',
    success: false,
  },
  AUTHENTICATION_FAILED: {
    statusCode: 401,
    message: 'Authentication failed. Please login with valid credentials.',
    success: false,
  },
  UNAUTHORIZED: {
    statusCode: 401,
    message: 'Your session has expired. Please login again',
    success: false,
  },
  FORBIDDEN: {
    statusCode: 403,
    message: 'You are not authorized to complete this action',
    success: false,
  },
  NOT_FOUND: {
    statusCode: 404,
    success: true,
    message: 'Requested API not found',
  },
  INCOMPLETE_REQUEST: {
    statusCode: 422,
    message: 'Required parameters missing',
    success: false,
  },
  TOO_MANY_REQUESTS: {
    statusCode: 429,
    message: 'Too many requests',
    success: false,
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    message: 'Something unexpected happened',
    success: false,
  },
  SERVICE_UNAVAILABLE: {
    statusCode: 503,
    message: 'Service Unavailable',
    success: false,
  },
};

export default messages;
