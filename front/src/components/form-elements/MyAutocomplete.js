import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { fieldToTextField } from 'formik-mui';

const MyAutocomplete = (props) => {
  const {
    form: { setTouched, setFieldValue },
    label,
    placeholder,
  } = props;
  const { error, helperText, ...field } = fieldToTextField(props);
  const { name } = field;

  return (
    <Autocomplete
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...field}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option?.label === value?.label}
      onChange={(_, value) => setFieldValue(name, value)}
      onBlur={() => setTouched({ [name]: true })}
      renderInput={
        (params) => (
          <TextField
            /* eslint-disable-next-line react/jsx-props-no-spreading */
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
