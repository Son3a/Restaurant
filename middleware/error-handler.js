const { StatusCodes } = require('http-status-codes');
const { object } = require('joi');
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong, try again later'
  };
  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(item => item.message).join(',');
    customError.statusCode = 400;
  }

  if (err.name === 'CastError') {
    customError.msg = `Can not find job with id ${err.value}`;
    customError.statusCode = 404;
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = 400;
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg })
  //return res.status(customError.statusCode).json({ err })
}

module.exports = errorHandlerMiddleware
