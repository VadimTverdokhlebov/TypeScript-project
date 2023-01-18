import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express';
import ApiError from '../exception/apiError';
import ApiValidationError from '../exception/apiValidationError';
import logger from '../helpers/logger';

export default async function errorsMiddleware(
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof ApiError) {
    logger.error({ message: error.message, errors: error.errors });
    return res.status(error.status).json({ message: error.message, errors: error.errors });
  }

  if (error instanceof ApiValidationError) {
    logger.error({ message: error.message, errors: error.errors });
    return res.status(400).json({ message: error.message, errors: error.errors });
  }

  logger.error(error);
  return res.status(500).json({ message: 'Unexpected error' });
}
