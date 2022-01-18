import React from 'react';
import PropTypes from 'prop-types';

const PostAuthor = ({ author }) => (
  <p className="post-tags">
    <b>
      {author}
    </b>
  </p>
);

PostAuthor.propTypes = {
  author: PropTypes.string.isRequired,
};

export default PostAuthor;
