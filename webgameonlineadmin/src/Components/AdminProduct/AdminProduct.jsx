import React, { useEffect, useState } from "react";
import "./AdminProduct.css";
import AdminPage from "../../pages/AdminPage/AdminPage";
import { BsPencilSquare, BsPlusSquare, BsTrash } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpimageProduct from "./UpimageProduct";

const AdminProduct = () => {
  const [games, setGames] = useState([]);
  const [openform, setOpenForm] = useState(false);
  const [editGame, setEditGame] = useState(null);
  useEffect(() => {
    fetchGames();
  }, []);

  // Lấy danh sách game
  const fetchGames = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/product/");
      setGames(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Xoá game
  const deleteProduct = async (idGame) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/product/${idGame}`);
      // Xoá thành công, và cập nhật lại danh sách game
      fetchGames();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleForm = () => {
    setOpenForm(!openform);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleEdit = (game) => {
    setEditGame(game);
    setOpenForm(true);
  };

  return (
    <div className="admin-product">
      <AdminPage />
      <div className="porduct-admin">
        <h2>Danh sách sản phẩm</h2>
        <p onClick={toggleForm}><BsPlusSquare className="btn-add" />Add Game</p>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Price</th>
              <th>Images</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.idGame}</td>
                <td>{game.title}</td>
                <td>{game.price}</td>
                <td>
                  <img src={game.url} alt="" />
                </td>
                <td>
                  <BsPencilSquare className="btn-edit" handleEdit={handleEdit}/>
                  <BsTrash
                    className="btn-delete"
                    onClick={() => deleteProduct(game.idGame)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openform && <UpimageProduct handleClose={handleClose} editGame={editGame}/>}
      <ToastContainer />
    </div>
  );
};

export default AdminProduct;
