import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faIcon1, faIcon2 } from "@fortawesome/free-solid-svg-icons";

const DummyNavbar = (props) => {
  const logoutHandler = () => {
    props.setIsLogin(!props.isLogin);
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">
          {/* <img
            src="" // Replace with the path to your logo image
            height="30"
            className="d-inline-block align-top"
            alt="Logo"
          /> */}
          <span>DATA FABRIC</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ml-auto" style={{ float: "right" }}>
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Profile</Nav.Link>
            <Button variant="outline-light" onClick={logoutHandler}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// const DummyNavbar = () => {
//   return (
//     <Navbar bg="black" expand="lg">
//       <Navbar.Brand href="#home">Dummy Navbar</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link href="#home">Home</Nav.Link>
//           <Nav.Link href="#about">About</Nav.Link>
//           <Nav.Link href="#contact">Contact</Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

export default DummyNavbar;
