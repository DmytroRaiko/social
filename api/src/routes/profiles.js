const router = require('express').Router();
const profilesServices = require('../services/store/profiles.services');
const postsServices = require('../services/store/posts.services');
const universitiesServices = require('../services/store/universities.services');

// -- must to be change -- start
// ниже заглушка!
const setGetCookie = (req, res) => {
  res.cookie('profileid', 1);
  return req.cookies.profileid || 1;
};
// -- end

// show all profiles

router.get('/', async (req, res) => {
  const profileid = setGetCookie(req, res);

  const page = req.query.page && req.query.page > 0 ? req.query.page : 1;
  const limit = page * 50;
  const offset = (page - 1) * 50;

  if (profileid !== null) {
    try {
      const profiles = await profilesServices.getProfiles(offset, limit);

      if (profiles && Object.keys(profiles).length) {
        res.status(200).send({
          message: 'Fetching profiles',
          data: profiles,
          success: true,
        });
      } else {
        res.status(404).send({ message: 'Not found', success: false });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data fetching error', error, success: false });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// show profile, where profileid = :profileid

router.get('/:profileid', async (req, res) => {
  const profileId = req.params.profileid;

  try {
    const profile = await profilesServices.getProfile(profileId);

    if (profile && Object.keys(profile).length) {
      const universityList = await universitiesServices.getProfileUniversities(
        profileId
      );

      if (universityList && universityList.length) {
        profile[0].universities = universityList;
      }

      res
        .status(200)
        .send({ message: 'Fetching profile', data: profile, success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data fetching error', error, success: false });
  }
});

// show profile for edit

router.get('/:profileid/edit', async (req, res) => {
  const profileId = req.params.profileid;

  try {
    const profile = await profilesServices.getEditProfile(profileId);

    if (profile && Object.keys(profile).length) {
      const universityList =
        await universitiesServices.getProfileEditUniversities(profileId);

      if (universityList && universityList.length) {
        profile[0].universities = universityList;
      }

      res
        .status(200)
        .send({ message: 'Fetching profile', data: profile, success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data fetching error', error, success: false });
  }
});

// add profile

router.post('/', async (req, res) => {
  const dataInsertProfile = req.body;

  try {
    const addPofile = await profilesServices.addProfile(dataInsertProfile);

    if (addPofile && Object.keys(addPofile).length) {
      res
        .status(200)
        .send({ message: 'Profile adding', data: addPofile, success: true });
    } else {
      res.status(404).send({ message: 'Not found', success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error adding data', error, success: false });
  }
});

// change profile

router.post('/:profileid', async (req, res) => {
  const profileId = req.params.profileid;
  const dataUpdateProfile = req.body;

  try {
    const updateProfile = await profilesServices.updateProfile(
      dataUpdateProfile,
      profileId
    );

    if (updateProfile) {
      res.status(200).send({
        message: 'Profile updating',
        data: updateProfile,
        success: true,
      });
    } else {
      res.status(404).send({ message: 'Profile updating', success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data updating error', error, success: false });
  }
});

// delete profile

router.delete('/:profileid', async (req, res) => {
  const profileId = req.params.profileid;

  try {
    const deleteProfile = await profilesServices.deleteProfile(profileId);

    if (deleteProfile) {
      res.status(200).send({ message: 'Profile deleting', success: true });
    } else {
      res.status(404).send({ message: 'Profile deleting', success: false });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data deleting error', error, success: false });
  }
});

// show all post for profile

router.get('/:profileid/posts', async (req, res) => {
  const profileId = req.params.profileid;
  const userProfileId = setGetCookie(req, res);

  try {
    const posts = await postsServices.getAllUserPosts(profileId, userProfileId);

    if (posts && Object.keys(posts).length) {
      res.status(200).send({
        message: 'Show all posts for profile',
        data: posts,
        success: true,
      });
    } else {
      res
        .status(200)
        .send({ message: 'Not found', success: false, data: null });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Data fetching error', error, success: false });
  }
});

module.exports = router;
