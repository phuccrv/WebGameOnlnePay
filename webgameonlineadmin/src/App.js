import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminProduct from "./Components/AdminProduct/AdminProduct";
import AdminOrder from "./Components/AdminOrder/AdminOrder";
import AdminUser from "./Components/AdminUser/AdminUser";

import AdminLayout from "./Layout/AdminLayout/AdminLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import LoginLayout from "./Layout/LoginLayout/LoginLayout";

import Login from "./Components/Login/Login";
import UpimageProduct from "./Components/AdminProduct/UpimageProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* authen */}
        <Route path="/login" element={<LoginLayout><Login /></LoginLayout>}/>
        {/* home */}
        <Route path="/" index element={ <AdminLayout> <Dashboard /> </AdminLayout>}  />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/AdminProduct" element={<AdminProduct />} />
        <Route path="/AdminOrder" element={<AdminOrder />} />
        <Route path="/AdminUser" element={<AdminUser />} />
        <Route path="/model" element={<UpimageProduct/>}/>
      </Routes>
    </div>
  );
}

export default App;
