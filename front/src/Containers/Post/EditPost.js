import React from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getPostEdit, getAvailability } from '../../Services/ CRUD/Posts';
import EditPostForm from '../Forms/EditPostForm';
import { PageLoader } from '../../Layouts/Loaders/PageLoader';
import { modals } from '../../Services/Constants';

const EditPost = ({ postId, handleClose }) => {
  const postQuery = useQuery(`post-edit-${postId}`, () => getPostEdit(postId));
  const availabilityQuery = useQuery('availabilities', () => getAvailability());
  const postIsFetching = postQuery.isFetching;
  const availabilityIsFetching = availabilityQuery.isFetching;
  const postData = postQuery.data;
  const availabilityData = availabilityQuery.data;

  const postEdit = postData?.data.data;
  const availabilities = availabilityData?.data.data;

  return (
    <>
      {postIsFetching && availabilityIsFetching && <PageLoader />}
      {postEdit && availabilities
          && (
            <>
              <header className="edit-modal-header">
                <Typography
                  style={{
                    fontWeight: '500',
                  }}
                >
                  {modals.articles.title.editArticles}
                </Typography>
                <IconButton className="button-close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </header>
              <EditPostForm
                post={postEdit}
                postEditId={postId}
                availabilities={availabilities}
                onHandleClose={handleClose}
              />
            </>
          )}
    </>
  );
};

EditPost.propTypes = {
  postId: PropTypes.number.isRequired,
  handleClose: PropTypes.func,
};

export default EditPost;
