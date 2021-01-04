import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home'
import Game from './pages/Game'
import LogIn from './pages/LogIn'
import fire from './pages/config/Fire';
import SignUp from './pages/SignUp'
import firebase from 'firebase'
import Rules from './pages/Rules'

class App extends Component {
  
  constructor() {
    super();
    this.state = ({
      user: null,
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        
        localStorage.setItem('user', user.uid);
        localStorage.setItem('displayName', user.displayName);
        
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }
  


  render() {

    return (
      <div className="App">
        
        <Router>
          <Navbar />

          <switch>
            <Route path='/' exact component={Home}/>
            <Route path='/game' component={Game}/>
            <Route path='/rules' component={Rules}/>
            <Route path='/login' component={LogIn}/>
            <Route path='/signup' component={SignUp}/>

          </switch>
 
        </Router>
        
      </div>
    );
  }
  
}

export default App;
