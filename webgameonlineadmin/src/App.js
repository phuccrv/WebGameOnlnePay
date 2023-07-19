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
import RequiredAuth from "./Components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* authen */}
        <Route
          path="/login"
          index
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
        {/* home */}
        <Route element={<RequiredAuth />}>
          <Route
            path="/"
            element={
              <AdminLayout>
                {" "}
                <Dashboard />{" "}
              </AdminLayout>
            }
          />
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path="/AdminPage" element={<AdminPage />} />
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path="/AdminProduct" element={<AdminProduct />} />
        </Route>
        <Route element={<RequiredAuth />}>
          <Route path="/AdminOrder" element={<AdminOrder />} />
        </Route>

        <Route element={<RequiredAuth />}>
          <Route path="/AdminUser" element={<AdminUser />} />
        </Route>

        <Route element={<RequiredAuth />}>
          <Route path="/model" element={<UpimageProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
