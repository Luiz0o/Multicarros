import { Request, Response, NextFunction } from 'express';
import HttpError from '../utils/HttpsError';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({
            success: false,
            status: err.statusCode,
            message: err.message,
            ...(err.details ? { details: err.details } : {})
        });
    }

    const status = err?.statusCode || err?.status || 500;
    const message = err?.message || 'Internal Server Error';
    const details = err?.details;

    // Log no servidor (pode trocar por um logger mais avançado)
    console.error(`[${new Date().toISOString()}] Error on ${req.method} ${req.originalUrl}:`, err);

    res.status(status).json({
        success: false,
        status,
        message,
        ...(details ? { details } : {})
    });
}

export default errorHandler;