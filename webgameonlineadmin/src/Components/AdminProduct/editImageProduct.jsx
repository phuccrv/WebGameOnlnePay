import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosClient from "../../api/axiosClient";
import { userAPI } from "../../api/User";
import "./UpimageProduct.css";

const EditImageProduct = ({
  handleExit,
  selectedGame,
  handleClose,
  reloadProducts,
}) => {
  const [imgServer, setImgServer] = useState("");
  const [allImages, setAllImages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    releasedate: "",
    images: "",
  });

  useEffect(() => {
    if (selectedGame) {
      setFormData({
        title: selectedGame.title,
        price: selectedGame.price,
        category: selectedGame.category,
        description: selectedGame.description,
        releasedate: selectedGame.releasedate,
        images: selectedGame.imageUrl,
      });
      setImgServer(selectedGame.imageUrl);
    }
  }, [selectedGame]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataFromPost = formData;
    dataFromPost.linkImage = imgServer;
    console.log(dataFromPost);

    const newImage = {
      title: dataFromPost.title,
      price: dataFromPost.price,
      category: dataFromPost.category,
      description: dataFromPost.description,
      releasedate: dataFromPost.releasedate,
      imageUrl: dataFromPost.linkImage,
    };
    console.log(newImage);
    axiosClient
      .patch(`/api/v1/edit-game/${selectedGame.idGame}`, newImage)
      .then((response) => {
        setFormData({
          title: "",
          price: "",
          category: "",
          description: "",
          releasedate: "",
          images: "",
        });
        console.log(response.data);
        reloadProducts();
        handleExit();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleImageChange = (event) => {
    console.log(event.target);
    const file = event.target.files[0];
    if (!file) return;
    // lấy hình ảnh được post lên bằng Multer
    axiosClient({
      method: "POST",
      url: "/api/v1/upload-one",
      data: { uploadImage: file },
      headers: {
        "Content-Type": "multipart/form-data; ",
      },
    })
      .then((data) => {
        console.log("Admin đã sửa ảnh", data);
        setImgServer(data.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="overlay-add">
      <div className="box-infor">
        <div className="form-infor">
          <form onSubmit={handleSubmit}>
            <label htmlFor="">Name Product</label>
            <input
              type="text"
              placeholder="enter name product"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <label htmlFor="">Price</label>
            <input
              type="text"
              placeholder="Enter price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
            />
            <label htmlFor="">Category</label>
            <input
              type="text"
              placeholder="enter category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
            <label htmlFor="">Description</label>
            <input
              type="text"
              placeholder="enter description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <label htmlFor="">Releasedate</label>
            <input
              type="date"
              name="releasedate"
              value={formData.releasedate}
              onChange={handleInputChange}
            />
            <label htmlFor="">Images</label>
            <input
              type="file"
              placeholder="Add image"
              name="images"
              onChange={handleImageChange}
            />
            <div className="btn-action">
              <button type="submit">Save</button>
              <button className="cancel" onClick={handleExit}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditImageProduct;
