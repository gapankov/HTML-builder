const { readdir, stat } = require('fs/promises');
const path = require('path');

 const getBaseName = (pathToFile, ext) => {
    return path.basename(pathToFile, ext);
 }

 const getExtension = (pathToFile) => {
    return path.extname(pathToFile).slice(1);
 }

 const getSize = (fileStats) => {
    return fileStats.size; 
 }

 const readDirectory = async () => {
    const pathToFolder = path.join(__dirname, 'secret-folder');

    try {
        const folderContent = await readdir(pathToFolder);

        folderContent.forEach(async (item) => {
            const pathToFile = path.join(pathToFolder, item);

            const itemStats = await stat(pathToFile);

            if(itemStats.isFile()) {
                const ext = path.extname(pathToFile);

                const basename = getBaseName(pathToFile, ext);
                const extension = getExtension(pathToFile);
                const fileSize = getSize(itemStats);

                const output = `${basename} - ${extension} - ${fileSize}b`;
                console.log(output);
            }
        })
    } catch (err) {
        if (err) {
            console.error(err.message);
        }
    }
 };

 readDirectory();