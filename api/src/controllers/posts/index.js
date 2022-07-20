const postsServices = require('../../services/store/posts.services');
const NotFoundException = require('../../services/errors/NotFoundException');
const deletePostImage = require('../../services/multer/deletePostImage');
const commentsServices = require('../../services/store/comments.services');
const likesServices = require('../../services/store/likes.services');

module.exports = {
  getAllPosts: async (req, res) => {
    const { profileId } = req.session;

    const posts = await postsServices.getAllPosts(profileId);

    if (posts && Object.keys(posts).length) {
      res.send({
        message: 'Show posts', data: posts, success: true, count: posts.length
      });
    } else {
      throw new NotFoundException('Posts');
    }
  },

  getAllSeenPosts: async (req, res) => {
    const { profileId } = req.session;

    const posts = await postsServices.getAllSeenPosts(profileId);

    if (posts && Object.keys(posts).length) {
      res.send({
        message: 'Show seen posts', data: posts, success: true, count: posts.length
      });
    } else {
      throw new NotFoundException('Seen posts');
    }
  },

  getOnePost: async (req, res) => {
    const { postId } = req.params;
    const { profileId } = req.session;

    const post = await postsServices.getPost(profileId, postId);

    if (post && Object.keys(post).length) {
      res.send({ message: 'Post fetching', data: post, success: true });
    } else {
      throw new NotFoundException('There is no post yet here!');
    }
  },

  getOnePostEdit: async (req, res) => {
    const { postId } = req.params;

    const post = await postsServices.getPostEdit(postId);

    if (post && Object.keys(post).length) {
      res.send({ message: 'Post fetching', data: post, success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  },

  postPost: async (req, res) => {
    const { profileId } = req.session;
    const path = req.file ? req.file.path : null;

    const dataInsertPost = req.body;
    dataInsertPost.profileId = profileId;
    dataInsertPost.imageLink = path;

    const addPost = await postsServices.addPost(dataInsertPost);

    if (addPost && Object.keys(addPost).length) {
      res.send({ message: 'Post adding', data: addPost, success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  },

  putPost: async (req, res) => {
    const { postId } = req.params;
    const dataUpdatePost = req.body;
    dataUpdatePost.imageLink = req.file ? req.file.path : null;

    await deletePostImage(postId);

    const updatePost = await postsServices.updatePost(dataUpdatePost, postId);

    if (updatePost) {
      res.send({ message: 'Post updating', success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  },

  viewPost: async (req, res) => {
    const { profileId } = req.session;
    const { postId } = req.params;

    const isView = await postsServices.isView(postId, profileId);
    if (!isView?.postViewId) {
      await postsServices.viewPost(postId, profileId);
      await postsServices.updatePostAmountViews(postId, '-');
    }

    res.send();
  },

  deletePost: async (req, res) => {
    const { postId } = req.params;
    await deletePostImage(postId);

    const deletePost = await postsServices.deletePost(postId);

    if (deletePost) {
      res.send({
        message: 'Post deleting',
        data: deletePost,
        success: true,
      });
    } else {
      throw new NotFoundException('Post not found');
    }
  },

  getComments: async (req, res) => {
    const { postId } = req.params;

    const commentsForPost = await commentsServices.getComments(
      postId,
    );

    if (commentsForPost && Object.keys(commentsForPost).length) {
      res.send({
        message: 'Fetching comments',
        data: commentsForPost,
        success: true,
      });
    } else {
      throw new NotFoundException('Comments not found');
    }
  },

  postComments: async (req, res) => {
    const { profileId } = req.session;

    const dataInsertComment = req.body;
    dataInsertComment.profileId = profileId;
    dataInsertComment.postId = req.params.postId;

    const addComment = await commentsServices.addComment(dataInsertComment);

    if (addComment && Object.keys(addComment).length) {
      res.send({ message: 'Post adding', data: addComment, success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  },

  putComment: async (req, res) => {
    const { commentId } = req.params;

    const dataInsertComment = req.body;

    const changeComment = await commentsServices.updateComment(
      dataInsertComment,
      commentId
    );

    if (changeComment) {
      res.send({
        message: 'Comment changing',
        data: changeComment,
        success: true,
      });
    } else {
      throw new NotFoundException('Comment inserting');
    }
  },

  deleteComment: async (req, res) => {
    const { profileId } = req.session;
    const { commentId } = req.params;

    const deleteComment = await commentsServices.deleteComment(
      commentId,
      profileId
    );

    if (deleteComment) {
      res.send({
        message: 'Comment deleting',
        data: deleteComment,
        success: true,
      });
    } else {
      throw new NotFoundException('Comment not found');
    }
  },

  getLikes: async (req, res) => {
    const { profileId } = req.session;
    const { postId } = req.params;

    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = page * 50;
    const offset = (page - 1) * 50;

    const likesForPost = await likesServices.getLikes(postId, offset, limit);
    const myLike = await likesServices.getMyLike(postId, profileId);

    if (likesForPost && Object.keys(likesForPost).length) {
      res.send({
        message: 'Fetching likes',
        myLike,
        data: likesForPost,
        success: true,
        postId,
      });
    } else {
      throw new NotFoundException('Likes not found');
    }
  },

  postLike: async (req, res) => {
    const { profileId } = req.session;
    const { postId } = req.params;

    const likePost = await likesServices.addLike(postId, profileId);

    if (likePost && Object.keys(likePost).length) {
      res.send({ message: 'Like adding', data: likePost, success: true });
    } else {
      throw new NotFoundException('Can`t like');
    }
  },

  deleteLike: async (req, res) => {
    const { profileId } = req.session;
    const { postId } = req.params;

    const unlikePost = await likesServices.deleteLike(postId, profileId);

    if (unlikePost) {
      res.send({
        message: 'Unlike post',
        data: unlikePost,
        success: true,
      });
    } else {
      throw new NotFoundException('Like not found');
    }
  },
};
