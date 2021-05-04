import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Admin from "./components/Admin";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import NavBar from "./components/Recurring/NavBar";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./components/CartContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <NavBar />
            <Route path="/" exact render={(props) => <Menu />} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/admin" component={Admin} />
            <Route path="/cart" component={Cart} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
