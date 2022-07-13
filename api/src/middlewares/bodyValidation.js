const UnprocessableEntityException = require('../services/errors/UnprocessableEntityException');

module.exports = (fields, resources) => async (req, res, next) => {
  const errors = {};

  // eslint-disable-next-line no-restricted-syntax
  for await (const field of Object.keys(fields)) {
    const fieldValue = req.body[field]?.trim();
    const error = [];

    // eslint-disable-next-line no-restricted-syntax
    for await (const param of Object.keys(fields[field])) {
      const paramValue = fields[field][param];

      switch (param) {
        // required field
        case 'required':
          if (paramValue && !fieldValue) {
            error.push('field is required');
          } break;

        // min length
        case 'minLength':
          if (fields[field]?.required) {
            if (!fieldValue?.length || fieldValue?.length < +paramValue) {
              error.push(`min value length: ${paramValue}`);
            }
          } else if (fieldValue?.length && fieldValue?.length < +paramValue) {
            error.push(`min value length: ${paramValue}`);
          } break;

        // max length
        case 'maxLength':
          if (fields[field]?.required) {
            if (!fieldValue?.length || fieldValue?.length > +paramValue) {
              error.push(`min value length: ${paramValue}`);
            }
          } else if (fieldValue?.length && fieldValue?.length > +paramValue) {
            error.push(`min value length: ${paramValue}`);
          } break;

        // min value just for number type!
        case 'min':
          if (fieldValue < +paramValue) {
            error.push(`min value: ${paramValue}`);
          } break;

        // max value just for number type
        case 'max':
          if (fieldValue > +paramValue) {
            error.push(`max value: ${paramValue}`);
          } break;

        // type
        case 'type':
          switch (paramValue) {
            case 'string':
              if (typeof fieldValue !== 'string') {
                error.push(`invalid type of ${paramValue}`);
              } break;

            case 'number':
              if (Number.isNaN(+fieldValue) || typeof +fieldValue !== 'number') {
                error.push(`invalid type of ${paramValue}`);
              } break;

            default:
              error.push(`unknown type: ${paramValue}`);
              break;
          } break;

        // unique by something
        case 'unique': {
          const uniqueField = await resources[field].unique(req);

          if (!uniqueField) {
            if (!resources[field]?.uniqueSelf(req, uniqueField)) {
              error.push(`${field} must be unique`);
            }
          }
          break;
        }

        // repeat value of single body value
        case 'repeatValue':
          if (!req?.body[paramValue] || fieldValue !== req.body[paramValue]) {
            error.push(`please repeat ${paramValue}`);
          } break;

        case 'regex':
          if (!paramValue.test(fieldValue)) {
            error.push(`must be matched with: ${paramValue}`);
          } break;

        default:
          error.push(`unknown param: ${param}`);
          break;
      }
    }

    if (error.length) {
      errors[field] = error;
    }
  }

  if (Object.keys(errors).length) {
    next(new UnprocessableEntityException(errors));
  } else {
    next();
  }
};
