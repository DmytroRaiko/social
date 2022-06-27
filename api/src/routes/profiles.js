const router = require('express').Router();
const profilesServices = require('../services/store/profiles.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const middleACL = require('../middlewares/ACL');
const profilesControllers = require('../controllers/profiles');

router.use(auth);

router.get(
  '/',
  middleACL({ resource: 'profiles', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => profilesControllers.getProfiles(req, res))
);

// show profile, where profileid = :profileid

router.get(
  '/:profileid',
  middleACL({ resource: 'profiles', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => profilesControllers.getOneProfile(req, res))
);

// show profile for edit

router.get(
  '/:profileid/edit',
  middleACL({
    resource: 'profiles',
    action: 'read',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => profilesControllers.getProfileEdit(req, res))
);

// add profile

router.post(
  '/',
  middleACL({ resource: 'profiles', action: 'create', possession: 'any' }),
  middleAsync(async (req, res) => profilesControllers.postProfile(req, res))
);

// change profile

router.put(
  '/:profileid',
  middleACL({
    resource: 'profiles',
    action: 'update',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => profilesControllers.putProfile(req, res))
);

// delete profile

router.delete(
  '/:profileid',
  middleACL({
    resource: 'profiles',
    action: 'delete',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileid),
    isOwn: (resource, profileId) => resource.profileid === profileId,
  }),
  middleAsync(async (req, res) => profilesControllers.deleteProfile(req, res))
);

// show all post for profile

router.get(
  '/:profileid/posts',
  middleACL({ resource: 'profiles', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => profilesControllers.getProfilePosts(req, res))
);

module.exports = router;
