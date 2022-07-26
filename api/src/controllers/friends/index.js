const friendsServices = require('../../services/store/friends.services');
const NotFoundException = require('../../services/errors/NotFoundException');
const BadRequestException = require('../../services/errors/BadRequestException');

module.exports = {
  profileFriends: async (req, res) => {
    const { profileId } = req.params;

    const friends = await friendsServices.getFriends(profileId);

    if (friends && friends.length) {
      res.send({ message: 'Friends', data: friends, success: true });
    } else {
      throw new NotFoundException('Friends not found');
    }
  },

  profileFriendsRequests: async (req, res) => {
    const { profileId } = req.session;

    const friends = await friendsServices.getRequests(profileId);

    if (friends && friends.length) {
      res.send({ message: 'Friends', data: friends, success: true });
    } else {
      throw new NotFoundException('Friends not found');
    }
  },

  checkFriend: async (req, res) => {
    const { profileId } = req.params;
    const { profileId: authId } = req.session;

    const data = await friendsServices.checkFriend(profileId, authId);

    res.send({ data });
  },

  profileFriendsRequestsByType: async (req, res) => {
    const { profileId } = req.session;
    const { type } = req.params;

    let friends;
    if (type === 'respond') {
      friends = await friendsServices.getFriendRespond(profileId);
    } else {
      friends = await friendsServices.getFriendRequests(profileId);
    }

    if (friends && friends.length) {
      res.send({ message: 'Friends', data: friends, success: true });
    } else {
      throw new NotFoundException('Friends not found');
    }
  },

  deleteFriend: async (req, res) => {
    const { friendId } = req.params;

    const deleteFriend = await friendsServices.deleteFriend(friendId);

    if (deleteFriend) {
      res.send({ message: 'Friend has been deleted', success: true });
    } else {
      throw new NotFoundException('Friend not found');
    }
  },

  sendRequest: async (req, res) => {
    const { profileId: respondUserId } = req.body;
    const { profileId: requestUserId } = req.session;

    const checkFriendly = await friendsServices.checkFriend(respondUserId, requestUserId);

    if (!checkFriendly?.friendId) {
      const addRequest = await friendsServices.addRequest({
        requestUserId,
        respondUserId,
        accessFriendId: 3
      });

      if (addRequest) {
        res.send({ message: 'Request sent', data: addRequest[0] });
      } else {
        throw new BadRequestException();
      }
    } else {
      throw new BadRequestException();
    }
  },

  acceptRequest: async (req, res) => {
    const { requestId } = req.params;

    const changeRequest = await friendsServices.changeFriendRequest(requestId, 1);

    if (changeRequest) {
      res.send({ message: 'Request accepted' });
    } else {
      throw new NotFoundException('Friend not found');
    }
  },

  revokeRequest: async (req, res) => {
    const { requestId } = req.params;

    const changeRequest = await friendsServices.changeFriendRequest(requestId, 4);

    if (changeRequest) {
      res.send({ message: 'Request revoked' });
    } else {
      throw new NotFoundException('Friend not found');
    }
  },

  deleteRequest: async (req, res) => {
    const { requestId } = req.params;

    const deleteRequest = await friendsServices.deleteFriend(requestId);

    if (deleteRequest) {
      res.send({ message: 'Request has been deleted', success: true });
    } else {
      throw new NotFoundException('Friend not found');
    }
  },
};
