import React from 'react';
import './App.css';
import {Navigation} from './components/nav-bar'
import {AuthNavigation} from './components/auth-nav-bar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {StartPage} from  './pages/StartPage'
import {BugPage} from './pages/BugPage'
import {LogInPage} from './pages/LogInPage'
import {RegisterPage} from './pages/RegisterPage'
function App() {
  //defines the routes of the application
  //Bugs -  gets the table  for viewing
  //LogIn - allows users to log in
  //Register - allows users to register with the platform
  function Nav()
  {
    if(localStorage.getItem("token"))
    {
      return(<AuthNavigation></AuthNavigation>)
    }
    else
    {
      return(<Navigation></Navigation>)
    }
  }
  return (
    <Router>
      <Nav/>
      <Switch>
        <Route exact path="/" component={StartPage}></Route>
        <Route exact path="/bugs" component={BugPage}></Route>
        <Route exact path="/login" component={LogInPage}></Route>
        <Route exact path="/register" component={RegisterPage}></Route>
      </Switch>
    </Router>


  )

}

export default App
