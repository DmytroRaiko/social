const router = require('express').Router();
// const fs = require('fs');
const postsServices = require('../services/store/posts.services');
const commentsServices = require('../services/store/comments.services');
const likesServices = require('../services/store/likes.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const upload = require('../services/multer/multer-post');
const deletePostImage = require('../services/multer/deletePostImage');
const NotFoundException = require('../services/errors/NotFoundException');
const middleACL = require('../middlewares/ACL');

router.use(auth);

router.get(
  '/',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => {
    const { profileid } = req.session;

    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = page * 10;
    const offset = (page - 1) * 10;

    const posts = await postsServices.getAllPosts(profileid, offset, limit);

    if (posts && Object.keys(posts).length) {
      res.send({ message: 'Show posts', data: posts, success: true });
    } else {
      throw new NotFoundException('Posts');
    }
  })
);

// show post where postid = :postid

router.get(
  '/:postid',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => {
    const postId = req.params.postid;
    const { profileid } = req;

    const post = await postsServices.getPost(profileid, postId);

    if (post && Object.keys(post).length) {
      res.send({ message: 'Post fetching', data: post, success: true });
    } else {
      throw new NotFoundException('There is no post yet here!');
    }
  })
);

// show post for edit

router.get(
  '/:postid/edit',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => {
    const postId = req.params.postid;

    const post = await postsServices.getPostEdit(postId);

    if (post && Object.keys(post).length) {
      res.send({ message: 'Post fetching', data: post, success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  })
);

// add post

router.post(
  '/',
  middleACL({ resource: 'posts', action: 'create', possession: 'any' }),
  upload.single('postImage'),
  middleAsync(async (req, res) => {
    const { profileid } = req;
    const path = req.file ? req.file.path : null;

    const dataInsertPost = req.body;
    dataInsertPost.profileid = profileid;
    dataInsertPost.imagelink = path;

    const addPost = await postsServices.addPost(dataInsertPost);

    if (addPost && Object.keys(addPost).length) {
      res.send({ message: 'Post adding', data: addPost, success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  })
);

// update post

router.put(
  '/:postid',
  middleACL({
    resource: 'posts',
    action: 'update',
    possession: 'own',
    getResource: (req) => postsServices.getPostInfo(req.params.postid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  upload.single('postImage'),
  middleAsync(async (req, res) => {
    const postId = req.params.postid;
    const dataUpdatePost = req.body;
    dataUpdatePost.imagelink = req.file ? req.file.path : null;

    await deletePostImage(postId);

    const updatePost = await postsServices.updatePost(dataUpdatePost, postId);

    if (updatePost) {
      res.send({ message: 'Post updating', success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  })
);

// delete post

router.delete(
  '/:postid',
  middleACL({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: (req) => postsServices.getPostInfo(req.params.postid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => {
    const postId = req.params.postid;
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
  })
);

// show all comments

router.get(
  '/:postid/comments',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => {
    const postId = req.params.postid;
    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = page * 30;
    const offset = (page - 1) * 30;

    const commentsForPost = await commentsServices.getComments(
      postId,
      offset,
      limit
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
  })
);

// add comment

router.post(
  '/:postid/comments',
  middleACL({ resource: 'posts', action: 'create', possession: 'any' }),
  middleAsync(async (req, res) => {
    const { profileid } = req;

    const dataInsertComment = req.body;
    dataInsertComment.profileid = profileid;
    dataInsertComment.postid = req.params.postid;

    const addComment = await commentsServices.addComment(dataInsertComment);

    if (addComment && Object.keys(addComment).length) {
      res.send({ message: 'Post adding', data: addComment, success: true });
    } else {
      throw new NotFoundException('Post not found');
    }
  })
);

// change comment

router.put(
  '/:postid/comment/:commentid',
  middleACL({
    resource: 'posts',
    action: 'update',
    possession: 'own',
    getResource: (req) => commentsServices.getCommentInfo(req.params.commentid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => {
    const commentId = req.params.commentid;

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
  })
);

// delete comment

router.delete(
  '/:postid/comment/:commentid',
  middleACL({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: (req) => commentsServices.getCommentInfo(req.params.commentid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => {
    const { profileid } = req;
    const commentId = req.params.commentid;

    const deleteComment = await commentsServices.deleteComment(
      commentId,
      profileid
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
  })
);

// show all likes

router.get(
  '/:postid/likes',
  middleACL({
    resource: 'posts',
    action: 'read',
    possession: 'any',
    getResource: (req) => likesServices.getLikeInfo(req.params.id),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => {
    const postId = req.params.postid;

    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = page * 50;
    const offset = (page - 1) * 50;

    const likesForPost = await likesServices.getLikes(postId, offset, limit);

    if (likesForPost && Object.keys(likesForPost).length) {
      res.send({
        message: 'Fetching likes',
        data: likesForPost,
        success: true,
        postid: postId,
      });
    } else {
      throw new NotFoundException('Likes not found');
    }
  })
);

// post like

router.post(
  '/:postid/likes',
  middleACL({ resource: 'posts', action: 'create', possession: 'any' }),
  middleAsync(async (req, res) => {
    const { profileid } = req;

    const dataLike = {
      profileid,
      postid: req.params.postid,
    };

    const likePost = await likesServices.addLike(dataLike);

    if (likePost && Object.keys(likePost).length) {
      res.send({ message: 'Like adding', data: likePost, success: true });
    } else {
      throw new NotFoundException('Can`t like');
    }
  })
);

// post unlike

router.delete(
  '/:postid/likes',
  middleACL({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: (req) =>
      likesServices.getLikeInfo(req.session.profileid, req.params.postid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => {
    const profileId = req.session.profileid;
    const postId = req.params.postid;

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
  })
);

module.exports = router;
