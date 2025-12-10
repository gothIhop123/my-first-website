//const { act } = require("react");
//const { text } = require("express");
import * as data from "/js/database.js";
//necessary consts
const roll = document.getElementById('roll');
const label = document.getElementById('label');
const case5img = document.getElementById('case5')
const dice = document.getElementById('dice')
const body = document.getElementById('body')
const d20 = document.getElementById('d20')
const d20roll = document.getElementById('d20roll')
const jumpscare  = document.getElementById('jumpscare')
const jumpscare_audio = document.getElementById('jumpscare_audio')
const weed_audio = document.getElementById('weed_audio')
const checkdata = document.getElementById('checkdata')

//important setup
dice.src = `images/dice1.png`;
let roll_times = 2;      //times you can roll before being unable to
let pausetime = 1800;    //constant time it takes for delays
var randomNum = null;   //turns the var into a global for use outside functions
var d20num = null;
var quarterchance = null;
let counter = 0;
let caseResults = {
    case1: 0,
    case2: 0,
    case3: 0,
    case4: 0,
    case5: 0,
    case6: 0,
    case2_or_5: 0,
    case3_or_4: 0,
    d20cases: []
}

//enables toggles for cases
let activated2 = false;
let activated3 = true;
let activated4 = false;
let activated5 = false;
let space_pressed = false;
//                                HELPER FUNCTIONS

//inverts all the colors
function darkmode() {
    body.style.background = '#081018';
    body.style.color = '#e6f3f2';
    d20.style.borderColor = '#e6f3f2';
    d20.style.color = '#e6f3f2';
};

//reverts all the colors
function lightmode() {
    body.style.background = '#e6f3f2';
    body.style.color = '#081018';
    d20.style.borderColor = '#081018';
    d20.style.color = '#081018';
};

//disables the regular die from being rolled when the d20 die is visible
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

//hides the d20 die after 200 milliseconds
function d20_die_hider() {
    setTimeout(() => {
        d20roll.style.visibility = 'hidden';
        d20.style.visibility = 'hidden';
    }, 400);
};


function rand(min, max) {
    return Math.floor(Math.random() * (max /*max*/ - min /*min*/ + 1)) + min /*min*/; //randomise a number
};
//                                                  BUTTON FUNCTIONS
//has a 2 in 3 chance to fail on clicking the die 
function diebtn() {
    roll.disabled = true;
    if (Math.random() < 1 / 3) {
        dice_animation();
        roll_times--;
        
        setTimeout(() => {
            if (roll_times <= 0) {
                checkdata.style.display = 'block';
                roll.disabled = true;
            } else {
                setTimeout(() => {      //makes the die disabled for 800 millisecond after use
                    if (d20roll.style.visibility !== 'visible') {
                        roll.disabled = false;
                    }
                }, 800);
            }
        }, pausetime);

    } else {            //instantly makes the die usable if it failed
        label.textContent = 'Try again?';
        roll.disabled = false;
    };
};

//makes the d20 button disables after use to prevent spam
function d20btn() {     
    d20roll.disabled = true;
    d20animation();
    setTimeout(() => {
        d20roll.disabled = false;
        checkdata.disabled = false;
    }, pausetime * 2);
};

function checkdataBtn() {
    checkdata.style.display = 'none';
    roll.disabled = false;
    roll_times = 2;
    window.open('database.html');  
};

//functions

//                           ANIMATION FUNCTIONS

function dice_animation() { //dice roll and outcomes
    randomNum = rand(1, 6); //randomise the reg die
    quarterchance = rand(1, 4); //randomise num 1 to 4
    let frames = 20;

    let animation = setInterval(() => {     //make animation of die rolling
        let temp = Math.floor(Math.random() * 6) + 1;
        dice.src = `images/dice${temp}.png`;
        frames--;
        if (frames <= 0) {
            clearInterval(animation);
            dice.src = `images/dice${randomNum}.png`;
            label.textContent = randomNum; //display final num
            outcomes(randomNum);
        };
    }, 100);
};

//all the necessary cases
function outcomes() {
    setTimeout(() => {
        switch (randomNum) { //checks number
            
            case 3:                                         
            //inverses the color of the page and EVERYTHING ELSE
                case3();
                counter += 1;
                caseResults.case3++;
                break;
            
            case 4:     
            //shows d20
                case4();
                counter += 1;       
                caseResults.case4++;           
                break;
            
            case 2:                                         
            //gives seizures to epileptic people
                case2();
                counter += 1;
                caseResults.case2++;
                break;
            
            case 5:
            //shows funny image
                case5();
                counter += 1;
                caseResults.case5++;
                break;
            case 1:           
            //has a 1 in 25 chance to send you to fun land
                case1();
                counter += 1;
                caseResults.case1++;
                break;
            
            case 6:
            //reveals a d20 die     
                case6();
                counter += 1;
                caseResults.case6++;
                break;
        };
    }, 100);
};

function d20animation() {       //d20 die animation
    d20num = rand(1, 20);  //randomise the d20 die  //is a global variable now 
    let frames = 25;
    let animation = setInterval(() => {
        let temp = Math.floor(Math.random() * 20) + 1;      //animation for d20 roll
        d20.textContent = temp;
        frames--;
        if (frames <= 0) {
            clearInterval(animation);
            d20.textContent = d20num; //display final num
            if (randomNum === 4) { 
                d20case4();
            } else {
                d20case6();
            }
        };
    }, 100);
};

//                                D20 CASES
//has a 1 in 20 chance to change the background to the mlg memes from 2008 temporarily and makes the background lightmode when it is over. 
function d20case4() {
    switch (d20num) {                            
        case 20:
            roll.disabled = true;
            setTimeout(() => {         
                
                window.alert('weed');
                weed_audio.currentTime = 0;
                weed_audio.play();
                body.style.background = 'lightgreen';
                body.style.background = "url('images/rekt.gif')"; 

                setTimeout(() => {
                    lightmode();
                    weed_audio.pause();          
                }, 5000);
            }, 80);
            counter += 2;
            caseResults.d20cases.push(20)
            break;
        
        default:
            label.textContent = 'nah';
            break;
    }
    d20_die_hider();
};

//creates funny numbers that start with 6 and alerts certain things with 69 sending you to the hub
function d20case6() {
    switch (d20num) {
        case 1:
            setTimeout(() => {  //each need a timeout to properly show that final frame of the animation
                window.alert('67');
                counter += 1;
            }, 80);
            caseResults.d20cases.push(1)
            break;
        case 7:
            setTimeout(() => {
                window.alert('sickswan');
                counter += 1;
            }, 80);
            caseResults.d20cases.push(7)
            break;
        case 9:
            setTimeout(() => {
                window.alert('nice');
                counter += 1;
            }, 80);
            setTimeout(() => {
                window.open('https://pornhub.com', 'about:idk');
                counter += 1;
            }, 500);
            caseResults.d20cases.push(9)
            break;
        default:
            label.textContent = 'nah';
            break;
    };
    d20_die_hider();
};

//                           DIE CASES FUNCTIONS

//has a one in 25 chance of opening another website
function case1() {
    if (Math.random() < 1 / 25) {   //1 in 25 chance to open new tabs
        let i = 2;
        while (i >= 0) {
            window.open('https://pornhub.com', 'about:idk');   //opens 3 tabs of the allocated website //supposed to but blocked popups
            i--;
        }
        counter += 2;
    } else {
        setTimeout(() => {
            label.textContent = 'this does nothing unlucky!';
        }, 500);
        
    }
};

//rapidly flashes red and blue background and yellow and green text
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
                    darkmode();
                    case2or5();
                }
                activated2 = true;  //makes it so that getting randomNum 2 twice does not flash again
                case2or5();
            }
        }, 50); //lasts around 1500 milliseconds
    } else {
        label.textContent = 'Sorry about last time';
        activated2 = false;
    };
};

//inverts the colors of the background and text
function case3() {
    if (activated3 === false) {
        darkmode()
        activated3 = true;
    } else {
        case3or4();
    }
};

//shows the d20 die to be rolled
function case4() {
    case3or4();
    d20roll.style.visibility = 'visible';
    d20.style.visibility = 'visible';
    roll_disabler();
    checkdata.disabled = true;
};

//hampter
function case5() {
    if (activated5 === false) {
        case5img.style.visibility = 'visible';  //shows case4img
        activated5 = true;
        setTimeout(() => {
            case2or5();            
        }, 800);
    } else {
        case5img.style.visibility = 'hidden';   //hides case4img 
        activated5 = false;
    };
};

//shows the d20 die to be rolled with different outcomes to case 4
function case6() {
    d20roll.style.visibility = 'visible';
    d20.style.visibility = 'visible';
    roll_disabler();
    checkdata.disabled = true;
};

//has a 2 in 4 chance to turn the page into lightmode if case 3 has already happened
//has a 1 in 4 chance to send use to the feet site
function case3or4() {
    switch (quarterchance) {
        case 1:
        case 2:
            lightmode();
            activated3 = false;
            counter += 1;
            break;
        case 3:
            setTimeout(() => {
                window.open("feet.html");
            }, 200);
            counter += 1;
            caseResults.case3_or_4++;
            break;
    }
};

//has a 1 in 4 chance to send use to the fanfic site 
//has a 1 in 4 chance to jumpscare the user with the sound
function case2or5() {
    caseResults.case2_or_5++;
    switch (quarterchance) {
        case 1:
                window.open("fanfic.html");
            counter += 1;
            break;
        case 2:
            jumpscare_audio.currentTime = 0;
            jumpscare_audio.play();
            jumpscare.style.visibility = 'visible';
            setTimeout(() => {
                lightmode();
                jumpscare.style.visibility = 'hidden';   
            }, 850);
            counter += 1;
            break;
    }
};

//eventlisteners
roll.addEventListener('click', diebtn);
d20roll.addEventListener('click', d20btn);

checkdata.addEventListener('click', checkdataBtn);


document.body.onkeydown = function(e){
    if (e.code === "Space") {
        e.preventDefault();  // ← STOP BUTTONS FROM FIRING AUTOMATICALLY
        if (roll.disabled) return;
        if (!space_pressed) {
            space_pressed = true;

            if (d20roll.style.visibility === 'visible') {
                d20btn();
            } else {
                diebtn();
            };

            setTimeout(() => {
                space_pressed = false;
            }, pausetime);
        }
    }
};