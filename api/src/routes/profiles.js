const router = require('express').Router();
const profilesServices = require('../services/store/profiles.services');
const postsServices = require('../services/store/posts.services');
const universitiesServices = require('../services/store/universities.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const NotFoundException = require('../services/errors/NotFoundException');

router.use(auth);

router.get(
  '/',
  middleAsync(async (req, res) => {
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
  })
);

// show profile, where profileid = :profileid

router.get(
  '/:profileid',
  middleAsync(async (req, res) => {
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
  })
);

// show profile for edit

router.get(
  '/:profileid/edit',
  middleAsync(async (req, res) => {
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
  })
);

// add profile

router.post(
  '/',
  middleAsync(async (req, res) => {
    const dataInsertProfile = req.body;

    const addPofile = await profilesServices.addProfile(dataInsertProfile);

    if (addPofile && Object.keys(addPofile).length) {
      res.send({ message: 'Profile adding', data: addPofile, success: true });
    } else {
      throw new NotFoundException('Profile not found');
    }
  })
);

// change profile

router.put(
  '/:profileid',
  middleAsync(async (req, res) => {
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
  })
);

// delete profile

router.delete(
  '/:profileid',
  middleAsync(async (req, res) => {
    const profileId = req.params.profileid;

    const deleteProfile = await profilesServices.deleteProfile(profileId);

    if (deleteProfile) {
      res.send({ message: 'Profile deleting', success: true });
    } else {
      throw new NotFoundException('Profile not found');
    }
  })
);

// show all post for profile

router.get(
  '/:profileid/posts',
  middleAsync(async (req, res) => {
    const profileId = req.params.profileid;
    const userProfileId = req.session.profileid;

    const posts = await postsServices.getAllUserPosts(profileId, userProfileId);

    if (posts && Object.keys(posts).length) {
      res.send({
        message: 'Show all posts for profile',
        data: posts,
        success: true,
      });
    } else {
      throw new NotFoundException('There no posts yet here!');
    }
  })
);

module.exports = router;
