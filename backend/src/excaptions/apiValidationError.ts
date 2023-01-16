import { Result, ValidationError } from "express-validator";

export default class ApiValidationError extends Error {
    errors;

    constructor(status: number, message: string, errors: Result<ValidationError> ) {
        super(message);
        this.errors = errors;
    }

    static badValidation(message: string, errors: Result<ValidationError> ) {
        return new ApiValidationError(400, message, errors);
    }
}