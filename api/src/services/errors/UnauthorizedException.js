class UnauthorizedException extends Error {
  constructor(props) {
    super(props);
    this.name = 'UnauthorizedException';
  }
}

module.exports = UnauthorizedException;
