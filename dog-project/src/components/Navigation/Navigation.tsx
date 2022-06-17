import React, { FC } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import * as ROUTES from '../../util/Routes';
import styles from './Navigation.module.css';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => (
  <Navbar sticky="top" variant="dark" expand="lg" className={styles.Navigation}>
    <Container>
      <Navbar.Brand href={ROUTES.HOME}>Infinite Dogs</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={ROUTES.HOME}>Home</Nav.Link>
          <Nav.Link href={ROUTES.PARADE}>Parade</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default Navigation;
