const multer = require('multer');
const path = require('path')

// set storage engine
const storageEngine = multer.diskStorage({
    destination: './upload/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }

})

// init upload
const upload = multer({
    storage: storageEngine,
    limits: { fileSize: 100000000 },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb)
    }
}).single('myfile1')



// validate image
const checkFileType = (file, cb) => {
    // allowed file extention
    const fileType = /jpeg|jpg|png|gif/
    // check ext
    const extName = fileType.test(path.extname(file.originalname).toLowerCase());


    // check mimetype
    const mimetype = fileType.test(file.mimetype)
    if (mimetype && extName) {
        return cb(null, true)
    } else {
        return cb('Error: image only')
    }
}

module.exports = upload