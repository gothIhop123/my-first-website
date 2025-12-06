//const { text } = require("express");
const roll = document.getElementById('roll'); 
const label = document.getElementById('label'); 
const checkNum = document.getElementById('checkNum')
const dice = document.getElementById('dice')
const body = document.getElementById('body')
const d20 = document.getElementById('d20')
const d20roll = document.getElementById('d20roll')

dice.src = `images/dice1.png`;
let roll_times = 2;                           //times you can roll before being unable to
let pausetime = 1800;                           //constant time it takes for delays
let randomNum = Math.floor(Math.random() * (6 /*max*/ - 6 /*min*/ + 1)) + 6 /*min*/; //randomise a number from 1 to 6
let quarterchance = Math.floor(Math.random() * 4) + 1; //randomise a number from 1 to 4

function dice_animation(){ //dice roll and outcomes
    let frames = 20;

    let animation = setInterval(() => {
        let temp = Math.floor(Math.random() * 6) + 1;
        dice.src = `images/dice${temp}.png`;
        frames--;
            if (frames <= 0) {
                clearInterval(animation);
                dice.src = `images/dice${randomNum}.png`;
                label.textContent = randomNum; //display final num
                outcomes(randomNum);
            };
    }, 80);
};

function outcomes() {s
    setTimeout(() => {
        switch(randomNum) { //checks number
        case 3:                                         //inverses the color of the page
            body.style.background = 'black';
            h1.style.color = 'white';
            label.style.color = 'white';
            case3or4()
            break;
        case 4:
            checkNum.textContent = 'Num is 3 or 4';     //check if Num is 1 or 4
            checkNum.style.display = 'show';
            break;
        case 2:

            break;
        case 5:
            checkNum.textContent = 'Num is 2 or 5';     //check if Num is 2 or 5
        case 1:

            break;
        case 6:                     //if num is 6 there is a chance that case6 occurs
            case6();
            break;
        };
    }, 100);
}

function case6() {                                   //reveals a d20 dice roll
    d20roll.removeAttribute("hidden");
    d20.removeAttribute("hidden");
};

function case3or4() {
    switch(quarterchance) {
    case 1:
    case 2:
        body.style.background = 'white';
        h1.style.color = 'black';
        label.style.color = 'black';
        break;
    case 3:
        
        break;
    }
};

function case2or5() {
    switch(quarterchance) {
    case 1:
        
        break;
    case 2:
        
        break;
    }
};

function case1() {
    if (Math.random() < 1/25) {                       //1 in 25 chance to open new blank tabs
        let i = 2;
        while (i <= 0) {
            window.open('https://pornhub.com', 'about:idk').focus();
            i--;
        }
    }
};

function d20animation() {
    let d20num = Math.floor(Math.random() * (7 /*max*/ - 7 /*min*/ + 1)) + 7 /*min*/; //randomise a number 
    let frames = 20;

    let animation = setInterval(() => {
        let temp = Math.floor(Math.random() * 20) + 1;      //animation for d20 roll
        d20.textContent = temp;
        frames--;
        if (frames <= 0) {
            clearInterval(animation);
            d20.textContent = d20num; //display final num
            setTimeout(() => {
                switch(d20num) {
                case 1:
                    break;
                case 7:
                    window.alert('67')
                };
            }, 100);
        };
    }, 80);
};

roll.onclick = function() {
    roll.disabled = true;

    if (Math.random() < 1/3) {
        dice_animation();
//        roll_times--;
      
        setTimeout(() => {
            if (roll_times <= 0) {
                roll.disabled = true;
            } else {
                roll.disabled = false;
            }
        }, pausetime);

    } else {
        label.textContent = 'Try again?';
        roll.disabled = false;
    };
};

d20roll.onclick = function() {
    d20roll.disabled = true;
    d20animation();
    setTimeout(() => {
        d20roll.disabled = false;
    }, pausetime);
};
