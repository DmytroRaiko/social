class ForbiddenException extends Error {
  constructor(props) {
    super(props);
    this.name = 'ForbiddenException';
  }
}

module.exports = ForbiddenException;
