const router = require('express').Router();
const db = require('../services/db');

// -- must to be change -- start
// ниже заглушка!
const setGetCookie = (req, res) => {
  res.cookie('profileid', 1);
  return req.cookies.profileid || null;
};
// -- end

// show all profiles

router.get('/', async (req, res) => {
  const profileid = setGetCookie(req, res);

  if (profileid !== null) {
    try {
      const profiles = await db
        .select('profileid', 'avatarlink', 'name')
        .from('profile');

      if (profiles) {
        res.status(200).send({
          message: 'Fetching profiles',
          data: profiles,
          success: true,
        });
      } else {
        res.status(404).send({ message: 'Not found', success: true });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Data fetching error', error, success: true });
    }
  } else {
    res.status(401).send({ message: 'Access denied', success: false });
  }
});

// show profile, where profileid = :profileid

router.get('/:profileid', async (req, res) => {
  const profileId = req.params.profileid;

  try {
    const profile = await db
      .select(
        'profile.*',
        'a1.availability as emailsetting',
        'a2.availability as phonesetting',
        'a2.availability as universitysetting'
      )
      .from('profile')
      .join(
        'profilesetting',
        'profilesetting.profileid',
        '=',
        'profile.profileid'
      )
      .as('settingsTable')
      .join(
        'availability as a1',
        'profilesetting.emailsettingid',
        '=',
        'a1.availabilityid'
      )
      .join(
        'availability as a2',
        'profilesetting.phonesettingid',
        '=',
        'a2.availabilityid'
      )
      .join(
        'availability as a3',
        'profilesetting.universitysettingid',
        '=',
        'a3.availabilityid'
      )
      .where('profile.profileid', profileId);

    if (profile) {
      const universityList = await db
        .select('university.name', 'university.universityid')
        .from('universitylist')
        .join(
          'university',
          'university.universityid',
          '=',
          'universitylist.universityid'
        )
        .where('profileid', profileId);

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
      .send({ message: 'Data fetching error', error, success: true });
  }
});

// add profile

router.post('/', async (req, res) => {
  const dataInsertProfile = req.body;

  try {
    await db('profile').insert(dataInsertProfile);

    res.status(200).send({ message: 'Profile adding', success: true });
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
    const updateProfile = await db('profile')
      .update(dataUpdateProfile)
      .where('profileid', profileId);

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
    const deleteProfile = await db
      .from('profile')
      .where('profileid', profileId)
      .delete();

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
    const posts = await db
      .select()
      .from(() => {
        this.select(
          'profile.profileid',
          'profile.name',
          'profile.avatarlink',
          'post.*',
          'poststatistic.*',
          'postlike.postlikeid',
          'postlike.profileid as profilelike'
        )
          .from('profile')
          .join('post', 'post.profileid', '=', 'profile.profileid')
          .join('poststatistic', 'poststatistic.postid', '=', 'post.postid')
          .leftJoin('postlike', 'post.postid', '=', 'postlike.postid')
          .where('profile.profileid', '=', profileId)
          .orderBy('post.timepost', 'DESC')
          .as('posts');
      })
      .where('posts.profilelike', '=', userProfileId)
      .orWhereNull('posts.postlikeid')
      .limit(10);

    if (posts) {
      res.status(200).send({
        message: 'Show all posts for profile',
        data: posts,
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
});

module.exports = router;
