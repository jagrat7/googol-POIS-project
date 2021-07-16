import React  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  Home  from './Home';

import  Reg  from './Reg';
import { NoMatch } from './NoMatch';
import login  from './login';
import Navbarz from './components/Navbarz';
import { AuthProvider } from "./contexts/AuthContext"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Canvas from './Canvas';
import Pr2 from './Pr2';
import Profile from './Profile';

function App(){
 
  return (
    
    <React.Fragment>
 
      <Navbarz/>
       <Router>
          <AuthProvider>  
            <Switch>
              <Route exact path = "/" component={Home}/>
              <PrivateRoute  path = "/Profile" component={Profile}/>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Pr2  path = "/login" component={login}/>
              <Route   path = "/reg" component={Reg}/>
              <Route path="/forgot-password" component={ForgotPassword} />
              <PrivateRoute   path = "/Canvas" component={Canvas}/>
            </Switch>
          </AuthProvider>  
        </Router>
          
        
    
    </React.Fragment>
  );
  
}

export default App;
