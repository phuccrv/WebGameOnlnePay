import React from "react";
import "./CartPage.css"
import HeaderUserComponent from "../../components/HeaderUserComponent/HeaderUserComponent";
import ListCartUser from "../../components/ListCartUserComponent/ListCartUserComponent";
import ListCartUserComponent from "../../components/ListCartUserComponent/ListCartUserComponent";
const CartPage = () => {
  return <div className="CartPage">
    <HeaderUserComponent/>
    <ListCartUserComponent/>
  </div>;
};

export default CartPage;
