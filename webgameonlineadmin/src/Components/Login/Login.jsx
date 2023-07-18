import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/admin/login", {
        username,
        password,
      });

      const { success, accessToken, role } = response.data;
      console.log(111,response.data);
      if ( response.data.message === "Admin login successful") {
        // Lưu accessToken vào localStorage
        localStorage.setItem("accessToken", accessToken);

        // Chuyển hướng đến trang admin
        navigate("/AdminPage");
      } else {
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login">
      <h1>Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login now</button>
      </form>
    </div>
  );
};

export default Login;
