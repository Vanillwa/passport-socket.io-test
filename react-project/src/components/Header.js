import { Container, Dropdown, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { fetchLogout } from "../service/api";

function Header() {
  const navigate = useNavigate();
  const { memoUserInfo, logout } = useAuthContext();
  const { userInfo, isLoggedIn } = memoUserInfo;

  const handleLogout = () => {
    logout();
    fetchLogout();
    navigate("/");
  };
  return (
    <Navbar expand='lg' className='bg-body-tertiary' data-bs-theme='dark' fixed='top'>
      <Container>
        <Navbar.Brand href='#home'>React</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to='/user/list'>
              User
            </Nav.Link>
            <Nav.Link as={Link} to='/chat/list'>
              Chat
            </Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn ? (
              <NavDropdown title={userInfo.nickname} id='dropdown-button-drop'>
                <NavDropdown.Item href='#'>MyPage</NavDropdown.Item>
                <Dropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to='/auth/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/auth/join'>
                  Join
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
