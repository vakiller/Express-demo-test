const { CustomError } = require("../helpers/CustomErrors");

function errorHandler(error, req, res, next) {
    if (error instanceof CustomError) {
        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal Server Error";
        res.status(statusCode).json({ message, statusCode });
    } else {
        res.status(statusCode).json({ message: "Internal Server Error", statusCode: 500 });
    }
    
    next();
}

module.exports = { errorHandler };