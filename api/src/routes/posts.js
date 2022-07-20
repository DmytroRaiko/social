const router = require('express').Router();
const postsServices = require('../services/store/posts.services');
const commentsServices = require('../services/store/comments.services');
const likesServices = require('../services/store/likes.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const upload = require('../services/multer/multer-post');
const middleAcl = require('../middlewares/acl');
const bodyValidation = require('../middlewares/bodyValidation');
const postsControllers = require('../controllers/posts');
const { addPost, editPost } = require('../services/validation/posts.validation');
const { addComment, editComment } = require('../services/validation/comments.validation');

router.use(auth);

router.get(
  '/',
  middleAcl({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getAllPosts(req, res))
);

// show post where postId = :postId

router.get(
  '/:postId',
  middleAcl({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getOnePost(req, res))
);

// show post for edit

router.get(
  '/:postId/edit',
  middleAcl({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getOnePostEdit(req, res))
);

// add post

router.post(
  '/',
  middleAcl({ resource: 'posts', action: 'create', possession: 'any' }),
  upload.single('postImage'),
  bodyValidation(addPost, {}),
  middleAsync(async (req, res) => postsControllers.postPost(req, res))
);

// update post

router.put(
  '/:postId',
  middleAcl({
    resource: 'posts',
    action: 'update',
    possession: 'own',
    getResource: (req) => postsServices.getPostInfo(req.params.postId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  upload.single('postImage'),
  bodyValidation(editPost, {}),
  middleAsync(async (req, res) => postsControllers.putPost(req, res))
);

// return all posts, which has been seen by profile

router.get(
  '/history/seen',
  middleAcl({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getAllSeenPosts(req, res))
);

// view single post

router.put(
  '/view/:postId',
  middleAsync(async (req, res) => postsControllers.viewPost(req, res))
);

// delete post

router.delete(
  '/:postId',
  middleAcl({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: (req) => postsServices.getPostInfo(req.params.postId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  middleAsync(async (req, res) => postsControllers.deletePost(req, res))
);

// show all comments

router.get(
  '/:postId/comments',
  middleAcl({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getComments(req, res))
);

// add comment

router.post(
  '/:postId/comments',
  middleAcl({ resource: 'posts', action: 'create', possession: 'any' }),
  bodyValidation(addComment, {}),
  middleAsync(async (req, res) => postsControllers.postComments(req, res))
);

// change comment

router.put(
  '/:postId/comment/:commentId',
  middleAcl({
    resource: 'posts',
    action: 'update',
    possession: 'own',
    getResource: (req) => commentsServices.getCommentInfo(req.params.commentId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  bodyValidation(editComment, {}),
  middleAsync(async (req, res) => postsControllers.putComment(req, res))
);

// delete comment

router.delete(
  '/:postId/comment/:commentId',
  middleAcl({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: (req) => commentsServices.getCommentInfo(req.params.commentId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  middleAsync(async (req, res) => postsControllers.deleteComment(req, res))
);

// show all likes

router.get(
  '/:postId/likes',
  middleAcl({
    resource: 'posts',
    action: 'read',
    possession: 'any',
  }),
  middleAsync(async (req, res) => postsControllers.getLikes(req, res))
);

// post like

router.post(
  '/:postId/likes',
  middleAcl({ resource: 'posts', action: 'create', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.postLike(req, res))
);

// post unlike

router.delete(
  '/:postId/likes',
  middleAcl({
    resource: 'posts',
    action: 'delete',
    possession: 'own',
    getResource: async (req) =>
      likesServices.getLikeInfo(req.session.profileId, req.params.postId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  middleAsync(async (req, res) => postsControllers.deleteLike(req, res))
);

module.exports = router;
