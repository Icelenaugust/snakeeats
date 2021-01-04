import React, { Component } from 'react';
import fire from './config/Fire';
import './LogIn.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
  } from "react-router-dom";
import SignUp from './SignUp';
import Game from './Game';
import firebase from 'firebase'



class LogIn extends Component {
    
    constructor(props) {
        super(props);
        
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email:'',
            password:''
           
        };
    }

    redirect = () => {
        const { history } = this.props;
        if (history) history.push('/game');
    }

    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            this.redirect();
            
        }).catch((error) => {
            console.log(error);
            alert(`Failed to log in. ${error} Please try again.`);
        });
        
    }

    

    

    

    render() {
        return (
            
            <div className="login-tab">
                <form>
                    <div class="form-group">
                        <label className="title"
                                for="exampleInputEmail1"
                                >Email Address</label>
                        <input 
                                value={this.state.email} 
                                onChange={this.handleChange} 
                                type="email" name="email" 
                                class="form-control" 
                                id="exampleInputEmail1" 
                                placeholder="Enter Email" /> 
                        
                    </div>
                    <div class="form-group">
                        <label className="title"
                                for="exampleInputPassword1">Password</label>
                        <input
                                value={this.state.password} 
                                onChange={this.handleChange} 
                                type="password" name="password" 
                                class="form-control" 
                                id="exampleInputPassword1" 
                                placeholder="Enter Password" 
                                />
                    </div>
                    
                    <button type="submit" 
                            onClick={this.login} 
                            className="login-button">Log In</button>
                    
                        
                    <Link to='/signup' style={{ textDecoration: 'none' }}>
                        <button  
                            className="signup-button">Do not have an account? Sign up here</button>
                    </Link>
                    
                </form>
     
            </div>

        );
    }
}

export default LogIn