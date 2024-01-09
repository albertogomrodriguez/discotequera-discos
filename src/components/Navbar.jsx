import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function NavigationBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cierre de sesión iniciado");
    localStorage.removeItem("authToken");
    navigate("/");
    console.log("Cierre de sesión realizado");
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Discotequera Discos
          </Nav.Link>
          <Nav.Link as={Link} to="/nacional">
            Nacional
          </Nav.Link>
          <Nav.Link as={Link} to="/internacional">
            Internacional
          </Nav.Link>
          <Nav.Link as={Link} to="/contacto">
            Contacto
          </Nav.Link>
        </Nav>
        <Nav className="login">
          <Nav.Link as={Link} to="/" onClick={handleLogout}>
            Cerrar sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
