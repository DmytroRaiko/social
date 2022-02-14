const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const upload = require('../services/multer/multer-avatar');
const mimetype = require('../services/multer/mimetypeArray');
const filesServices = require('../services/store/files.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');

router.use(auth);

// get profile avatar

router.get(
  '/avatar/:profileid',
  middleAsync(async (req, res) => {
    const { profileid } = req.params;

    const avatar = await filesServices.getProfileAvatar(profileid);

    if (avatar && Object.keys(avatar).length && avatar[0].avatarlink) {
      fs.stat(
        `./avatars/${profileid}/avatar${mimetype[avatar[0].avatarlink]}`,
        (err) => {
          if (err === null) {
            // File exist
            res
              .status(200)
              .sendfile(
                `./avatars/${profileid}/avatar${mimetype[avatar[0].avatarlink]}`
              );
          } else if (err.code === 'ENOENT') {
            // File does not exist
            res.status(404).send({ message: 'File loading', success: false });
          } else {
            res.status(500).send({ message: 'Unknown error', success: false });
          }
        }
      );
    } else {
      res.status(200).send({ message: 'File loading', success: false });
    }
  })
);

// update profile avatar

router.post(
  '/:profileid/avatar',
  upload.single('avatar'),
  middleAsync(async (req, res) => {
    const { profileid } = req.params;

    const filedata = req.file;

    if (filedata) {
      const avatarUpdate = await filesServices.updateProfileAvatar(
        profileid,
        filedata.mimetype
      );

      if (avatarUpdate) {
        res.status(200).send({
          message: 'Load avatar',
          data: filedata,
          success: true,
        });
      } else {
        res.status(200).send({
          message: 'Load avatar',
          data: null,
          success: false,
        });
      }
    } else {
      res.status(404).send({
        message: 'Error to load avatar',
        data: null,
        success: false,
      });
    }
  })
);

// update profile avatar

router.delete(
  '/avatar/:profileid',
  middleAsync(async (req, res) => {
    const { profileid } = req.params;

    const avatarDelete = await filesServices.deleteProfileAvatar(profileid);

    if (avatarDelete) {
      fs.readdir(`./avatars/${profileid}`, (err, files) => {
        if (err) {
          res.status(500).send({
            message: 'Drop avatar',
            error: err,
            success: false,
          });
        } else {
          files.forEach((file) => {
            const fileDir = path.join(`./avatars/${profileid}`, file);

            if (/^((avatar){1})+(\.png|\.jpeg|\.jpg)$/m.exec(file)) {
              fs.unlinkSync(fileDir);
            }
          });
          res.status(200).send({
            message: 'Drop avatar',
            data: avatarDelete,
            success: true,
          });
        }
      });
    } else {
      res.status(200).send({
        message: 'Drop avatar',
        data: null,
        success: false,
      });
    }
  })
);

module.exports = router;
