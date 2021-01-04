import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import fire from './config/Fire';
import './SignUp.css';
import firebase from 'firebase'

function writeUserData(userId, name, score) {
    database.ref('users/' + userId).set({
        username: name,
        highestScore: score
    });
}

var database = fire.database();




class SignUp extends Component {
    
    constructor(props) {
        super(props);
        
        this.signup = this.signup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
        this.state = {
            displayName:'',
            email:'',
            password:'',
            confirmedpassword:'',
            errorMessage:''
            
        };
    }

    redirect = () => {
        const { history } = this.props;
        if (history) history.push('/');
    }

    

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    signup(e) {
        e.preventDefault();
        this.state.errorMessage= '';
        if (this.state.password != this.state.confirmedpassword) {
            this.state.errorMessage= 'Password Mismatch';
            console.log(this.state.errorMessage);
            alert(`${this.state.errorMessage}, please re-enter your password.`);
            return this.state.errorMessage;
        } 
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
                
            var user = fire.auth().currentUser;
            user.updateProfile({
            
                displayName: this.state.displayName,
                }).then(function() {
                }).catch(function(error) {
            
            });
            writeUserData(user.uid, user.displayName, 0);
            this.redirect();
        }).catch((error) => {
            console.log(error);
        });
        
    }

    

   

    


    render() {
        
        return (

            <div>
                
                <div className="signup-tab">
                    <form>
                        <div class="form-group">
                            <label className="signup-title"
                                    for="exampleInputEmail1"
                                    >Username</label>
                            <input 
                                    value={this.state.displayName} 
                                    onChange={this.handleChange} 
                                    type="displayName" name="displayName" 
                                    class="form-control" 
                                    id="exampleDisplayName" 
                                    placeholder="Create a Username" /> 
                            
                        </div>

                        <div class="form-group">
                            <label className="signup-title"
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
                            <label className="signup-title"
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

                        <div class="form-group">
                            <label className="signup-title"
                                    for="exampleInputPassword1">Confirmed Password</label>
                            <input
                                    value={this.state.confirmedpassword} 
                                    onChange={this.handleChange} 
                                    type="password" name="confirmedpassword" 
                                    class="form-control" 
                                    id="exampleInputPassword1" 
                                    placeholder="Re-Enter Password" 
                                    />
                        </div>
                    

                        <button 
                                onClick={this.signup}
                                className="login-button">Sign Up</button>  

                    </form>
        
                </div>

                

            </div>
        );
    }
}

export default SignUp