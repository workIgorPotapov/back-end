class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 422;
    this.name = 'Bad request';
    this.message = 'Task has been already created';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.name = 'Not found';
    this.message = 'Task not found';
  }
}

exports.BadRequestError = BadRequestError;
exports.NotFoundError = NotFoundError;