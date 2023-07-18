import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { BsArrowLeftCircleFill, BsFillBookmarkPlusFill } from "react-icons/bs";
import HeaderUserComponent from "../../components/HeaderUserComponent/HeaderUserComponent";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    console.log(id)
    try {
      const response = await axios(
        `http://localhost:3000/api/v1/product/${id}`
      );
      setGame(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };


  const user = JSON.parse(localStorage.getItem("userLogin"));
  const addToCart = async (gameId) => {
    try {
      const userId = user.data.idUser;
      const response = await axios.post(
        "http://localhost:3000/api/v1/cart",
        {
          gameId: gameId,
          userId: userId,
        }
      );
      if (response.status === 200) {
        setCartItems([...cartItems, gameId]);
        toast.success(' add to public ^.^!', {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    } catch (error) {
      console.error(error);
      toast.warn('already in cart :)', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
    setAddedToCart((prevAddedToCart) => [...prevAddedToCart, gameId]);
  };

  // kiểm tra đã thêm vào giỏ hàng hay chưa
  const isAddedToCart = (gameId) => {
    return addedToCart.includes(gameId);
    
  };

  return (
    <div className="ProductDetail">
      {/* header */}
      <HeaderUserComponent />
      <div className="back-and-name">
        <Link to={"/"} className="back">
          <BsArrowLeftCircleFill />
          <p>Store</p>
        </Link>
        <div className="name-game">{game?.title}</div>
      </div>
      <div className="infor-game">
        <div className="img-game">
          <img src={game?.url} alt={game?.title} />
        </div>
        <div className="infor-title">
          <h2>About</h2>
          <p>{game?.description}</p>
          <div className="Category">
            <b>Category:</b> {game?.category}
          </div>
          <div className="releasedate">
            <b>Release Date:</b> {game?.releasedate}
          </div>
          <div className="price">
            <p>${game?.price}</p>
            <Link onClick={() => addToCart(game.idGame)}>
              Add to cart <BsFillBookmarkPlusFill />
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetail;
