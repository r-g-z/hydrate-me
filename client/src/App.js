import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import "./App.css";

import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Users/Login";
import Logout from "./components/Users/Logout";
import Register from "./components/Users/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Onboard from "./components/Onboard/Onboard";
import Logs from "./components/Logs";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Footer from "./components/Footer";

const App = () => {
  const [authorised, setAuthorised] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleAuth = (authed) => {
    setAuthorised(authed.authorised);
    setUser(authed.user);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setAuthorised(false);
    navigate("/");
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch(`/users/isauthorised`);
      const data = await res.json();
      console.log(data.msg);
      setAuthorised(data.authorised);
      setUser(data.user);
    };
    checkIfLoggedIn();
  }, []);

  return (
    <ChakraProvider>
      <div className="App">
        <Header authorised={authorised} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/onboarding" element={<Onboard />} />
          <Route
            path="/register"
            element={<Register handleRegister={handleAuth} />}
          />
          <Route path="/login" element={<Login handleLogin={handleAuth} />} />
          <Route
            path="logout"
            element={<Logout handleLogout={handleLogout} />}
          />
          <Route
            path="/dashboard"
            element={
              <>
                <Dashboard />
                <Footer />
              </>
            }
          />
          <Route
            path="/logs"
            element={
              <>
                <Logs /> <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Profile /> <Footer />
              </>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <>
                <EditProfile /> <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </ChakraProvider>
  );
};

export default App;
