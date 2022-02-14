const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const upload = require('../services/multer/multer-avatar');
const mimetype = require('../services/multer/mimetypeArray');
const filesServices = require('../services/store/files.services');
const middleAsync = require('../middlewares/async');
const auth = require('../middlewares/auth');
const NotFoundException = require('../services/errors/NotFoundException');

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
            res.sendfile(
              `./avatars/${profileid}/avatar${mimetype[avatar[0].avatarlink]}`
            );
          } else if (err.code === 'ENOENT') {
            // File does not exist
            throw new NotFoundException('Profile avatar did`t found');
          } else {
            throw new Error(err);
          }
        }
      );
    } else {
      throw new NotFoundException('Profile avatar did`t found');
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
        res.send({
          message: 'Load avatar',
          data: filedata,
          success: true,
        });
      } else {
        throw new NotFoundException('Load avatar!');
      }
    } else {
      throw new NotFoundException('Load avatar!');
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
          throw new Error(err);
        } else {
          files.forEach((file) => {
            const fileDir = path.join(`./avatars/${profileid}`, file);

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
      throw new NotFoundException('Avatar not found');
    }
  })
);

module.exports = router;
