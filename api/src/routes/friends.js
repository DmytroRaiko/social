const router = require('express').Router();
const auth = require('../middlewares/auth');
const friendsController = require('../controllers/friends');
const middleAsync = require('../middlewares/async');
const middleAcl = require('../middlewares/acl');
const { getFriendById } = require('../services/store/friends.services');

router.get(
  '/recommendations',
  auth,
  middleAsync(async (req, res) => friendsController.getRecommendations(req, res))
);

router.get(
  '/:profileId',
  middleAsync(async (req, res) => friendsController.profileFriends(req, res))
);

router.get(
  '/requests',
  auth,
  middleAsync(async (req, res) => friendsController.profileFriendsRequests(req, res))
);

router.get(
  '/check/friend/:profileId',
  auth,
  middleAsync(async (req, res) => friendsController.checkFriend(req, res))
);

router.get(
  '/requests/:type',
  auth,
  middleAsync(async (req, res) => friendsController.profileFriendsRequestsByType(req, res))
);

router.delete(
  '/:friendId',
  auth,
  middleAcl({
    resource: 'friends',
    action: 'delete ',
    possession: 'own',
    getResource: (req) => getFriendById(req.params.friendId),
    isOwn: (resource, profileId) =>
      resource.requestUserId === profileId
      || resource.respondUserId === profileId,
  }),
  middleAsync(async (req, res) => friendsController.deleteFriend(req, res))
);

router.put(
  '/send-request',
  auth,
  middleAsync(async (req, res) => friendsController.sendRequest(req, res))
);

router.put(
  '/ban/:type',
  auth,
  middleAsync(async (req, res) => friendsController.banOrUnban(req, res))
);

router.put(
  '/accept/:requestId',
  auth,
  middleAcl({
    resource: 'friends',
    action: 'update',
    possession: 'own',
    getResource: (req) => getFriendById(req.params.requestId),
    isOwn: (resource, profileId) =>
      resource.requestUserId === profileId
      || resource.respondUserId === profileId,
  }),
  middleAsync(async (req, res) => friendsController.acceptRequest(req, res))
);

router.put(
  '/revoke/:requestId',
  auth,
  middleAcl({
    resource: 'friends',
    action: 'update',
    possession: 'own',
    getResource: (req) => getFriendById(req.params.requestId),
    isOwn: (resource, profileId) =>
      resource.requestUserId === profileId
      || resource.respondUserId === profileId,
  }),
  middleAsync(async (req, res) => friendsController.revokeRequest(req, res))
);

router.delete(
  '/cancel/:requestId',
  auth,
  middleAcl({
    resource: 'friends',
    action: 'delete',
    possession: 'own',
    getResource: (req) => getFriendById(req.params.requestId),
    isOwn: (resource, profileId) =>
      resource.requestUserId === profileId
      || resource.respondUserId === profileId,
  }),
  middleAsync(async (req, res) => friendsController.deleteRequest(req, res))
);

module.exports = router;
