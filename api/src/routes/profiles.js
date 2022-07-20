const router = require('express').Router();
const profilesServices = require('../services/store/profiles.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const middleAcl = require('../middlewares/acl');
const profilesControllers = require('../controllers/profiles');
const bodyValidation = require('../middlewares/bodyValidation');
const { add, change } = require('../services/validation/profiles.validation');
const profileServices = require('../services/store/profiles.services');
const { getAvailabilitiesIds } = require('../services/store/select.services');

router.use(auth);

router.get(
  '/',
  middleAcl({ resource: 'profiles', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => profilesControllers.getProfiles(req, res))
);

// show profile, where profileId = :profileId

router.get(
  '/:profileId',
  middleAcl({ resource: 'profiles', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => profilesControllers.getOneProfile(req, res))
);

// show profile for edit

router.get(
  '/:profileId/edit',
  middleAcl({
    resource: 'profiles',
    action: 'read',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  middleAsync(async (req, res) => profilesControllers.getProfileEdit(req, res))
);

// add profile

router.post(
  '/',
  middleAcl({ resource: 'profiles', action: 'create', possession: 'any' }),
  bodyValidation(add, {
    email: { unique: (req) => profileServices.isUniqueEmail(req?.body?.email) },
  }),
  middleAsync(async (req, res) => profilesControllers.postProfile(req, res))
);

// change profile

router.put(
  '/:profileId',
  middleAcl({
    resource: 'profiles',
    action: 'update',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  bodyValidation(change, {
    emailSettingId: {
      oneOf: getAvailabilitiesIds(),
    },
    phoneSettingId: {
      oneOf: getAvailabilitiesIds(),
    },
    universitySettingId: {
      oneOf: getAvailabilitiesIds(),
    },
  }),
  middleAsync(async (req, res) => profilesControllers.putProfile(req, res))
);

// delete profile

router.delete(
  '/:profileId',
  middleAcl({
    resource: 'profiles',
    action: 'delete',
    possession: 'own',
    getResource: (req) => profilesServices.getProfileById(req.params.profileId),
    isOwn: (resource, profileId) => resource.profileId === profileId,
  }),
  middleAsync(async (req, res) => profilesControllers.deleteProfile(req, res))
);

// show all post for profile

router.get(
  '/:profileId/posts',
  middleAcl({ resource: 'profiles', action: 'read', possession: 'any' }),
  middleAsync(async (req, res) => profilesControllers.getProfilePosts(req, res))
);

module.exports = router;
