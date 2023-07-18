const express = require('express');
const route = express.Router();
const uploadImageController = require('../controllers/uploadImage.controller');

route.post('/', uploadImageController.postImage);

module.exports = route;
