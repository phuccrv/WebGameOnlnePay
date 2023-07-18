import React, { useEffect, useState } from "react";
import "./HeaderUserComponent.css";
import {
  BsSearchHeart,
  BsBagHeartFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";

const HeaderUserComponent = ({ onSearch,isUpdate }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const handleSearch = () => {
    onSearch(searchKeyword);
  };

  const handleLogout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("accessTokenRegister");
    localStorage.removeItem("token");

  };

  const userJson = localStorage.getItem("userLogin");
  const user = JSON.parse(userJson);
  const username = user ? user.data.username : null;

  useEffect(() => {
    fetchCartItemCount();
  }, []);

  useEffect(() => {
    fetchCartItemCount()
  }, [isUpdate]);

  const fetchCartItemCount = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userLogin")) || [];
      const userId = user.data.idUser;
      const response = await axios.get(
        `http://localhost:3000/api/v1/cart-user/${userId}`
      );

      if (response.status === 200) {
        const cartItems = response.data.data;
        const count = cartItems.length;
        setCartCount(count);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="header-page">
      <header className="headerHome">
        <div className="header-life">
          <img src="/logogame.png" alt="" />
          <p>Game Store</p>
          <div className="search-container">
            <input
              type="text"
              name="game"
              id="game"
              placeholder="Enter game..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <p onClick={handleSearch}>
              <BsSearchHeart />
            </p>
          </div>
        </div>
        <div className="header-right">
          {user ? (
            <>
              <button onClick={handleLogout}>
                <Link to={"/auth/login"}>Logout</Link>
              </button>
              <BsFillPersonFill />
              <p>{username}</p>
            </>
          ) : (
            <>
              <button>
                <Link to={"/auth/login"}>Login</Link>
              </button>
            </>
          )}
          <BsBagHeartFill />
          <Link to={"/cart"}><p>Cart: {cartCount}</p></Link>
        </div>
      </header>
    </div>
  );
};

export default HeaderUserComponent;
