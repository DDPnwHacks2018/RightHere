const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const mkdirp = require('mkdirp');
const jimp = require('jimp');

exports.uploadImages = function (images) {
  try {
    const retHash = [];

    for (let i = 0; i < images.length; i += 1) {
      const data = images[i].replace(/^data:image\/\w+;base64,/, '').replace(/\s/g, '+');
      const pathMd5 = md5(data);
      const pathFolder = path.resolve(__dirname, '../uploads', pathMd5.slice(0, 2), pathMd5.slice(2, 4));
      const buf = Buffer.from(data, 'base64');

      mkdirp.sync(pathFolder, function(err) { throw err; });

      jimp.read(buf, function (err, image) {
        if (err) throw err;
        image.quality(60)
          .write(`${pathFolder}/${pathMd5.slice(4)}-ori.jpg`, (error) => { if (error) throw error; });
      });

      retHash.push(pathMd5);
    }
    return retHash;
  } catch (e) {
    throw e;
  }
};

exports.getImages = function (imagesHash) {
  try {
    const retImages = [];

    for (let i = 0; i < imagesHash.length; i += 1) {
      const pathMd5 = imagesHash[i];
      const pathFolder = path.resolve(__dirname, '../uploads', pathMd5.slice(0, 2), pathMd5.slice(2, 4));
      const data = fs.readFileSync(`${pathFolder}/${pathMd5.slice(4)}-ori.jpg`).toString('base64');
      retImages.push(data);
    }

    return retImages;
  } catch (e) {
    return null;
  }
};