// @ts-nocheck
import fs from 'fs-extra';
import path from 'path';
import glob from 'glob';
import gltfPipeline from 'gltf-pipeline';

// gltf-pipeline config
const processGltf = gltfPipeline.processGltf;
const glbToGltf = gltfPipeline.glbToGltf;
const gltfPipelineOptions = {
  // separate: true,
  stats: true,
  dracoOptions: {
    // compressMeshes: true,
    compressionLevel: 6,
    // quantizePositionBits: 12,
    // quantizeNormalBits: 8,
    quantizeTexcoordBits: 16,
    // quantizeColorBits: 1,
    // quantizeGenericBits: 1,
    // unifiedQuantization: true,
  },
};
const RAWMODEL_PATH = 'public/assets/rawModels';
const MODEL_PATH = 'public/assets/models';
const RAWMODEL_FILE_EXTENSION = '.glb';
const MODEL_FILE_EXTENSION = '.gltf';
const SEPARATOR = '';

// copy, convert, compress and rename
glob(`${RAWMODEL_PATH}/**/*${RAWMODEL_FILE_EXTENSION}`, function (err, files) {
  console.log('🚧 convert glb to gltf');

  files.forEach((file) => {
    const fileName = path.basename(file);
    const outputFileName =
      path
        .basename(file, RAWMODEL_FILE_EXTENSION)
        .replace(/\s+/g, SEPARATOR)
        .toUpperCase() + MODEL_FILE_EXTENSION;
    const fileOutput = file
      .replace(RAWMODEL_PATH, MODEL_PATH)
      .replace(fileName, outputFileName);

    console.log('🥶 input file: ', file);
    const glb = fs.readFileSync(file);
    glbToGltf(glb).then((res) => {
      processGltf(res.gltf, gltfPipelineOptions).then((results) => {
        fs.mkdirSync(path.dirname(fileOutput), { recursive: true });
        fs.writeJsonSync(fileOutput, results.gltf);
      });
    });
    console.log('🤨 output file: ', fileOutput);
  });

  console.log('🤝 convert glb to gltf done');
});

// export {};
