const router = require('express').Router();
const postsServices = require('../services/store/posts.services');
const commentsServices = require('../services/store/comments.services');
const likesServices = require('../services/store/likes.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');

router.use(auth);

router.get(
  '/',
  middleAsync(async (req, res) => {
    const { profileid } = req;

    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = page * 10;
    const offset = (page - 1) * 10;

    const posts = await postsServices.getAllPosts(profileid, offset, limit);

    if (posts && Object.keys(posts).length) {
      res
        .status(200)
        .send({ message: 'Show posts', data: posts, success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  })
);

// show post where postid = :postid

router.get(
  '/:postid',
  middleAsync(async (req, res) => {
    const postId = req.params.postid;
    const { profileid } = req;

    if (profileid !== null) {
      const post = await postsServices.getPost(profileid, postId);

      if (post && Object.keys(post).length) {
        res
          .status(200)
          .send({ message: 'Post fetching', data: post, success: true });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } else {
      res.status(401).send({ message: 'Access denied', success: false });
    }
  })
);

// show post for edit

router.get(
  '/:postid/edit',
  middleAsync(async (req, res) => {
    const postId = req.params.postid;

    const post = await postsServices.getPostEdit(postId);

    if (post && Object.keys(post).length) {
      res
        .status(200)
        .send({ message: 'Post fetching', data: post, success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  })
);

// add post

router.post(
  '/',
  middleAsync(async (req, res) => {
    const { profileid } = req;

    const dataInsertPost = req.body;
    dataInsertPost.profileid = profileid;

    const addPost = await postsServices.addPost(dataInsertPost);

    if (addPost && Object.keys(addPost).length) {
      res
        .status(200)
        .send({ message: 'Post adding', data: addPost, success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  })
);

// update post

router.put(
  '/:postid',
  middleAsync(async (req, res) => {
    const postId = req.params.postid;
    const dataUpdatePost = req.body;

    const updatePost = await postsServices.updatePost(dataUpdatePost, postId);

    if (updatePost) {
      res.status(200).send({ message: 'Post updating', success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  })
);

// delete post
router.delete(
  '/:postid',
  middleAsync(async (req, res) => {
    const postId = req.params.postid;

    const deletePost = await postsServices.deletePost(postId);

    if (deletePost) {
      res.status(200).send({
        message: 'Post deleting',
        data: deletePost,
        success: true,
      });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  })
);

// show all comments

router.get(
  '/:postid/comments',
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
      res.status(200).send({
        message: 'Fetching comments',
        data: commentsForPost,
        success: true,
      });
    } else {
      res.status(200).send({ message: 'Not found', success: false });
    }
  })
);

// add comment

router.post(
  '/:postid/comments',
  middleAsync(async (req, res) => {
    const { profileid } = req;

    const dataInsertComment = req.body;
    dataInsertComment.profileid = profileid;
    dataInsertComment.postid = req.params.postid;

    const addComment = await commentsServices.addComment(dataInsertComment);

    if (addComment && Object.keys(addComment).length) {
      res
        .status(200)
        .send({ message: 'Post adding', data: addComment, success: true });
    } else {
      res
        .status(404)
        .send({ message: 'Not found', countComments: 0, success: true });
    }
  })
);

// change comment

router.put(
  '/:postid/comment/:commentid',
  middleAsync(async (req, res) => {
    const commentId = req.params.commentid;

    const dataInsertComment = req.body;

    const changeComment = await commentsServices.updateComment(
      dataInsertComment,
      commentId
    );

    if (changeComment) {
      res.status(200).send({
        message: 'Comment changing',
        data: changeComment,
        success: true,
      });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  })
);

// delete comment

router.delete(
  '/:postid/comment/:commentid',
  middleAsync(async (req, res) => {
    const { profileid } = req;
    const commentId = req.params.commentid;

    const deleteComment = await commentsServices.deleteComment(
      commentId,
      profileid
    );

    if (deleteComment) {
      res.status(200).send({
        message: 'Comment deleting',
        data: deleteComment,
        success: true,
      });
    }
  })
);

// show all likes

router.get(
  '/:postid/likes',
  middleAsync(async (req, res) => {
    const postId = req.params.postid;

    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = page * 50;
    const offset = (page - 1) * 50;

    const likesForPost = await likesServices.getLikes(postId, offset, limit);

    if (likesForPost && Object.keys(likesForPost).length) {
      res.status(200).send({
        message: 'Fetching likes',
        data: likesForPost,
        success: true,
        postid: postId,
      });
    } else {
      res.status(200).send({ message: 'Not found', success: false });
    }
  })
);

// post like

router.post(
  '/:postid/likes',
  middleAsync(async (req, res) => {
    const { profileid } = req;

    const dataLike = {
      profileid,
      postid: req.params.postid,
    };

    const likePost = await likesServices.addLike(dataLike);

    if (likePost && Object.keys(likePost).length) {
      res
        .status(200)
        .send({ message: 'Like adding', data: likePost, success: true });
    } else {
      res
        .status(404)
        .send({ message: 'Not found', countLikes: 0, success: true });
    }
  })
);

// post unlike

router.delete(
  '/:postid/likes',
  middleAsync(async (req, res) => {
    const profileId = req.profileid;
    const postId = req.params.postid;

    const unlikePost = await likesServices.deleteLike(postId, profileId);

    if (unlikePost) {
      res.status(200).send({
        message: 'Unlike post',
        data: unlikePost,
        success: true,
      });
    }
  })
);

module.exports = router;
