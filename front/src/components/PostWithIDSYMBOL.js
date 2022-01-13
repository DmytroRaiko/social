import React from 'react';
import { useParams } from 'react-router-dom';

function PostWithID() {
  const params = useParams();

  if (/^[0-9]*$/mg.exec(params.ID)) {
    return (
      <h1>
        Post ID:
        {params.ID}
      </h1>
    );
  }
  return (
    <h1>
      404.
      ID have symbol!
    </h1>
  );
}

export default PostWithID;
