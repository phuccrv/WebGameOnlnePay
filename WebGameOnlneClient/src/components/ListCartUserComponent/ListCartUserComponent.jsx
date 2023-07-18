import React, { useEffect, useState } from "react";
import "./ListCartUserComponent.css";
import {
  // BsFillCaretLeftFill,
  // BsFillCaretRightFill,
  BsArrowLeftCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Loading from "../Loading/Loading";

const ListCartUserComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartUpdated, setIsCartUpdated] = useState(true);
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isLoad, setIsLoad] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, [isCartUpdated]);

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userLogin"));
      const userId = user.data.idUser;
      const response = await axios.get(
        `http://localhost:3000/api/v1/cart-user/${userId}`
      );

      if (response.status === 200) {
        const items = response.data.data;
        setCartItems(items);
        setIsLoad(false)
      }
    } catch (error) {
      console.error(error);
      setIsLoad(false)
    }
  };

  const deleteCartItem = (cartItemId) => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDeleteCartItem(cartItemId),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const handleDeleteCartItem = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/cart/${cartItemId}`);
      setIsCartUpdated(!isCartUpdated);
      toast.success("Xoá sản phẩm thành công", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const itemPrice = parseFloat(item.price);
      if (!isNaN(itemPrice)) {
        totalPrice += itemPrice;
      }
    });
    return totalPrice.toFixed(2);
  };

  // lấy values từ ô input
  const handleFullnameChange = (event) => {
    setFullname(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // xử lý đưa thông tin vào bảng payment_detail
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("userLogin"));
      const userId = user.data.idUser;

      // Lấy danh sách game trong cart
      const gameItems = cartItems.map((item) => {
        return {
          game_id: item.game_id,
          title: item.title,
          price: item.price,
          url: item.url,
        };
      });

      const response = await axios.post(`http://localhost:3000/api/v1/payment/${userId}`,
      {
          order_id: userId,
          status: "paid",
          email,
          phone,
          fullname,
          gameItems,
        }
      );
      if (response.status === 200) {
        toast.success("Account information will be sent via email", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Xoá các sản phẩm trong cart sau khi thêm vào bảng payment_detail thành công
        setTimeout(() => {
          setIsCartUpdated(!isCartUpdated);
          setCartItems([]);
          setFullname("");
          setPhone("");
          setEmail("");
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="ListCartUserComponent">
       {isLoad && <Loading/>}
      <h1 className="Listcart">List Game Cart</h1>
      <table>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.url} alt="Game" />
              </td>
              <td>{item.title}</td>
              <td>${item.price}</td>
              <td>
                <p
                  className="delete"
                  onClick={() => deleteCartItem(item.idCart)}
                >
                  <BsFillTrashFill />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
        <p className="total">Total: ${calculateTotalPrice()}</p>
      </table>
      <Link to={"/"} className="back-product">
        <BsArrowLeftCircleFill />
        <p>Store</p>
      </Link>
      <div className="box-infor">
        <form action="" onSubmit={handleSubmit}>
          <h1>Billing Information</h1>
          <input
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
            value={fullname}
            onChange={handleFullnameChange}
          />
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone Number"
            value={phone}
            onChange={handlePhoneChange}
          />
          <input
            type="text"
            className="mail"
            id="mail"
            placeholder="Your Mail"
            value={email}
            onChange={handleEmailChange}
          />
          <button type="submit">Buy Now</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ListCartUserComponent;
