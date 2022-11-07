const path = require('path');
const fs = require('fs');
const { mkdir, rm, readdir, copyFile } = require('fs/promises');

const copyDir = (sourceFolder, destinationFolder) => {

  const copy = () => {
    const files = readdir(path.join(sourceFolder));

    files.then(resolve => resolve.forEach(item => {
      fs.stat(path.join(sourceFolder, item), (err, data) => {
        if (err) throw err;

        if (data.isDirectory()) {
          copyDir(path.join(sourceFolder, item), path.join(destinationFolder, item));
        } else {
          copyFile(path.join(sourceFolder, item), path.join(destinationFolder, item));
        }
      });
    }));
  }

  mkdir(path.join(destinationFolder), {recursive: true})
    .then(resolve => {
      if (!resolve) {
        rm(path.join(destinationFolder), {recursive: true})
          .then(() => {
            mkdir(path.join(destinationFolder));
            copy();
          });
      } else {
        copy();
      }
    });
}

const source = path.join(__dirname, 'files');
const destination = path.join(__dirname, 'files-copy');

copyDir(source, destination);