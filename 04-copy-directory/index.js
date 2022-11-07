const { pipeline } = require("stream/promises");
const { readdir, access } = require('fs/promises');
const { createReadStream, createWriteStream, constants } = require('fs');
const { join } = require("path");

const source = join(__dirname, 'files');
const destination = join(__dirname, 'files-copy');

const copyFolder = async (sourseFolder, destinationDolder) => {
    const folderContent = await readdir(sourseFolder);

    for (const item of folderContent) {
        const sourcePath = join(sourseFolder, item);
        const destinationPath = join(destinationDolder, item);
        if (await access(destinationDolder, constants.R_OK | constants.W_OK)) {
            const rs = createReadStream(sourcePath);
            const ws = createWriteStream(destinationPath, {flags: 'w+'});
            await pipeline(rs, ws);
        } else {

        }
    }
}