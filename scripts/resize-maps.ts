// @ts-nocheck
import fs from 'fs';
import glob from 'glob';
import im from 'imagemagick';

const MAPS_PATH = 'public/assets/maps';
// const MAPS_FILE_EXTENSIONS = ['.jpg', '.png'];
const SUBFOLDERS = ['normal', 'diffuse'];

SUBFOLDERS.forEach((subfoler) => {
  // convert to jsx
  glob(`${MAPS_PATH}/${subfoler}/**/*`, (err, files) => {
    console.log('🚧 resize textures');

    files.forEach((file) => {
      im.resize(
        {
          srcData: fs.readFileSync(file, 'binary'),
          width: 1024,
        },
        (err, stdout, stderr) => {
          if (err) throw err;
          fs.writeFileSync(file, stdout, 'binary');
        }
      );
    });

    console.log(`🤝 resize ${subfoler} maps done`);
  });
});
// export {};
