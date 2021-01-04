import React from 'react';
import './Rules.css'

function Rules() {
    return (
        <div className='rule-area'> 
            <div className='rule-title'>
                Rules:
            </div>
            <div className='rule-body'>
                1. Use arrow keys on the keyboard to direct the snake
            </div>
            <div className='rule-body'>
                2. Connect the snake and the food
            </div>
            <div className='rule-body'>
                3. The speed will increase everytime the snake eats the food
            </div>
            <div className='rule-body'>
                4. Game ends when the snake touches the border of the game area
            </div>
            <div className='rule-body'>
                5. Opposite arrow keys cannot be used consecutively
            </div>

        </div>
    )
}

export default Rules