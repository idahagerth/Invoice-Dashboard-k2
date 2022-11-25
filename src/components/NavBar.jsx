import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
import { useDefaultProvider } from "../context/Default";

function NavBar() {
  const { isMobile } = useDefaultProvider();
  return (
    <div style={{ position: "absolute", top: 0, width: "100%" }}>
      {isMobile ? (
        <Navbar bg="light">
          <Container>
            <Navbar.Toggle />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/Dashboard">
                  <Nav.Link>Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/TimeLogs">
                  <Nav.Link>Timelogs</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Faktura">
                  <Nav.Link>Faktura</Nav.Link>
                </LinkContainer>
                <NavDropdown title="Projects" id="basic-nav-dropdown">
                  <LinkContainer to="/Projects">
                    <NavDropdown.Item>Projects</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/Tasks">
                    <NavDropdown.Item>Tasks</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      ) : null}
    </div>
  );
}

export default NavBar;
