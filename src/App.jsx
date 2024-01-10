import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Componentes
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Discos from "./components/Discos";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Error from "./components/Error";
import NotFound from "./components/NotFound";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const checkUserAuthentication = () => {
    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";
    if (isAuthenticated) {
      const storedUsername = localStorage.getItem("username");
      setLoggedIn(true);
      setUsername(storedUsername);
    }
  };

  useEffect(() => {
    checkUserAuthentication();
  }, []);

  const handleLogin = (username) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
    setLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="app-container">
      <Router>
        {isLoggedIn ? (
          <div>
            <Navbar handleLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discos" element={<Discos />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/error" element={<Error />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
