import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  return (
      <div className="router">
        <Router>
          <div className="switch">
            <Switch>
              <Route exact path="/">
                <Dashboard/>
              </Route>
             
              

            </Switch>
          </div>

        </Router>

      </div>

   



  );
}

export default App;
