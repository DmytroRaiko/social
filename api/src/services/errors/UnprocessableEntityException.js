class UnprocessableEntityException extends Error {
  constructor(props) {
    super(props);
    this.name = 'UnprocessableEntity';
    this.errors = props;
  }
}

module.exports = UnprocessableEntityException;
