// @ts-nocheck
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import gltfjsx from 'gltfjsx/src/gltfjsx';

const MODEL_PATH = 'public/assets/models';
const MODEL_FILE_EXTENSION = '.gltf';

// gltfjsx config
const gltfjsxOptions = {
  keepnames: true,
  keepgroups: true,
  types: true,
};
const COMPONENT_PATH = 'src/models';
const COMPONENT_EXTENSION = '.tsx';

// convert to jsx
glob(`${MODEL_PATH}/**/*${MODEL_FILE_EXTENSION}`, function (err, files) {
  console.log('🚧 convert gltf to tsx');

  files.forEach((file) => {
    const fileName = path.basename(file);
    const fileNameWithoutExtension = path.basename(file, MODEL_FILE_EXTENSION);

    const outputFileName = fileNameWithoutExtension + COMPONENT_EXTENSION;
    const fileOutput = file
      .replace(MODEL_PATH, COMPONENT_PATH)
      .replace(fileName, outputFileName);

    console.log('🥶 input file: ', file);

    const root = fileName;
    console.log('root: ', './' + root);
    fs.mkdirSync(path.dirname(fileOutput), { recursive: true });
    gltfjsx(file, fileOutput, {
      ...gltfjsxOptions,
      root,
    })
      .then(() => {
        console.log('🤨 output file: ', fileOutput);
      })
      .catch((e) => {
        console.log(`🚨 ${e}`);
      });
  });

  console.log('🤝 convert gltf to tsx done');
});

// export {};
