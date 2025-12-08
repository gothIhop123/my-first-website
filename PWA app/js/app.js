//const { act } = require("react");
//const { text } = require("express");
const roll = document.getElementById('roll');
const label = document.getElementById('label');
const case5img = document.getElementById('case5')
const dice = document.getElementById('dice')
const body = document.getElementById('body')
const d20 = document.getElementById('d20')
const d20roll = document.getElementById('d20roll')

//important setup
dice.src = `images/dice1.png`;
let roll_times = 2;      //times you can roll before being unable to
let pausetime = 1800;    //constant time it takes for delays
var randomNum = null;
var d20num = null;
var quarterchance = null;
let lastNum = null;

function darkmode() {
    body.style.background = 'black';
    body.style.color = 'white';
    h1.style.color = 'white';
    label.style.color = 'white';
    d20.style.borderColor = 'white';
    d20.style.color = 'white';
};

function lightmode() {
    body.style.background = 'white';
    body.style.color = 'black';
    h1.style.color = 'black';
    label.style.color = 'black';
    d20.style.borderColor = 'black';
    d20.style.color = 'black';
};

function roll_disabler() {
    let check = setInterval(() => {
        if (d20roll.style.visibility === 'visible'){
            roll.disabled = true;
        } else {
            roll.disabled = false;
            clearInterval(check)
        }
    }, 40);
};

function d20_die_hider() {
    setTimeout(() => {
        d20roll.style.visibility = 'hidden';
        d20.style.visibility = 'hidden';
    }, 400);
};

function rand(min, max) {
    return Math.floor(Math.random() * (max /*max*/ - min /*min*/ + 1)) + min /*min*/; //randomise a number from 1 to 6
};

//enables toggles for cases
let activated2 = false;
let activated3 = false;
let activated4 = false;
let activated5 = false;

//functions

//                           ANIMATION FUNCTIONS
function dice_animation() { //dice roll and outcomes
    randomNum = rand(1, 6) //randomise the d20 die
    quarterchance = rand(1, 4)
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
            //inverses the color of the page and EVERYTHING ELSE
                case3();
                break;
            
            case 4:     
            //shows d20
                case4();                  
                break;
            
            case 2:                                         
            //gives seizures to epileptic people
                case2();
                break;
            
            case 5:
            //shows funny image
                case5();
                break;
            case 1:           
            //has a 1 in 25 chance to send you to fun land
                case1();
                break;
            
            case 6:
            //reveals a d20 die     
                case6();
                break;
        };
    }, 100);
};

function d20animation() {       //d20 die animation
    d20num = rand(1, 20) //randomise the d20 die
    let frames = 20;
    let animation = setInterval(() => {
        let temp = Math.floor(Math.random() * 20) + 1;      //animation for d20 roll
        d20.textContent = temp;
        frames--;
        if (frames <= 0) {
            clearInterval(animation);
            d20.textContent = d20num; //display final num
            if (randomNum === 4) { 
                d20case4()
            } else {
                d20case6()
            }
        };
    }, 80);
};

//                                D20 CASES

function d20case4() {
    switch (d20num) {
        case 20:
            window.alert('type shit')
            break;
        default:
            break;
    }
    d20_die_hider();
};

function d20case6() {
    switch (d20num) {
        case 1:
            window.alert('67')
            break;
        case 7:
            window.alert('sickswan')
            break;
        case 9:
            window.alert('nice')
            setTimeout(() => {
                window.open('https://pornhub.com', 'about:idk').focus();
            }, 500);
            break;
        default:
            break;
    };
    d20_die_hider();
};

//                           DIE CASES FUNCTIONS

function case1() {
    if (Math.random() < 1 / 25) {   //1 in 25 chance to open new tabs
        let i = 2;
        while (i >= 0) {
            window.open('https://pornhub.com', 'about:idk').focus();
            i--;
        }
    } else {
        setTimeout(() => {
            label.textContent = 'unlucky!';
        }, 500);
    }
};

function case2() {
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
                lightmode()
                if (activated3 === true) {
                    darkmode()
                }
                activated2 = true;
            }
        }, 50);
    } else {
        label.textContent = 'Sorry about last time'
        case2or5();
        activated2 = false;
    };
};

function case3() {
    if (activated3 === false) {
        darkmode()
        activated3 = true;
    } else {
        case3or4()
    }
};

function case4() {
    case3or4()
    d20roll.style.visibility = 'visible';
    d20.style.visibility = 'visible';
    roll_disabler()
};

function case5() {
    if (activated5 === false) {
        case5img.style.visibility = 'visible';  //shows case4img
        activated5 = true;
    } else {
        case3or4()
        case5img.style.visibility = 'hidden';   //hides case4img 
        activated5 = false;
    }
};

function case6() {
    d20roll.style.visibility = 'visible';
    d20.style.visibility = 'visible';
    roll_disabler()
};

function case3or4() {
    switch (quarterchance) {
        case 1:
        case 2:
            lightmode()
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

