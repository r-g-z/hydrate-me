import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Users/Login";
import Logout from "./components/Users/Logout";
import Register from "./components/Users/Register";
import Footer from "./components/Footer";

const App = () => {
  const [authorised, setAuthorised] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleAuth = (authed) => {
    setAuthorised(authed.authorised);
    setUser(authed.user);
    navigate("/");
  };

  const handleLogout = () => {
    setAuthorised(false);
    navigate("/");
  };

  return (
    <div className="App">
      <Header authorised={authorised} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={<Register handleRegister={handleAuth} />}
        />
        <Route path="/login" element={<Login handleLogin={handleAuth} />} />
        <Route path="logout" element={<Logout handleLogout={handleLogout} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
