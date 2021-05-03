module.exports = {
  badRequest(message) {
    const error = new Error(message);
    error.statusCode = 400;
    return error;
  },
  unauthorized(message) {
    const error = new Error(message);
    error.statusCode = 401;
    return error;
  }
}