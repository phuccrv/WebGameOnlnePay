import React from "react";
import "./NavBarUserComponent.css";
import {
  BsFillGiftFill,
  BsHeartFill,
  BsFillShieldFill,
  BsFillBinocularsFill,
  BsFillCassetteFill,
  BsFillFlagFill,
  BsFillLightningFill,
  BsBoxFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

const NavBarUserComponent = ({ onGenreSelect }) => {
  const handleGenreSelect = (genre) => {
    onGenreSelect(genre);
  };

  return (
    <div className="navbar-all">
      <div className="nav-bar">
        <h1>Filters</h1>
        <Link to="/history" className="Filters">
          <BsHeartFill />
          <p>Purchase History</p>
        </Link>
        {/* Genres */}
        <h1>Genres</h1>
        <Link
          to="/"
          className="Genres"
          onClick={() => handleGenreSelect("Action")}
        >
          <BsBoxFill />
          <p>Action</p>
        </Link>
        <Link
          to="/"
          className="Genres"
          onClick={() => handleGenreSelect("Strategy")}
        >
          <BsFillShieldFill />
          <p>Strategy</p>
        </Link>
        <Link
          to="/"
          className="Genres"
          onClick={() => handleGenreSelect("RPG")}
        >
          <BsFillBinocularsFill />
          <p>RPG</p>
        </Link>
        <Link
          to="/"
          className="Genres"
          onClick={() => handleGenreSelect("Shooter")}
        >
          <BsFillCassetteFill />
          <p>Shooter</p>
        </Link>
        <Link
          to="/"
          className="Genres"
          onClick={() => handleGenreSelect("Puzzle")}
        >
          <BsFillFlagFill />
          <p>Puzzle</p>
        </Link>
        <Link
          to="/"
          className="Genres"
          onClick={() => handleGenreSelect("Racing")}
        >
          <BsFillLightningFill />
          <p>Racing</p>
        </Link>
      </div>
    </div>
  );
};

export default NavBarUserComponent;
