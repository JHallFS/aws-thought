const router = require('express').Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const paramsConfig = require('../utils/params-config');



const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
        callback(null, '');
    }
});

const upload = multer({ storage }).single('image');

router.post('/image-upload', upload, (req, res) => {
    const params = paramsConfig(req.file);
    s3.upload(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        }
        res.json(data);
    });
});

module.exports = router;