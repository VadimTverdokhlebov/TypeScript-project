import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "../excaptions/apiError";
import ApiValidationError from "../excaptions/apiValidationError";
import { logger } from "../helpers/logger";

export default async function errorsMiddleware(err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {

    if (err instanceof ApiError) {
        logger.error({ message: err.message, errors: err.errors });
        return res.status(err.status).json({ message: err.message, errors: err.errors });
    }

    if (err instanceof ApiValidationError) {
        logger.error({ message: err.message, errors: err.errors });
        return res.status(400).json({ message: err.message, errors: err.errors });
    }

    logger.error(err);
    return res.status(500).json({ message: 'Unexpected error' });
}