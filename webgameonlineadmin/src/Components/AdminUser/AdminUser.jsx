import React from "react";
import "./AdminUser.css";
import AdminPage from "../../pages/AdminPage/AdminPage";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userAPI } from "../../api/User";

const AdminUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/get-all-users");
      setUsers(response.data.data);
      
    } catch (error) {
      console.error(error);
      
    }
  };

  const handleToggleActive = async (userId, status) => {
    try {
      if (status === 1) {
        await userAPI.lockAccount(userId, 0);
        fetchUsers();
        toast.success("Opened an account", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        await userAPI.lockAccount(userId, 1);
        fetchUsers();
        toast.error("Account locked", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-user">
      <AdminPage />
      <div className="user-admin">
        <h2>List user</h2>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Power</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.idUser}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.role === 1 ? "User" : "Admin"}</td>
                <td>
                  <button onClick={() => handleToggleActive(user.idUser, user.isLocked)}>
                    {user.isLocked === 0 ? "Active" : "Lock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminUser;
