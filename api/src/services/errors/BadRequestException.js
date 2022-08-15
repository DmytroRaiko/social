class BadRequestException extends Error {
  constructor(props) {
    super(props);
    this.name = 'BadRequest';
  }
}

module.exports = BadRequestException;
