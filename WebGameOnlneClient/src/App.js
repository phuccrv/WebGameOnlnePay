import "./App.css";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import LoginUserComponent from "./components/LoginUserComponent/LoginUserComponent";
import RegisterUserComponent from "./components/RegisterUserComponent/RegisterUserComponent";
import HomePage from "./pages/HomePage/HomePage";
import CartPage from "./pages/CartPage/CartPage";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import PurchaseHistory from "./pages/PurchaseHistoryPage/PurchaseHistory";
import RequiredAuth from "./components/RequireAuth";

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<HomePage />} />
        <Route element={<RequiredAuth />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/history" element={<PurchaseHistory />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<LoginUserComponent />}></Route>
          <Route path="register" element={<RegisterUserComponent />}></Route>
        </Route>
        <Route element={<RequiredAuth/>}>
          <Route path="/product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
