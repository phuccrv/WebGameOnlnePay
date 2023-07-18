import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HistoryPayComponent.css";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import axios from "axios";

const HistoryPayComponent = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  const fetchPaymentDetails = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/payment/${id}`
      );
      if (response.status === 200) {
        const data = response.data.data;
        setPaymentDetails(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = (details) => {
    const total = details.reduce((total, item) => {
      return total + parseFloat(item.price);
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice(paymentDetails);
  }, [paymentDetails]);

  return (
    <div className="PayComponent">
      <div>
        <Link to={"/"}>
          <h1>
            <BsFillArrowLeftCircleFill />
            Back
          </h1>
        </Link>
      </div>
      <div className="all-pay">
      {paymentDetails.map((detail) => (
        <div className="inforgame">
          <div className="box-inforhst" key={detail.id}>
            <img src={detail.url} alt="ảnh" />
            <div className="tilte">
              <h3>{detail.title}</h3>
              <p>{detail.category}</p>
              <p>{detail.price}</p>
            </div>
          </div>
        </div>
      ))}
      <div className="infor-bt">
        <p className="totalPrice">Total Price: ${totalPrice.toFixed(2)}</p>

        <div className="btn-hst">
          <button>Repurchase</button>
          <button>See details</button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HistoryPayComponent;
