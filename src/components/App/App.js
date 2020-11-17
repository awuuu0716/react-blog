import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import PostPage from '../../pages/PostPage';
import Header from '../Header';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';
import { AuthContext } from '../../contexts';
import NewPostPage from '../../pages/NewPostPage'
const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (getAuthToken())
      getMe().then((response) => {
        if (response.ok) setUser(response.data);
      });
  },[]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
