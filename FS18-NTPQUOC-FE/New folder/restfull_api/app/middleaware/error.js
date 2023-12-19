var ErrorRespone = require("./../ultis/errorRespone");
var notify      = require('./../configs/notify')
const errorHandler = (err, req, res, next) => {
  console.log(err.name.yellow);

  let error = { ...err };
  if (err.name === "CastError") {
    let message = notify.ERROR_CASTERROR;
    error = new ErrorRespone(404, message);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "SERVER ERROR"
  });
};

module.exports = errorHandler;
