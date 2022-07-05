const router = require('express').Router();
const upload = require('../services/multer/multer-avatar');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const middleACL = require('../middlewares/ACL');
const profilesServices = require('../services/store/profiles.services');
const filesControllers = require('../controllers/files');

// get profile avatar

router.get(
  '/avatar/:profileid',
  middleAsync(async (req, res) => filesControllers.getAvatar(req, res))
);

// show file

router.get('/images/:profileid/posts/:filename', (req, res) =>
  filesControllers.getFile(req, res));

// update profile avatar

router.post(
  '/:profileid/avatar',
  middleACL({ resource: 'files', action: 'create', possession: 'any' }),
  auth,
  upload.single('avatar'),
  middleAsync(async (req, res) => filesControllers.postAvatar(req, res))
);

// update profile avatar

router.delete(
  '/avatar/:profileid',
  middleACL({
    resource: 'files',
    action: 'delete',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  auth,
  middleAsync(async (req, res) => filesControllers.deleteAvatar(req, res))
);

module.exports = router;
