const fs = require('fs');
const path = require('path');
const filesServices = require('../../services/store/files.services');
const NotFoundException = require('../../services/errors/NotFoundException');
const mimetype = require('../../services/multer/mimetypeArray');

const ROOT_DIR = path.resolve(__dirname, '../../../');

module.exports = {
  getAvatar: async (req, res) => {
    const { profileId } = req.params;

    const avatar = await filesServices.getProfileAvatar(profileId);

    if (avatar && Object.keys(avatar).length && avatar[0].avatarLink) {
      fs.stat(
        `./images/${profileId}/avatar${mimetype[avatar[0].avatarLink]}`,
        (err) => {
          if (err === null) {
            // File exist
            res.sendFile(
              `./images/${profileId}/avatar${mimetype[avatar[0].avatarLink]}`,
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
  },

  getFile: async (req, res) => {
    const { profileId, fileName } = req.params;
    const pathFile = `./images/${profileId}/posts/${fileName}`;

    fs.stat(pathFile, (err) => {
      if (err === null) {
        // File exist
        res.sendFile(pathFile, {
          root: ROOT_DIR,
        });
      } else if (err.code === 'ENOENT') {
        throw new NotFoundException('files');
      } else {
        throw new Error('File system error');
      }
    });
  },

  postAvatar: async (req, res) => {
    const { profileId } = req.params;

    const fileData = req.file;

    if (fileData) {
      const avatarUpdate = await filesServices.updateProfileAvatar(
        profileId,
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
  },

  deleteAvatar: async (req, res) => {
    const { profileId } = req.params;

    const avatarDelete = await filesServices.deleteProfileAvatar(profileId);

    if (avatarDelete) {
      fs.readdir(`./images/${profileId}`, (err, files) => {
        if (err) {
          throw new Error(err);
        } else {
          files.forEach((file) => {
            const fileDir = path.join(`./images/${profileId}`, file);

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
  },
};
