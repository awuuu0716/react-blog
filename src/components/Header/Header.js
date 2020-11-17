import { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { setAuthToken } from '../../utils';

const HeaderContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 32px;
  background: white;
`;

const Brand = styled(Link)`
  color: black;
  text-decoration: none;
  user-select: none;
  font-size: 32px;
  font-weight: bold;
`;

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`;

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) =>
    props.$active &&
    `
    background: rgba(0,0,0,0.1)
  `}
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;

  ${NavbarList} {
    margin-left: 16px;
  }
`;

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  const pathname = useLocation().pathname;
  const history = useHistory();

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if (pathname !== '/') history.push('/');
  };

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand to="/">Blog</Brand>
        <NavbarList>
          <Nav to="/" $active={pathname === '/'}>
            HomePage
          </Nav>
          <Nav to="/about" $active={pathname === '/about'}>
            About
          </Nav>
          {user && (
            <Nav to="/new-post" $active={pathname === '/new-post'}>
              New Post
            </Nav>
          )}
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        {!user && (
          <Nav to="/login" $active={pathname === '/login'}>
            Log in
          </Nav>
        )}
        {!user && (
          <Nav to="/sign-up" $active={pathname === '/sign-up'}>
            Sign up
          </Nav>
        )}
        {user && <Nav onClick={handleLogout}>log out</Nav>}
      </NavbarList>
    </HeaderContainer>
  );
}
