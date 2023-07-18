const express = require('express');
const router = express.Router();

const multer = require('multer');
const uuidv4 = require('uuid/v4');

const sql = require('../../libs/database/connect.mysql');

//cấu hình multer upload one
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  }, //folder để lưu trữ
  filename: function (req, file, cb) {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

router.post('/', upload.single('uploadImage'), (req, res) => {
  const url = req.protocol + '://' + req.get('host');
  const image = url + '/images/' + req.file.filename;

  sql.query('INSERT INTO uploadOne (nameImage) VALUES (?)', [image], (err, result) => {
    if (err) {
      res.status(500).json('Loi Server');
    }
    res.status(200).json({
      image: image,
      result: result,
    });
  });
});

module.exports = router;
