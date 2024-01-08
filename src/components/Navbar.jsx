import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css"; 

function NavigationBar() {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
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

          <Nav.Link as={Link} to="/contacto">
            Inicio de sesión
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
