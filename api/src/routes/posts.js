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

// show post where postid = :postid

router.get(
  '/:postid',
  middleAcl({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getOnePost(req, res))
);

// show post for edit

router.get(
  '/:postid/edit',
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
  '/:postid',
  middleAcl({
    resource: 'posts',
    action: 'update',
    possession: 'own',
    getResource: (req) => postsServices.getPostInfo(req.params.postid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  upload.single('postImage'),
  bodyValidation(editPost, {}),
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
  middleAcl({
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
  middleAcl({ resource: 'posts', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.getComments(req, res))
);

// add comment

router.post(
  '/:postid/comments',
  middleAcl({ resource: 'posts', action: 'create', possession: 'any' }),
  bodyValidation(addComment, {}),
  middleAsync(async (req, res) => postsControllers.postComments(req, res))
);

// change comment

router.put(
  '/:postid/comment/:commentid',
  middleAcl({
    resource: 'posts',
    action: 'update',
    possession: 'own',
    getResource: (req) => commentsServices.getCommentInfo(req.params.commentid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  bodyValidation(editComment, {}),
  middleAsync(async (req, res) => postsControllers.putComment(req, res))
);

// delete comment

router.delete(
  '/:postid/comment/:commentId',
  middleAcl({
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
  middleAcl({
    resource: 'posts',
    action: 'read',
    possession: 'any',
  }),
  middleAsync(async (req, res) => postsControllers.getLikes(req, res))
);

// post like

router.post(
  '/:postid/likes',
  middleAcl({ resource: 'posts', action: 'create', possession: 'any' }),
  middleAsync(async (req, res) => postsControllers.postLike(req, res))
);

// post unlike

router.delete(
  '/:postid/likes',
  middleAcl({
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
