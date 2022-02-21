const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const upload = require('../services/multer/multer-avatar');
const mimetype = require('../services/multer/mimetypeArray');
const filesServices = require('../services/store/files.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const NotFoundException = require('../services/errors/NotFoundException');

const ROOT_DIR = path.resolve(__dirname, '../../');

// get profile avatar

router.get(
  '/avatar/:profileid',
  middleAsync(async (req, res) => {
    const { profileid } = req.params;

    const avatar = await filesServices.getProfileAvatar(profileid);

    if (avatar && Object.keys(avatar).length && avatar[0].avatarlink) {
      fs.stat(
        `./images/${profileid}/avatar${mimetype[avatar[0].avatarlink]}`,
        (err) => {
          if (err === null) {
            // File exist
            res.sendFile(
              `./images/${profileid}/avatar${mimetype[avatar[0].avatarlink]}`,
              {
                root: ROOT_DIR,
              }
            );
          } else if (err.code === 'ENOENT') {
            // File does not exist
            throw new NotFoundException('Profile');
          } else {
            throw new Error('Avatar loading error');
          }
        }
      );
    } else {
      throw new NotFoundException('No profile avatar');
    }
  })
);

// show file

router.get('/images/:profileid/posts/:filename', (req, res) => {
  const { profileid: profileId, filename: fileName } = req.params;
  const pathFile = `./images/${profileId}/posts/${fileName}`;

  fs.stat(pathFile, (err) => {
    if (err === null) {
      // File exist
      res.sendFile(pathFile, {
        root: ROOT_DIR,
      });
    } else if (err.code === 'ENOENT') {
      throw new NotFoundException('post');
    } else {
      throw new Error('File system error');
    }
  });
});

// update profile avatar

router.post(
  '/:profileid/avatar',
  auth,
  upload.single('avatar'),
  middleAsync(async (req, res) => {
    const { profileid } = req.params;

    const fileData = req.file;

    if (fileData) {
      const avatarUpdate = await filesServices.updateProfileAvatar(
        profileid,
        fileData.mimetype
      );

      if (avatarUpdate) {
        res.send({
          message: 'Load avatar',
          data: fileData,
          success: true,
        });
      } else {
        throw new NotFoundException();
      }
    } else {
      throw new NotFoundException();
    }
  })
);

// update profile avatar

router.delete(
  '/avatar/:profileid',
  auth,
  middleAsync(async (req, res) => {
    const { profileid } = req.params;

    const avatarDelete = await filesServices.deleteProfileAvatar(profileid);

    if (avatarDelete) {
      fs.readdir(`./images/${profileid}`, (err, files) => {
        if (err) {
          throw new Error(err);
        } else {
          files.forEach((file) => {
            const fileDir = path.join(`./images/${profileid}`, file);

            if (/^((avatar){1})+(\.png|\.jpeg|\.jpg)$/m.exec(file)) {
              fs.unlinkSync(fileDir);
            }
          });
          res.send({
            message: 'Drop avatar',
            data: avatarDelete,
            success: true,
          });
        }
      });
    } else {
      throw new NotFoundException();
    }
  })
);

module.exports = router;
