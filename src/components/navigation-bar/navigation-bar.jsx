import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  const navigate = useNavigate();
  return (
    <Navbar bg="dark" expand="lg" data-bs-theme="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Flixirama
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* =========================
               HOME (always visible)
            ========================= */}
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>

            {/* =========================
               LOGGED-IN LINKS
               (MODIFIED: conditional rendering)
            ========================= */}
            {user && (
              <>
                <Nav.Link as={Link} to={`/users/${user.userName}`}>
                  My Profile
                </Nav.Link>

                {/* MODIFIED: Logout only when user exists */}
                <Nav.Link
                  onClick={() => {
                    onLoggedOut();
                    navigate('/login');
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}

            {/* =========================
               LOGGED-OUT LINKS
               (ADDED)
            ========================= */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
