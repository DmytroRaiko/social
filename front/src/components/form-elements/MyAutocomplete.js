/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { fieldToTextField } from 'formik-mui';

const filter = createFilterOptions();

const MyAutocomplete = (props) => {
  const {
    optionLabel, optionEqual, openModal, ...otherProps
  } = props;
  const {
    form: { setTouched, setFieldValue },
    label,
    placeholder,
  } = otherProps;
  const { error, helperText, ...field } = fieldToTextField(otherProps);
  const { name } = field;

  return (
    <Autocomplete
      {...otherProps}
      {...field}
      getOptionLabel={(option) => optionLabel(option)}
      isOptionEqualToValue={(option, value) => optionEqual(option, value)}
      onChange={(event, value) => {
        if (typeof openModal === 'function' && value[0]?.new && value[0]?.value) {
          openModal(value[0].value);
        } else {
          setFieldValue(name, value);
        }
      }}
      onBlur={() => setTouched({ [name]: true })}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        if (params.inputValue !== '') {
          filtered.push({
            value: params.inputValue,
            new: true,
            label: `Add "${params.inputValue}"`,
          });
        }

        return filtered;
      }}
      renderInput={
        (params) => (
          <TextField
            {...params}
            helperText={helperText}
            error={error}
            label={label || 'Visible to'}
            placeholder={placeholder || 'Visible to...'}
          />
        )
      }
    />
  );
};

export default MyAutocomplete;
