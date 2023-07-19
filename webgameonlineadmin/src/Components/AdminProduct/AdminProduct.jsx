import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./AdminProduct.css";
import AdminPage from "../../pages/AdminPage/AdminPage";
import { BsPencilSquare, BsPlusSquare, BsTrash } from "react-icons/bs";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpimageProduct from "./UpimageProduct";
import EditImageProduct from "./editImageProduct";



const AdminProduct = () => {
  const [games, setGames] = useState([]);
  const [openform, setOpenForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  
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
      confirmAlert({
        title: "Confirm delete",
        message: "Are you sure you want to delete this product?",
        buttons: [
          {
            label: "Xoá",
            onClick: async () => {
              try {
                await axios.delete(`http://localhost:3000/api/v1/product/${idGame}`);
                toast.success("Product deleted successfully!", {
                  position: toast.POSITION.BOTTOM_RIGHT,
                });
                // Xoá thành công, và cập nhật lại danh sách game
                fetchGames();
              } catch (error) {
                console.error(error);
              }
            },
          },
          {
            label: "Hủy",
            onClick: () => {
              // Do nothing when canceled
            },
          },
        ],
      });
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi xoá sản phẩm!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };


  const toggleForm = () => {
    setOpenForm(!openform);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleExit =() => {
    setEditForm(false);
  };  
  const FormEdit = (game) => {
    setSelectedGame(game);
    setEditForm(!editForm);
  };

  const reloadProducts = () => {
    fetchGames();
  };

  return (
    <div className="admin-product">
      <AdminPage />
      <div className="porduct-admin">
        <h2>Danh sách sản phẩm</h2>
        <p onClick={toggleForm}>
          <BsPlusSquare className="btn-add" />
          Add Game
        </p>
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
                  <BsPencilSquare
                    className="btn-edit"
                    onClick={() => FormEdit(game)}
                  />

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
      {openform && <UpimageProduct handleClose={handleClose} reloadProducts={reloadProducts} />}
      {editForm && <EditImageProduct handleExit={handleExit} selectedGame={selectedGame} handleClose={handleClose} reloadProducts={reloadProducts}/> }
      <ToastContainer />
    </div>
  );
};

export default AdminProduct;
