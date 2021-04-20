import React, { useContext } from "react";
import { Alert, Button, Nav, Navbar } from "react-bootstrap";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import AuthContext from "../../contexts/AuthContext";
import logo from "../../pageLogo/AbilitiesCafeLogoFinal-1.png";
import { useHistory, useLocation } from "react-router";

const NavBar = () => {
  const location = useLocation();
  const { currentUser, logout } = useContext(AuthContext);
  const history = useHistory();
  const onSignOut = async (e) => {
    e.preventDefault();
    try {
      await logout().then(history.push("/"));
    } catch {
      console.log("error logging out");
    }
  };

  const onSignIn = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const onHome = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const onAdmin = (e) => {
    e.preventDefault();
    history.push("/admin");
  };
  return (
    <Navbar bg="light" variant="light" sticky="top">
      <Navbar.Brand href="#" onClick={onHome}>
        <img src={logo} alt="Logo" style={{ width: "65px", height: "auto" }} />{" "}
        Abilities Cafe
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {currentUser && (
            <Nav.Link href="#" onClick={onAdmin}>
              Admin
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
      <Nav variant="pill" className="mr-auto">
        {!currentUser && location.pathname !== "/login" && (
          <Nav.Link className="ml-auto">
            <Button onClick={onSignIn}>
              Sign in <FiLogIn />
            </Button>
          </Nav.Link>
        )}
        {currentUser && (
          <>
              <Alert variant="info">Signed in as: {currentUser.email}</Alert>
            <Nav.Link className="ml-auto" onClick={onSignOut}>
              <Button>
                Sign out <FiLogOut />
              </Button>
            </Nav.Link>
          </>
        )}
        {location.pathname !== "admin" && (
          <Nav.Link className="ml-auto">
            <h3>
              <AiOutlineShoppingCart />
            </h3>
          </Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
