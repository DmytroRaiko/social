import React from 'react';
import { useParams } from 'react-router-dom';

function PostWithid() {
  const params = useParams();

  if (/^[0-9]*$/m.exec(params.id)) {
    return (
      <h1>
        Post id:
        {params.id}
        <br />
        Else numeric!
      </h1>
    );
  } if (/^[A-Z]*$/m.exec(params.id)) {
    return (
      <h1>
        Post id:
        {params.id}
        <br />
        Else Uppercase symbols
      </h1>
    );
  } if (/^[\wА-ЯËа-яё]+(\.doc|\.jpeg|\.pdf)$/m.exec(params.id)) {
    return (
      <h1>
        Post id:
        {params.id}
        <br />
        id - file
      </h1>
    );
  }
  return (
    <h1>
      404.
    </h1>
  );
}

export default PostWithid;
