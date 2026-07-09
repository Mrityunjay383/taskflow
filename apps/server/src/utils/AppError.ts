export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
    errorCode: string;

    constructor({
        message,
        errorCode,
        statusCode = 500,
    }: {
        message: string;
        errorCode?: string;
        statusCode: number;
    }) {
        super(message);

        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.isOperational = true;

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
