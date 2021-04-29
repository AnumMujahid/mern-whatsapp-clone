import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (user) {
      dispatch({
        type: 'SET_USER',
        user: user,
      });
    } else {
      dispatch({
        type: 'SET_USER',
        user: null,
      });
    }
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
