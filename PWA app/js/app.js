//const { text } = require("express");
const roll = document.getElementById('roll');
const label = document.getElementById('label');
const case4img = document.getElementById('case4')
const dice = document.getElementById('dice')
const body = document.getElementById('body')
const d20 = document.getElementById('d20')
const d20roll = document.getElementById('d20roll')

//important setup
dice.src = `images/dice1.png`;
let roll_times = 2;      //times you can roll before being unable to
let pausetime = 1800;    //constant time it takes for delays
var randomNum = null;
let quarterchance = Math.floor(Math.random() * 4) + 1; //randomise a number from 1 to 4
let lastNum = null;

//enables toggles for cases
let activated2 = false;
let activated3 = false;
let activated4 = false;
let activated5 = false;

//functions
function randomise() {
    randomNum = Math.floor(Math.random() * (6 /*max*/ - 1 /*min*/ + 1)) + 1 /*min*/; //randomise a number from 1 to 6
};

function dice_animation() { //dice roll and outcomes
    randomise(randomNum);
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

function outcomes() {
    setTimeout(() => {
        switch (randomNum) { //checks number
            case 3:                                         
            //inverses the color of the page
                if (activated3 === false) {
                    body.style.background = 'black';
                    h1.style.color = 'white';
                    label.style.color = 'white';
                    activated3 = true;
                } else {
                    case3or4()
                }
                break;
            case 4:                                         
            //shows funny image
                if (activated4 === false) {
                    case4img.style.visibility = 'visible';  //shows case4img
                    activated4 = true;
                } else {
                    case3or4()
                    case4img.style.visibility = 'hidden';   //hides case4img 

                }
                break;
            case 2:                                         
            //gives seizures to epileptic people
                if (activated2 === false) {
                    let frames = 30;
                    let isRed = false;
                    let flash = setInterval(() => {
                        body.style.background = isRed ? 'red' : 'blue';  //faster if statement that makes the body flash red and blue
                        body.style.color = isRed ? 'yellow' : 'green';
                        isRed = !isRed;     //returns the opposite boolean of isRed making the if statements results the second one and vice versa in rapid succession
                        frames--;
                        if (frames <= 0) {
                            clearInterval(flash);
                            body.style.background = '';
                            body.style.color = '';
                            activated2 = true;
                        }
                    }, 50);
                } else {
                    label.textContent = 'Sorry about last time'
                    case2or5();
                }
                break;
            case 5:
            //
                checkNum.textContent = 'Num is 2 or 5';     //check if Num is 2 or 5
            case 1:           
            //has a 1 in 25 chance to send you to fun land
                case1()
                break;
            case 6:
            //reveals a d20 die       
                case6();
                break;
        };
    }, 100);
}

function case6() {
    if (activated3 === true) {
        d20.style.borderColor = 'white';
        d20.style.color = 'white';
    };
    d20roll.style.visibility = 'visible';
    d20.style.visibility = 'visible';
};

function case3or4() {
    switch (quarterchance) {
        case 1:
        case 2:
            body.style.background = 'white';
            h1.style.color = 'black';
            label.style.color = 'black';
            activated3 = false;
            break;
        case 3:

            break;
    }
};

function case2or5() {
    switch (quarterchance) {
        case 1:

            break;
        case 2:

            break;
    }
};

function case1() {
    if (Math.random() < 1 / 25) {   //1 in 25 chance to open new tabs
        let i = 2;
        while (i <= 0) {
            window.open('https://pornhub.com', 'about:idk').focus();
            i--;
        }
    } else {
        setTimeout(() => {
            label.textContent = 'unlucky!';
        }, 500);
    }
};

function d20animation() {       //d20 die animation
    let d20num = Math.floor(Math.random() * (20 /*max*/ - 1 /*min*/ + 1)) + 1 /*min*/; //randomise a number 
    let frames = 20;
    let animation = setInterval(() => {
        let temp = Math.floor(Math.random() * 20) + 1;      //animation for d20 roll
        d20.textContent = temp;
        frames--;
        if (frames <= 0) {
            clearInterval(animation);
            d20.textContent = d20num; //display final num
            setTimeout(() => {
                if (d20num === 7) {
                    window.alert('67')
                    d20_die_hider()
                } if (d20num === 1) {
                    window.alert('sickswan')
                    d20_die_hider()
                } if (d20num === 9) {
                    window.alert('nice')
                    setTimeout(() => {
                        window.open('https://pornhub.com', 'about:idk').focus();
                    }, 500);
                    d20_die_hider()
                } else {
                    d20_die_hider()
                }
            }, 100);
        };
    }, 80);
};

function d20_die_hider() {
    setTimeout(() => {
        d20roll.style.visibility = 'hidden';
        d20.style.visibility = 'hidden';
    }, 400);
};

//eventlisteners

roll.onclick = function () {
    roll.disabled = true;
    if (Math.random() < 1 / 3) {
        dice_animation();
        //roll_times--;

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

d20roll.onclick = function () {
    d20roll.disabled = true;
    d20animation();
    setTimeout(() => {
        d20roll.disabled = false;
    }, pausetime);
};

