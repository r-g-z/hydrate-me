import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";

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
import theme from "./Theme";

const App = () => {
  const [authorised, setAuthorised] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleAuth = (authed) => {
    setAuthorised(authed.authorised);
    setUser(authed.user);
  };

  const handleLogout = () => {
    setAuthorised(false);
    navigate("/");
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users/isauthorised`,
        { credentials: "include" }
      );
      const data = await res.json();
      console.log(data.msg);
      setAuthorised(data.authorised);
      setUser(data.user);
    };
    checkIfLoggedIn();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <div className="App">
        <Container centerContent>
          <Header authorised={authorised} handleLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            {authorised && <Route path="/onboarding" element={<Onboard />} />}
            <Route
              path="/register"
              element={<Register handleRegister={handleAuth} />}
            />
            <Route path="/login" element={<Login handleLogin={handleAuth} />} />
            <Route
              path="logout"
              element={<Logout handleLogout={handleLogout} />}
            />
            {authorised && (
              <Route
                path="/dashboard"
                element={
                  <>
                    <Dashboard />
                    <Footer />
                  </>
                }
              />
            )}
            {authorised && (
              <Route
                path="/logs"
                element={
                  <>
                    <Logs /> <Footer />
                  </>
                }
              />
            )}
            {authorised && (
              <Route
                path="/profile"
                element={
                  <>
                    <Profile /> <Footer />
                  </>
                }
              />
            )}
            {authorised && (
              <Route
                path="/profile/edit"
                element={
                  <>
                    <EditProfile /> <Footer />
                  </>
                }
              />
            )}
          </Routes>
        </Container>
      </div>
    </ChakraProvider>
  );
};

export default App;
