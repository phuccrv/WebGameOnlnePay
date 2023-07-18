import React, { useState } from "react";
import "./RegisterUserComponent.css";
import { useDispatch } from "react-redux";
import { register } from "../../store/registerSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterUserComponent = () => {

  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userLogin");
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra dữ liệu trước khi gửi
    const errors = {};
    if (username.trim() === "") {
      errors.username = "Vui lòng nhập tên người dùng!";
    }
    if (password.trim() === "") {
      errors.password = "Vui lòng nhập mật khẩu!";
    }
    if (confirmPassword.trim() === "") {
      errors.confirmPassword = "Vui lòng nhập xác nhận mật khẩu!";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "mật khẩu không khớp!";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }else{
      navigate("/auth/login");
    }
  
    // Gửi dữ liệu đăng ký
    const data = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
    };
    dispatch(register(data));
  };

  return (
    <div>
      <div className="box-register">
        <div className="img-left">
          <img src="/imgregisterleft.jpeg" alt="Register" />
        </div>
        <div className="form-register">
          <h1>REGISTER FORM</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword}</p>
            )}
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUserComponent;
