const multer = require('multer');
const path = require("path");
const uuid = require("uuid").v4;
const fse = require("fs-extra");
const jimp = require("jimp");
const { catchAsync } = require('../utils');

exports.saveImage = async (file, id) => {
    const fileName = `${uuid()}.jpg`;
    const fullFilePath = path.join(process.cwd(), 'public','avatars', id);

    console.log(fullFilePath,"full");

    await fse.ensureDir(fullFilePath);    

    const avatar = await jimp.read(file.path);
    await avatar
        .resize(250, 250)
        .quality(90)
        .writeAsync(path.join(fullFilePath, fileName));   
    
    return path.join('avatars',id, fileName);
}

// MULTER example
// config multer storage
const multerStorage = multer.diskStorage({
    destination: (req, file, cbk) => {
        cbk(null, 'tmp');
    },
    filename: (req, file, cbk) => {
        const extension = file.mimetype.split('/')[1]; // format

        // userID-random.fileExtension => ncdjasnhcjsadns-nuy48329qxbfy732nyfx73.jpg
        cbk(null, `${req.user.id}-${uuid()}.${extension}`);
    }
});

// config multer filter
const multerFilter = (req, file, cbk) => {
    // 'image/*'   
    if (file.mimetype.startsWith('image/')) {
        cbk(null, true);
    } else {
        cbk(new AppError(400, 'Please, upload images only!'), false);
    }
};

exports.uploadUserAvatar = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
}).single('avatar');

