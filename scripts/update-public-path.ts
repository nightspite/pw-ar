// @ts-nocheck
import replace from 'replace-in-file';

const options = {
  files: ['src/models/**/*.tsx'],
  from: /\/..\/public/g,
  to: '',
  countMatches: true,
};

replace(options)
  .then((changedFiles) => {
    console.log('Modified files:', changedFiles.join(', '));
  })
  .catch((error) => {
    console.error('Error occurred:', error);
  });
