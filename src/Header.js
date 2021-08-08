import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";


class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Favorite Books</Navbar.Brand>
      <Nav.Link>
        <Link to="/">Home</Link>
      </Nav.Link>
      <Nav.Link>
        <Link to="/profile">Profile</Link>
      </Nav.Link>
      <Nav.Link>
        <LogoutButton />
      </Nav.Link>
    </Navbar>
    );
  }
}

export default Header;
