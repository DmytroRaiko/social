const router = require('express').Router();
const db = require('../services/db');

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

  if (profileid !== null) {
    try {
      const profiles = await db
        .select('profile.profileid', 'profile.avatarlink', 'profile.name')
        .from('profile');

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
    const profile = await db
      .select(
        'profile.*',
        'a1.availability as emailsetting',
        'a2.availability as phonesetting',
        'a3.availability as universitysetting',
        db
          .count()
          .from('friend')
          .leftJoin(
            'accessfriend',
            'friend.accessfriendid',
            '=',
            'accessfriend.accessfriendid'
          )
          .where('accessfriend.role', '=', 'Friends')
          .andWhere('friend.requestuserid', '=', profileId)
          .orWhere('friend.responduserid', '=', profileId)
          .as('countfriends'),
        db
          .count()
          .from('post')
          .where('post.profileid', '=', profileId)
          .as('countposts')
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

    if (profile && Object.keys(profile).length) {
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
      .send({ message: 'Data fetching error', error, success: false });
  }
});

// add profile

router.post('/', async (req, res) => {
  const dataInsertProfile = req.body;

  try {
    const addPofile = await db('profile').insert(dataInsertProfile);

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
    const updateProfile = await db('profile')
      .update(dataUpdateProfile)
      .where('profileid', profileId);

    if (updateProfile && Object.keys(updateProfile).length) {
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

    if (deleteProfile && Object.keys(deleteProfile).length) {
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
  // const userProfileId = setGetCookie(req, res);

  try {
    const posts = await db
      .select(
        'post.*',
        'poststatistic.*',
        'imagelist.fotolink',
        'mylike.postlikeid'
      )
      .from('post')
      .leftJoin('imagelist', 'post.postid', '=', 'imagelist.postid')
      .join('poststatistic', 'poststatistic.postid', '=', 'post.postid')
      .leftJoin(
        db
          .select('postlikeid', 'postid', 'profile.profileid')
          .from('postlike')
          .leftJoin('profile', 'profile.profileid', '=', 'postlike.profileid')
          .where('profile.profileid', '=', profileId)
          .as('mylike'),
        'post.postid',
        '=',
        'mylike.postid'
      )
      .where('post.profileid', '=', profileId)
      .orderBy('post.timepost', 'DESC')
      .limit(10);

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
