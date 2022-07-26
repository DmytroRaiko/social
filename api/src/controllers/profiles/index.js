const profilesServices = require('../../services/store/profiles.services');
const NotFoundException = require('../../services/errors/NotFoundException');
const universitiesServices = require('../../services/store/universities.services');
const postsServices = require('../../services/store/posts.services');
const friendsServices = require('../../services/store/friends.services');

module.exports = {
  getProfiles: async (req, res) => {
    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = page * 50;
    const offset = (page - 1) * 50;

    const profiles = await profilesServices.getProfiles(offset, limit);

    if (profiles && Object.keys(profiles).length) {
      res.send({
        message: 'Fetching profiles',
        data: profiles,
        success: true,
      });
    } else {
      throw new NotFoundException('Profiles');
    }
  },

  getOneProfile: async (req, res) => {
    const { profileId } = req.params;
    const { profileId: authId } = req.session;

    const profile = await profilesServices.getProfile(profileId, authId);

    if (profile && Object.keys(profile).length) {
      let friend = {};
      if (authId !== profileId) {
        friend = await friendsServices.checkFriend(profile[0].profileId, authId);
      }

      const universityList = await universitiesServices.getProfileUniversities(
        profileId
      );

      if (universityList && universityList.length) {
        profile[0].universities = universityList;
      }

      res.send({
        message: 'Fetching profile',
        data: [{
          ...profile[0],
          friendly: friend,
        }],
        success: true
      });
    } else {
      throw new NotFoundException('Profile not found');
    }
  },

  getProfileEdit: async (req, res) => {
    const { profileId } = req.params;

    const profile = await profilesServices.getEditProfile(profileId);

    if (profile && Object.keys(profile).length) {
      const universityList =
        await universitiesServices.getProfileEditUniversities(profileId);

      if (universityList && universityList.length) {
        profile[0].universities = universityList;
      }

      res.send({ message: 'Fetching profile', data: profile, success: true });
    } else {
      throw new NotFoundException('Edited profile not found');
    }
  },

  postProfile: async (req, res) => {
    const dataInsertProfile = req.body;

    const addProfile = await profilesServices.addProfile(dataInsertProfile);

    if (addProfile && Object.keys(addProfile).length) {
      res.send({ message: 'Profile adding', data: addProfile, success: true });
    } else {
      throw new NotFoundException('Profile not found');
    }
  },

  putProfile: async (req, res) => {
    const { profileId } = req.params;

    const updateProfile = await profilesServices.updateProfile({
      name: req.body.name,
      phone: req.body.phone || null,
    }, profileId);

    await profilesServices.updateSettings({
      emailSettingId: req.body.emailSettingId,
      phoneSettingId: req.body.phoneSettingId,
      universitySettingId: req.body.universitySettingId,
    }, profileId);

    const frontArray = req.body.universities;
    const dbArray = await profilesServices.getProfileUniversities(profileId);

    // [number, number] add this university to db
    const addToDB = frontArray.filter((u) => dbArray.indexOf(u) === -1);
    // eslint-disable-next-line no-restricted-syntax
    for await (const id of addToDB) {
      await universitiesServices.addUniversityList(profileId, id);
    }

    // [number, number] add this university to db
    const deleteFromDB = dbArray.filter((u) => frontArray.indexOf(u) === -1);
    // eslint-disable-next-line no-restricted-syntax
    for await (const id of deleteFromDB) {
      await universitiesServices.deleteUniversityList(profileId, id);
    }

    if (updateProfile) {
      res.send({
        message: 'Profile updating',
        data: updateProfile,
        success: true,
      });
    } else {
      throw new NotFoundException('Profile not found');
    }
  },

  deleteProfile: async (req, res) => {
    const { profileId } = req.params;

    const deleteProfile = await profilesServices.deleteProfile(profileId);

    if (deleteProfile) {
      res.send({ message: 'Profile deleting', success: true });
    } else {
      throw new NotFoundException('Profile not found');
    }
  },

  getProfilePosts: async (req, res) => {
    const { profileId } = req.params;
    const { profileId: userProfileId } = req.session;
    const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
    const limit = 10;
    const offset = (page - 1) * 10;

    const posts = await postsServices.getAllUserPosts(profileId, userProfileId, offset, limit);

    if (posts && Object.keys(posts).length) {
      res.send({
        message: 'Show all posts for profile',
        data: posts,
        success: true,
      });
    } else {
      throw new NotFoundException('No any post');
    }
  },
};
