const router = require('express').Router();
const postsServices = require('../services/store/posts.services');
const commentsServices = require('../services/store/comments.services');
const likesServices = require('../services/store/likes.services');

// -- must to be change -- start
// ниже заглушка!
const setGetCookie = (req, res) => {
  res.cookie('profileid', 1);
  return req.cookies.profileid || 1;
};
// -- end

// show all posts

router.get('/', async (req, res) => {
  const profileid = setGetCookie(req, res);

  const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
  const limit = page * 10;
  const offset = (page - 1) * 10;

  if (profileid !== null) {
    try {
      const posts = await postsServices.getAllPosts(profileid, offset, limit);

      if (posts && Object.keys(posts).length) {
        res
          .status(200)
          .send({ message: 'Show posts', data: posts, success: true });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data fetching error', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// show post where postid = :postid

router.get('/:postid', async (req, res) => {
  const postId = req.params.postid;
  const profileid = setGetCookie(req, res);

  if (profileid !== null) {
    try {
      const post = await postsServices.getPost(profileid, postId);

      if (post && Object.keys(post).length) {
        res
          .status(200)
          .send({ message: 'Post fetching', data: post, success: true });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data fetching error', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// show post for edit

router.get('/:postid/edit', async (req, res) => {
  const postId = req.params.postid;
  const profileid = setGetCookie(req, res);

  if (profileid !== null) {
    try {
      const post = await postsServices.getPostEdit(postId);

      if (post && Object.keys(post).length) {
        res
          .status(200)
          .send({ message: 'Post fetching', data: post, success: true });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data fetching error', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// add post

router.post('/', async (req, res) => {
  const author = setGetCookie(req, res);

  if (author !== null) {
    const dataInsertPost = req.body;
    dataInsertPost.profileid = author;

    try {
      const addPost = await postsServices.addPost(dataInsertPost);

      if (addPost && Object.keys(addPost).length) {
        res
          .status(200)
          .send({ message: 'Post adding', data: addPost, success: true });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Error adding data', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// update post

router.put('/:postid', async (req, res) => {
  const postId = req.params.postid;
  const dataUpdatePost = req.body;

  console.log(postId);
  try {
    const updatePost = await postsServices.updatePost(dataUpdatePost, postId);

    if (updatePost) {
      res.status(200).send({ message: 'Post updating', success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data updating error', error, success: false });
  }
});

// delete post
router.delete('/:postid', async (req, res) => {
  const postId = req.params.postid;

  try {
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
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data deleting error', error, success: false });
  }
});

// show all comments

router.get('/:postid/comments', async (req, res) => {
  const postId = req.params.postid;

  const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
  const limit = page * 30;
  const offset = (page - 1) * 30;

  try {
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
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data fetching error', error, success: false });
  }
});

// add comment

router.post('/:postid/comments', async (req, res) => {
  const author = setGetCookie(req, res);

  if (author !== null) {
    const dataInsertComment = req.body;
    dataInsertComment.profileid = author;
    dataInsertComment.postid = req.params.postid;

    try {
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
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data add error', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// change comment

router.put('/:postid/comment/:commentid', async (req, res) => {
  const author = setGetCookie(req, res);
  const commentId = req.params.commentid;

  if (author !== null) {
    const dataInsertComment = req.body;

    try {
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
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data changing error', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// delete comment

router.delete('/:postid/comment/:commentid', async (req, res) => {
  const author = setGetCookie(req, res);
  const commentId = req.params.commentid;

  if (author !== null) {
    try {
      const deleteComment = await commentsServices.deleteComment(
        commentId,
        author
      );

      if (deleteComment) {
        res.status(200).send({
          message: 'Comment deleting',
          data: deleteComment,
          success: true,
        });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data deleting error', error, success: false });
    }
  }
});

// show all likes

router.get('/:postid/likes', async (req, res) => {
  const postId = req.params.postid;

  const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
  const limit = page * 50;
  const offset = (page - 1) * 50;

  try {
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
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data fetching error', error, success: false });
  }
});

// post like

router.post('/:postid/likes', async (req, res) => {
  const profileId = setGetCookie(req, res);

  if (profileId !== null) {
    const dataLike = {
      profileid: profileId,
      postid: req.params.postid,
    };

    try {
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
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data add error', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// post unlike

router.delete('/:postid/likes', async (req, res) => {
  const profileId = setGetCookie(req, res);
  const postId = req.params.postid;

  if (profileId !== null) {
    try {
      const unlikePost = await likesServices.deleteLike(postId, profileId);

      if (unlikePost) {
        res.status(200).send({
          message: 'Unlike post',
          data: unlikePost,
          success: true,
        });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data deleting error', error, success: false });
    }
  }
});

module.exports = router;
