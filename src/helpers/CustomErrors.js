function createCustomError(message, status) {
    const error = new Error(message);
    error.statusCode = status;
    return error;
}

function createNotFoundError(message) {
    return createCustomError(message ?? "Not Found", 404);
}

function createBadRequestError(message) {
    return createCustomError(message ?? "Bad Request", 400);
}

function createUnAuthorizedError(message) {
    return createCustomError(message ?? "Unauthorized", 401);
}

module.exports = { 
    createCustomError, 
    createNotFoundError, 
    createBadRequestError, 
    createUnAuthorizedError
}