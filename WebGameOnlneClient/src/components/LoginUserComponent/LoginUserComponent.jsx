import React, { useState } from "react";
import "./LoginUserComponent.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading/Loading";
import { useEffect } from "react";

const LoginUserComponent = () => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
  }, []);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await dispatch(
      login({ username: account, password })
    ).unwrap();
    console.log(data);
    if (data.data.isLocked === 0 && data.accessToken) {
      navigate("/");
    } else {
      toast.error(" account lock", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if (data.accessToken) {
    }
    // kiểm tra chưa nhập thông tin mk vs tk
    const errors = {};
    if (account.trim() === "") {
      errors.username = "Vui lòng nhập tên tài khoản!";
    }
    if (password.trim() === "") {
      errors.password = "Vui lòng nhập mật khẩu!";
    }
    setErrors(errors);
  };
  return (
    <div className="login-all">
      {/* {isLoad && <Loading />} */}
      <div className="login-box">
        <h1>Login Here</h1>
        <p>Enter your account and password to login</p>
        <form method="post" action="" onSubmit={handleSubmit}>
          <label htmlFor="">Account</label>
          <br />
          <input
            type="text"
            placeholder="Enter account..."
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <br />
          <label htmlFor="">Password</label>
          <br />
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <p>
            <Link to={"/"}>Forgot password</Link>
          </p>
          <button type="submit">Login now</button>
          <p className="title-have-account">
            <Link to={"/auth/register"}>if you don't have account</Link>
          </p>
        </form>
      </div>
      <div className="img-login">
        <img src="/imglogin.png" alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginUserComponent;
