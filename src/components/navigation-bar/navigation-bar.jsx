import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Flixirama
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to={`/users/${user.userName}`}>
                My Profile
              </Nav.Link>
            )}

            <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
