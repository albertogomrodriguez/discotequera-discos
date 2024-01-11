// Navbar.js
import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavigationBar({ handleLogout }) {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Discotequera Discos
          </Nav.Link>
          <Nav.Link as={Link} to="/discos">
            Discos
          </Nav.Link>
          <Nav.Link as={Link} to="/contacto">
            Contacto
          </Nav.Link>
        </Nav>
        <Nav className="login">
          <Nav.Link as={Link} to="/perfil">
            Mi perfil
          </Nav.Link>
          <Nav.Link as={Link} to="/" onClick={handleLogout}>
            Cerrar sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
