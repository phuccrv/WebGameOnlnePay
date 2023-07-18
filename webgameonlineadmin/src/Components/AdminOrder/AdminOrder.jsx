import React from "react";
import "./AdminOrder.css";
import AdminPage from "../../pages/AdminPage/AdminPage";
const AdminOrder = () => {
  return (
    <div className="admin-order">
      <AdminPage />
      <div className="order-order">
        <h2>Danh sách order</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name Game</th>
              <th>image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <button className="approve-button">Show</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div className="box-infor">
        <div>
          <div className="infor-user">
            <div className="infor-text">
              <h4>FullName:</h4>
              <p></p>
            </div>
            <div className="infor-text">
              <h4>Number Phone:</h4>
              <p></p>
            </div>
            <div className="infor-text">
              <h4>Choose:</h4>
              <p></p>
            </div>
            <div className="infor-text">
              <h4>Address:</h4>
              <p></p>
            </div>
            <div className="infor-text">
              <h4>Total order amount:</h4>
              <p>$ </p>
            </div>
          </div>
          <table className="table-infor">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody className="table-product">
              <tr>
                <td></td>
                <td>
                  <img src="" alt="" />
                </td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="btn-close-infor" >
          close
        </button>
      </div> */}
    </div>
  );
};

export default AdminOrder;
