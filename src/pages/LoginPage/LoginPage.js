import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';

const ErrorMessage = styled.div`
  color: red;
`;
// submit 需加上不能一直按的功能

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrorMessage('');
    e.preventDefault();
    login(username, password).then((data) => {
      if (data.ok === 0) return setErrorMessage(data.message);
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken('');
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push('/');
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        password:
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log in</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
