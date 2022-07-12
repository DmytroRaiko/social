const profilesServices = require('../../services/store/profiles.services');
const NotFoundException = require('../../services/errors/NotFoundException');
const universitiesServices = require('../../services/store/universities.services');
const postsServices = require('../../services/store/posts.services');

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
    const profileId = req.params.profileid;

    const profile = await profilesServices.getProfile(profileId);

    if (profile && Object.keys(profile).length) {
      const universityList = await universitiesServices.getProfileUniversities(
        profileId
      );

      if (universityList && universityList.length) {
        profile[0].universities = universityList;
      }

      res.send({ message: 'Fetching profile', data: profile, success: true });
    } else {
      throw new NotFoundException('Profile not found');
    }
  },

  getProfileEdit: async (req, res) => {
    const profileId = req.params.profileid;

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

    const addPofile = await profilesServices.addProfile(dataInsertProfile);

    if (addPofile && Object.keys(addPofile).length) {
      res.send({ message: 'Profile adding', data: addPofile, success: true });
    } else {
      throw new NotFoundException('Profile not found');
    }
  },

  putProfile: async (req, res) => {
    const profileId = req.params.profileid;

    const dataUpdateProfile = {
      name: req.body.name,
      email: req.body.email || null,
      phone: req.body.phone || null,
    };

    const updateProfile = await profilesServices.updateProfile(
      dataUpdateProfile,
      profileId
    );

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
    const profileId = req.params.profileid;

    const deleteProfile = await profilesServices.deleteProfile(profileId);

    if (deleteProfile) {
      res.send({ message: 'Profile deleting', success: true });
    } else {
      throw new NotFoundException('Profile not found');
    }
  },

  getProfilePosts: async (req, res) => {
    const profileId = req.params.profileid;
    const userProfileId = req.session.profileid;
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
