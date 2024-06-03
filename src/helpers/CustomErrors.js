function createCustomError(message, status) {
    const error = new Error(message);
    error.statusCode = status;
}

function createNotFoundError() {
    return createCustomError("Not Found", 404);
}

function createBadRequestError() {
    return createCustomError("Bad Request", 400);
}

function createUnAuthorizedError() {
    return createCustomError("Unauthorized", 401);
}

module.exports = { 
    createCustomError, 
    createNotFoundError, 
    createBadRequestError, 
    createUnAuthorizedError
}