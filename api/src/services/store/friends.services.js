const db = require('../db');

module.exports = {
  getFriends: async (profileId) =>
    db
      .select()
      .from('Friend')
      .leftJoin(
        'AccessFriend',
        'Friend.accessFriendId',
        '=',
        'AccessFriend.accessFriendId'
      )
      .where('AccessFriend.role', '=', 'Friends')
      .andWhere((builder) =>
        builder.where('Friend.requestUserId', '=', profileId)
          .orWhere('Friend.respondUserId', '=', profileId)),

  getFriendById: async (friendId) =>
    db
      .select()
      .from('Friend')
      .where('friendId', friendId)
      .first(),

  getRequests: async (profileId) =>
    db
      .select()
      .from('Friend')
      .leftJoin(
        'AccessFriend',
        'Friend.accessFriendId',
        '=',
        'AccessFriend.accessFriendId'
      )
      .where('AccessFriend.role', '=', 'Request')
      .andWhere((builder) =>
        builder.where('Friend.requestUserId', '=', profileId)
          .orWhere('Friend.respondUserId', '=', profileId)),

  getFriendRequests: async (profileId) =>
    db
      .select(
        'Friend.*',
        'AccessFriend.*',
        'Profile.profileId',
        'Profile.avatarLink',
        'Profile.name',
      )
      .from('Friend')
      .leftJoin(
        'AccessFriend',
        'Friend.accessFriendId',
        '=',
        'AccessFriend.accessFriendId'
      )
      .innerJoin('Profile', 'Profile.profileId', '=', 'Friend.respondUserId')
      .where('AccessFriend.role', '=', 'Request')
      .andWhere('Friend.requestUserId', '=', profileId),

  getFriendRespond: async (profileId) =>
    db
      .select(
        'Friend.*',
        'AccessFriend.*',
        'Profile.profileId',
        'Profile.avatarLink',
        'Profile.name',
      )
      .from('Friend')
      .leftJoin(
        'AccessFriend',
        'Friend.accessFriendId',
        '=',
        'AccessFriend.accessFriendId'
      )
      .innerJoin('Profile', 'Profile.profileId', '=', 'Friend.requestUserId')
      .where('AccessFriend.role', '=', 'Request')
      .andWhere('Friend.respondUserId', '=', profileId),

  checkFriend: async (profileId, authId) =>
    db
      .select(
        'Friend.*',
        'AccessFriend.*',
      )
      .from('Friend')
      .leftJoin(
        'AccessFriend',
        'Friend.accessFriendId',
        '=',
        'AccessFriend.accessFriendId'
      )
      .where((builder) =>
        builder.where('Friend.requestUserId', '=', authId)
          .andWhere('Friend.respondUserId', '=', profileId))
      .orWhere((builder) =>
        builder.where('Friend.requestUserId', '=', profileId)
          .andWhere('Friend.respondUserId', '=', authId))
      .first(),

  deleteFriend: async (friendId) =>
    db('Friend')
      .delete()
      .where('Friend.friendId', friendId),

  addRequest: async (data) =>
    db('Friend')
      .insert(data)
      .returning('friendId'),

  changeFriendRequest: async (friendId, accessFriendId) =>
    db('Friend')
      .update({ accessFriendId })
      .where('Friend.friendId', friendId)
      .returning('friendId'),

};
