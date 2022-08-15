const fs = require('fs');
const postsServices = require('../store/posts.services');

const deletePostImage = async (postId) => {
  const deleteLink = await postsServices.getPostImageName(postId);

  if (deleteLink.imageLink) {
    fs.unlinkSync(deleteLink.imageLink);
  }
};
module.exports = deletePostImage;
