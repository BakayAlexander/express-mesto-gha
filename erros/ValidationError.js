class ValidationError extends Error {
  constructor(message = 'Данные не валидны') {
    super(message);
    this.statusCode = 400;
    this.message = message;
  }
}

module.exports = ValidationError;
