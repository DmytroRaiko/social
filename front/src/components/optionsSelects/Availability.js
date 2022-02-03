import { MenuItem } from '@mui/material';
import { Select } from 'formik-mui';
import { Field } from 'formik';
import React from 'react';

export const availabilitySelect = (name, variant, availabilities) => {
  const options = availabilities?.map((availability) => (
    <MenuItem
      key={`availabilities-${availability.availabilityid}`}
      value={availability.availabilityid}
    >
      {availability.availability}
    </MenuItem>
  ));

  return (
    <Field
      component={Select}
      variant={variant}
      name={name}
      label="Availability"
      sx={{
        width: '150px',
        height: '35 px',
      }}
    >
      {options}
    </Field>
  );
};
