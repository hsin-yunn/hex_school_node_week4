module.exports = {
  successHandler(res, statusCode, data = null, message = null) {
    const response = {
      status: 'success',
    };
    if (data) {
      response.data = data;
    }
    if (message) {
      response.message = message;
    }
    res.status(statusCode).json(response);
  },
  errorHandler(res, statusCode, message) {
    res.status(statusCode).json({
      status: 'failed',
      message: message,
    });
  },
};
