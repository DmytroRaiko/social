const router = require('express').Router();
const upload = require('../services/multer/multer-avatar');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const middleAcl = require('../middlewares/acl');
const profilesServices = require('../services/store/profiles.services');
const filesControllers = require('../controllers/files');

// get profile avatar

router.get(
  '/avatar/:profileId',
  middleAsync(async (req, res) => filesControllers.getAvatar(req, res))
);

// show file

router.get('/images/:profileId/posts/:fileName', (req, res) =>
  filesControllers.getFile(req, res));

// update profile avatar

router.post(
  '/:profileId/avatar',
  auth,
  middleAcl({ resource: 'files', action: 'create', possession: 'any' }),
  upload.single('avatar'),
  middleAsync(async (req, res) => filesControllers.postAvatar(req, res))
);

// update profile avatar

router.delete(
  '/avatar/:profileId',
  auth,
  middleAcl({
    resource: 'files',
    action: 'delete',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  middleAsync(async (req, res) => filesControllers.deleteAvatar(req, res))
);

module.exports = router;
