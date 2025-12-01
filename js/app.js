//const { text } = require("express");
const roll = document.getElementById('roll'); 
const label = document.getElementById('label'); 
const checkNum = document.getElementById('checkNum')
const dice = document.getElementById('dice')
dice.src = `images/dice1.png`;
let randomNum;

function dice_outcomes(){ //dice roll and outcomes
    randomNum = Math.floor(Math.random() * (6 /*max*/ - 6 /*min*/ + 1)) + 6 /*min*/; //randomise a number 

    let frames = 20;
    let frameTime = 80;

    let animation = setInterval(() => {
        let temp = Math.floor(Math.random() * 6) + 1;
        dice.src = `images/dice${temp}.png`;
        frames--;
            if (frames <= 0) {
                clearInterval(animation);
                dice.src = `images/dice${randomNum}.png`;
                label.textContent = randomNum; //display num
            };
    }, frameTime);
    
    switch(randomNum) { //checks number
    case 3:
    case 4:
        checkNum.textContent = 'Num is 3 or 4';     //check if Num is 1 or 4
        break;
    case 2:
    case 5:
        checkNum.textContent = 'Num is 2 or 5';     //check if Num is 2 or 5
        break;
    case 1:
        break;
    case 6:
        if (randomNum === 6) {                      //if num is 6 there is a chance that case6 occurs
            setTimeout(() => {
                case6();
            }, 500);
        }
        break;
    };
};

function case6(){                                   //1 in 67 chance to alert 67
    if (Math.random() < 1 / 67) {
        window.alert(67)
    }
};

function case2or5(){
    chance = Math.floor(Math.random() * 4) + 1;
    switch(chance) {
    case 1:
        
        break;
    case 2:
        
        break;
    }
};

function case3or4(){
    chance = Math.floor(Math.random() * 4) + 1;
    switch(chance) {
    case 1:
        
        break;
    case 2:
        
        break;
    }
};

function case1(){
    if (Math.random() < 1/25) {                       //1 in 25 chance to open new blank tabs
        let i = 2;
        while (i <= 0) {
            window.open('about:blank', 'blank').focus();
            i--;
        }
    }
};

roll.onclick = function() {
    roll.disabled = true;

    if (Math.random() < 1/3) {
        dice_outcomes();
            setTimeout(() => {
                roll.disabled = false;
            }, 1800);
    } else {
        label.textContent = 'Try again?';
        roll.disabled = false;
    }
};