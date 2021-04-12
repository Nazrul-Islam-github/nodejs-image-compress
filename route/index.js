const express = require('express');
const router = express.Router()
const upload = require('../config/multer_img_upload')
const path = require('path')
const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/upload', async (req, res) => {

    try {
        upload(req, res, (error) => {
            if (error) {
                res.status(400).send(error);
            }
            else {
                if (req.file === undefined) {
                    res.render('index', {
                        error: "Please Select an Image"
                    })
                }
                else {
                    const file = req.file
                    console.log(file.path);
                    let ext
                    if (file.mimetype == "image/jpeg") {
                        ext = "jpg";
                    }
                    if (file.mimetype == "image/png") {
                        ext = "png";
                    }

                    res.status(200).send({
                        success: "File Uploaded",
                        img: `/upload/${req.file.filename}`,
                        compress: { path: file.path, name: file.filename, ext: ext }
                    })


                }
            }
        })
    } catch (error) {
        console.log(error);
    }

})

router.post('/compress', async (req, res) => {
    const { path, name, ext } = req.body
    try {
        if (ext === 'png') {
            console.log(`this is a png file ${ext}`);
        }
        if (ext === 'jpg') {
            (async () => {
                const files = await imagemin(["upload/" + name], {
                    destination: "compressed-images",
                    plugins: [
                        imageminMozjpeg({ quality: 30 })
                    ]
                });

                res.json({ download: files[0].destinationPath, image: name });
            })();

        }
    } catch (error) {
        console.error(error);
    }
})

// download route
router.get('/download/:image', (req, res) => {
    res.download(`compressed-images\\${req.params.image}`)
})


// // compress image 
router.post('/compress/upload/:name/:ext', async (req, res) => {
    // try {
    //     if (req.params.ext === 'png') {
    //         console.log(`this is a png file ${req.params.ext}`);
    //     }
    //     if (req.params.ext === 'jpg') {
    //         (async () => {
    //             const files = await imagemin(["upload/" + req.params.name], {
    //                 destination: "compressed-images",
    //                 plugins: [
    //                     imageminMozjpeg({ quality: 30 })
    //                 ]
    //             });

    //             res.download(files[0].destinationPath);
    //         })();

    //     }
    // } catch (error) {
    //     console.error(error);
    // }
})

module.exports = router