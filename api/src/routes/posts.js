const router = require('express').Router();
const db = require('../services/db');

// -- must to be change -- start
// ниже заглушка!
const setGetCookie = (req, res) => {
  res.cookie('profileid', 1);
  return req.cookies.profileid || null;
};
// -- end

// show all posts

router.get('/', async (req, res) => {
  const profileid = setGetCookie(req, res);

  if (profileid !== null) {
    try {
      const posts = await db
        .select()
        .from(() => {
          this.select(
            'profile.profileid',
            'profile.name',
            'profile.avatarlink',
            'post.*',
            'poststatistic.*',
            'postlike.postlikeid',
            'postlike.profileid as profilelike'
          )
            .from('profile')
            .join('post', 'post.profileid', '=', 'profile.profileid')
            .join('poststatistic', 'poststatistic.postid', '=', 'post.postid')
            .leftJoin('postlike', 'post.postid', '=', 'postlike.postid')
            // .where('postlike.profileid', '=', profileid)
            .orderBy('post.timepost', 'DESC')
            .as('posts');
        })
        .where('posts.profilelike', '=', profileid)
        .orWhereNull('posts.postlikeid')
        .limit(10);

      if (Object.keys(posts).length > 0) {
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
      const post = await db
        .select()
        .from(() => {
          this.select(
            'profile.profileid',
            'profile.name',
            'profile.avatarlink',
            'post.*',
            'poststatistic.*',
            'postlike.postlikeid',
            'postlike.profileid as profilelike'
          )
            .from('profile')
            .join('post', 'post.profileid', '=', 'profile.profileid')
            .join('poststatistic', 'poststatistic.postid', '=', 'post.postid')
            .leftJoin('postlike', 'post.postid', '=', 'postlike.postid')
            .where('post.postid', '=', postId)
            .orderBy('post.timepost', 'DESC')
            .as('posts');
        })
        .where('posts.profilelike', '=', profileid)
        .orWhereNull('posts.postlikeid')
        .limit(10);
      if (Object.keys(post).length > 0) {
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
      const addPost = await db('post').insert(dataInsertPost);

      res
        .status(200)
        .send({ message: 'Post adding', data: addPost, success: true });
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

  try {
    const updatePost = await db('post')
      .update(dataUpdatePost)
      .where('postid', postId);

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
    const deletePost = await db.from('post').where('postid', postId).delete();

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

  try {
    const commentsForPost = await db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'comment.*'
      )
      .from('comment')
      .join('profile', 'profile.profileid', '=', 'comment.profileid')
      .where('comment.postid', postId);

    if (commentsForPost) {
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
      const addComment = await db('comment').insert(dataInsertComment);

      if (addComment) {
        res
          .status(200)
          .send({ message: 'Post adding', data: addComment, success: true });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
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
      const addComment = await db('comment')
        .insert(dataInsertComment)
        .where('commentid', commentId);

      if (addComment) {
        res.status(200).send({
          message: 'Comment changing',
          data: addComment,
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
      const deleteComment = await db
        .from('comment')
        .where('commentid', commentId)
        .andWhere('profileid', author)
        .delete();

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

  try {
    const likesForPost = await db
      .select(
        'profile.profileid',
        'profile.name',
        'profile.avatarlink',
        'postlike.postlikeid'
      )
      .from('postlike')
      .join('profile', 'profile.profileid', '=', 'postlike.profileid')
      .where('postid', postId);

    if (likesForPost) {
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
      const likePost = await db('postlike').insert(dataLike);

      if (likePost) {
        res
          .status(200)
          .send({ message: 'Like adding', data: likePost, success: true });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
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
      const unlikePost = await db
        .from('postlike')
        .where('postid', postId)
        .andWhere('profileid', profileId)
        .delete();

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
