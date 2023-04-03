import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import Layout from "./layout/Layout";
import Menu from "./components/Menu";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Apply from './pages/Apply';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('authToken') !== null;
    setIsLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('role');
    setIsLoggedIn(false);
  };

  const handleLogin = (authToken, role) => {
    sessionStorage.setItem('authToken', authToken);
    sessionStorage.setItem('role', role);
    setIsLoggedIn(true);
  };

  return (
    <Layout>
    <Menu isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Container>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/apply" element={<Apply />} exact />
          <Route path="/signup" element={<Signup />} exact />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </Container>
    </Layout>
  );
};

export default App;
