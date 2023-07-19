import React, { useEffect, useState } from "react";
import "./AdminOrder.css";
import axios from "axios";
import AdminPage from "../../pages/AdminPage/AdminPage";

const AdminOrder = () => {
  const [orders, setOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/getorder");
      const data = response.data;
      setOrders(data);
      calculateTotalRevenue(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const calculateTotalRevenue = (orders) => {
    const total = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
    setTotalRevenue(total.toFixed(2));
  };

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
              <th>Image</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 &&
              orders.map((order) => (
                <tr key={order.idPayment}>
                  <td>{order.idPayment}</td>
                  <td>{order.title}</td>
                  <td>
                    <img src={order.url} alt="" />
                  </td>
                  <td>{order.price}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="total">
          <p>Total Revenue:</p>
          <p style={{color:"green"}}>${totalRevenue}</p>
        </div>
      </div>
      {/* ... */}
    </div>
  );
};

export default AdminOrder;
