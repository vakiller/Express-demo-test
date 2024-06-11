const StatusCodes = require('http-status-codes');

class CustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
}

class BadRequestError extends CustomError {
    constructor(message = 'Bad Request') {
      super(message, StatusCodes.BAD_REQUEST);
    }
  }
  
class NotFoundError extends CustomError {
  
    constructor(message = 'Not Found') {
      super(message, StatusCodes.NOT_FOUND);
    }
  }
  
class NotAuthorizedError extends CustomError {
  
    constructor(message) {
      super(message, StatusCodes.UNAUTHORIZED);
    }
  }

module.exports = { 
    CustomError,
    BadRequestError,
    NotFoundError,
    NotAuthorizedError
}