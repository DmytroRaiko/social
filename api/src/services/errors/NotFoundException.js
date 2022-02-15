class NotFoundException extends Error {
  constructor(props) {
    super(props);
    this.name = 'NotFoundException';
  }
}

module.exports = NotFoundException;
