const fs = require('fs');
const postsServices = require('../store/posts.services');

const deletePostImage = async (postid) => {
  const deleteLink = await postsServices.getPostImageName(postid);

  if (deleteLink.imagelink) {
    fs.unlinkSync(deleteLink.imagelink);
  }
};
module.exports = deletePostImage;
