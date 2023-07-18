import React from "react";
import HeaderUserComponent from "../../components/HeaderUserComponent/HeaderUserComponent";
import NavBarUserComponent from "../../components/NavBarUserComponent/NavBarUserComponent";
import HistoryPayComponent from "../../components/HistoryPayComponent/HistoryPayComponent";
import "./PurchaseHistory.css";
const PurchaseHistory = () => {
  return (
    <div className="pageHistory">
      <HeaderUserComponent />
      <div className="history">
        <NavBarUserComponent />
        <HistoryPayComponent />
      </div>
    </div>
  );
};

export default PurchaseHistory;
