const router = require('express').Router();
const postsServices = require('../services/store/posts.services');
const commentsServices = require('../services/store/comments.services');
const likesServices = require('../services/store/likes.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const upload = require('../services/multer/multer-post');
const middleACL = require('../middlewares/ACL');
const postsControllers = require('../controllers/posts');

router.use(auth);

router.get(
  '/',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getAllPosts(req, res))
);

// show post where postid = :postid

router.get(
  '/:postid',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getOnePost(req, res))
);

// show post for edit

router.get(
  '/:postid/edit',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getOnePostEdit(req, res))
);

// add post

router.post(
  '/',
  middleACL({ resource: 'posts', action: 'create', possession: 'any' }),
  upload.single('postImage'),
  middleAsync(async (req, res) => postsControllers.postPost(req, res))
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
  middleAsync(async (req, res) => postsControllers.putPost(req, res))
);

// view single post

router.put(
  '/view/:postId',
  middleAsync(async (req, res) => postsControllers.viewPost(req, res))
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
  middleAsync(async (req, res) => postsControllers.deletePost(req, res))
);

// show all comments

router.get(
  '/:postid/comments',
  middleACL({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getComments(req, res))
);

// add comment

router.post(
  '/:postid/comments',
  middleACL({ resource: 'posts', action: 'create', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.postComments(req, res))
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
  middleAsync(async (req, res) => postsControllers.putComment(req, res))
);

// delete comment

router.delete(
  '/:postid/comment/:commentId',
  middleACL({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: (req) => commentsServices.getCommentInfo(req.params.commentid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => postsControllers.deleteComment(req, res))
);

// show all likes

router.get(
  '/:postid/likes',
  middleACL({
    resource: 'posts',
    action: 'read',
    possession: 'any',
  }),
  middleAsync(async (req, res) => postsControllers.getLikes(req, res))
);

// post like

router.post(
  '/:postid/likes',
  middleACL({ resource: 'posts', action: 'create', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.postLike(req, res))
);

// post unlike

router.delete(
  '/:postid/likes',
  middleACL({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: async (req) =>
      likesServices.getLikeInfo(req.session.profileid, req.params.postid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => postsControllers.deleteLike(req, res))
);

module.exports = router;
