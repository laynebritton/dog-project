import React, { FC } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import * as ROUTES from "../../util/Routes";
import styles from "./Navigation.module.css";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => (
  <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href={ROUTES.HOME}>DogPictures.com</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
          <NavDropdown title="Parade" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Start</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Custom Parade
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="about">Our Mission</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
