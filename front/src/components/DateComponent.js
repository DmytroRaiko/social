import React from 'react';
import { useParams } from 'react-router-dom';

function DateComponent() {
  const params = useParams();

  if (/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/m.exec(params.date)
    && new Date(params.date).setHours(0, 0, 0, 0) <= new Date().setHours(0, 0, 0, 0)) {
    return (
      <h1>
        Date:
        {params.date}
        <br />
        Date valid!
      </h1>
    );
  }
  return (
    <h1>
      404.
    </h1>
  );
}

export default DateComponent;
