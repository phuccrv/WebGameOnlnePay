import React, { useEffect, useState } from "react";
import "./ProductUserComponent.css";
import { BsCheckCircle, BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Pagination.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Loading from "../Loading/Loading";

const ProductUserComponent = ({ searchKeyword, handleUpdateCount }) => {
  const [games, setGames] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [isLoad, setIsLoad] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const gamesPerPage = 8;

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios("http://localhost:3000/api/v1/product/");
      setGames(response.data.data);
      setIsLoad(false);
    } catch (error) {
      console.error(error);
      setIsLoad(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("userLogin"));
  const addToCart = async (gameId) => {
    console.log(gameId);
    try {
      const userId = user?.data.idUser;
      const response = await axios.post("http://localhost:3000/api/v1/cart", {
        gameId: gameId,
        userId: userId,
      });
      console.log(response);
      if (response.status === 200) {
        setCartItems([...cartItems, gameId]);
        handleUpdateCount();
        toast.success("Added to cart!", {
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
      toast.warn("Already in cart!", {
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

  const isAddedToCart = (gameId) => {
    return addedToCart.includes(gameId);
  };

  useEffect(() => {
    let filtered = games;
    if (searchKeyword) {
      filtered = filtered.filter((game) =>
        game.title.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }
    if (selectedGenre) {
      filtered = filtered.filter((game) => game.category === selectedGenre);
    }
    setFilteredGames(filtered);
  }, [games, searchKeyword, selectedGenre]);

  const pageCount = Math.ceil(filteredGames.length / gamesPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayGames = filteredGames
    .slice(pageNumber * gamesPerPage, (pageNumber + 1) * gamesPerPage)
    .map((game) => (
      <div className="box-item" key={game.idGame}>
        <Link to={`/product/${game.idGame}`}>
          <img src={game.url} alt="" />
        </Link>
        <div className="box-dow">
          <div className="box-title">
            {isAddedToCart(game.idGame) ? (
              <p style={{ color: "#f39c12" }}>
                Added to cart <BsCheckCircle />
              </p>
            ) : (
              <p onClick={() => addToCart(game.idGame)}>
                Add to cart <BsPlusCircle />
              </p>
            )}
            <p>${game.price}</p>
          </div>
          <div className="title-dow">
            <p>{game?.title}</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="product-Page">
      {isLoad && <Loading />}
      <div className="content-title">
        <h1>Rending and interesting</h1>
        <p>Based on player counts and ratings</p>
      </div>

      <div className="list-product">{displayGames}</div>

      <div className="pagination-container">
        <ReactPaginate
          previousLabel={<BsArrowLeft />}
          nextLabel={<BsArrowRight />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductUserComponent;
