//Import Modal

const uploadImageModel = require('../models/uploadImage.model');

const postImage = (req, res) => {
  if (!req.body) return;

  const newImage = {
    title: dataFromPost.title,
    price: dataFromPost.price,
    category: dataFromPost.category,
    description: dataFromPost.description,
    releasedate: dataFromPost.releasedate,
    images: dataFromPost.images
  };

  uploadImageModel.modelPostImage(newImage, res);
};

module.exports = {
  postImage,
};
