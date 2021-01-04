import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import fire from './config/Fire';
import firebase from 'firebase';
import './Game.css'
import Snake from './Snake'
import Food from './Food'

//var user = fire.auth().currentUser;
var user;
var name, email, uid;
var database = fire.database();

fire.auth().onAuthStateChanged(function(users) {
    if (users) {
      user = users;
    } else {
      // No user is signed in.
    }
});



if (user != null) {
    name = user.displayName;
    email = user.email;
    uid = user.uid;
} else {
    name = "Not Logged In";
}


function writeUserData(userId, name, score) {
    database.ref('users/' + userId).set({
        username: name,
        highestScore: score
    });
}

const getRandomCoordinates = () => {
    let min = 1;
    let max = 98;
    let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
    return [x, y]
}

const initialState = {
    
    food: getRandomCoordinates(),
    speed: 100,
    direction: 'RIGHT',
    snakeDots: [
        [0,0],
        [2,0]
    ]
}

class Game extends Component {

    state = initialState;
    

    cycleStart = () => {
        
        setInterval(this.moveSnake, this.state.speed);
        document.onkeydown = this.onkeydown;
    }

    constructor(props) {
        super(props);
        this.onkeydown = this.onkeydown.bind(this);
        this.moveSnake = this.moveSnake.bind(this);
        
    }

   
    componentDidUpdate() {
        this.checkBorder();
        this.checkSnake();
        this.checkEat();
    }

    onkeydown = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 38:
                this.setState({direction: 'UP'});
                break;
            case 40:
                this.setState({direction: 'DOWN'});
                break;
            case 37:
                this.setState({direction: 'LEFT'});
                break;
            case 39:
                this.setState({direction: 'RIGHT'});
                break;
        }
    }

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let head = dots[dots.length - 1];

        switch (this.state.direction) {
            case 'RIGHT':
                head = [head[0] + 2, head[1]];
                break;
            case 'LEFT':
                head = [head[0] - 2, head[1]];
                break;
            case 'DOWN':
                head = [head[0], head[1] + 2];
                break;
            case 'UP':
                head = [head[0], head[1] - 2];
                break;
        }
        dots.push(head);
        dots.shift();
        this.setState({
            snakeDots: dots
        })
    }

    checkBorder() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
            this.onGameOver();
        }

    }

    checkSnake() {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] == dot[0] && head[1] == dot[1]) {
                this.onGameOver();
            }
        })
    }

    checkEat() {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if (head[0] == food[0] && head[1] == food[1]) {
            this.setState({
                food: getRandomCoordinates()
            })
            this.enlargeSnake();
            this.increaseSpeed();
        }
    }

    enlargeSnake() {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([])
        this.setState({
            snakeDots: newSnake
        })
    }

    increaseSpeed() {
        if (this.state.speed > 10) {
            this.setState({
                speed: this.state.speed - 10
            })
        }
    }

    onGameOver() {
        alert(`Game Over. Snake length is ${this.state.snakeDots.length}`
            ,{text: "cancel"});

        if (user != null) {
            var currentScoreRef = fire.database().ref('users/' + user.uid + '/highestScore');
            currentScoreRef.on('value', (snapshot) => {
                const currentScore = snapshot.val();
                if (currentScore < this.state.snakeDots.length) {
                    writeUserData(user.uid, user.displayName, this.state.snakeDots.length);
                }
            });
            
            
        }

        this.setState(initialState);
    }

    render() {
        var currentScore;
        if (user) {
            var currentScoreRef = fire.database().ref('users/' + user.uid + '/highestScore');
            currentScoreRef.on('value', (snapshot) => {
                currentScore = snapshot.val();
            });
        } else {
            currentScore = "Not Loaded Yet"
        }
        
        return (
            <div className="flexbox-container">
                <div className="container">
                    <div className="player-profile">
                            Player: {user && user.displayName ? user.displayName : "Not Loaded Yet"} </div>

                    
                    <div className="player-profile">
                            Highest Score: {currentScore} </div>

                </div>
                
                <div>
                    
                    <button className="startButton" onClick={this.cycleStart}>Start</button>
                    
                    <div className='game-area'> 
                    <Snake snakeDots={this.state.snakeDots}/>
                    <Food dot={this.state.food}/>
                    </div>

            
                </div>
            </div>
        );
    }
    
}

export default Game