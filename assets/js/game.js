/*
 * List of all the Icons
 */
const icons = [
    "fa fa-anchor",
    "fab fa-btc",
    "fab fa-ethereum",
    "fa fa-bicycle",
    "fa fa-cloud",
    "fa fa-gem",
    "fas fa-fighter-jet",
    "fa fa-paper-plane",
    "fa fa-anchor",
    "fab fa-btc",
    "fab fa-ethereum",
    "fa fa-bicycle",
    "fa fa-cloud",
    "fa fa-gem",
    "fas fa-fighter-jet",
    "fa fa-paper-plane",
];

// Cards board
const cardsBoard = document.querySelector('#cards-board');

// Moves
let moves = 0;
const movesCounter = document.querySelector(".moves");

// Timer
let seconds = 0;
let minutes = 0;
let hours = 0;
const timer = document.querySelector(".timer");
const hourTimer = document.querySelector(".hour");
const minuteTimer = document.querySelector(".minute");
const secondsTimer = document.querySelector(".seconds");
let timeCounter;
let timerOn = false;

// Restart
const restart = document.querySelector(".restart");

// result
const result = document.querySelector('.result');
const timeResult = document.querySelector('.time-result');
const movesResult = document.querySelector('.moves-result');

const playAgain = document.querySelector('.replay-btn');

// Cards Array
let checkCards = [];
let matchedCards = [];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create the CardsBoard

createCardsBoard();

// Deck Creation and adding EventListener
function createCardsBoard() {
    // To clear the old card board 
    cardsBoard.innerHTML = "";
    // creat new ul element to append it to "cardsBoard"
    const myNewDeck = document.createElement('ul');
    myNewDeck.classList.add('deck');
    // shuffle the icons list
    let shufIcons = shuffle(icons);
    for (let i = 0; i < shufIcons.length; i++) {
        const newLi = document.createElement('li');
        newLi.classList.add('card');
        newLi.innerHTML = `<i class="${shufIcons[i]}"></i>`;
        myNewDeck.appendChild(newLi);
    }
    cardsBoard.append(myNewDeck);
    // add event listener to the cards board
    cardsBoard.addEventListener('click', respondToTheClick);
}

// Opening Cards
function respondToTheClick(e) {
    let selectedCard = e.target;
    // to make sure that the clicked target is a card & 
    // not an opened/matched card
    if (selectedCard.classList.contains("card") &&
        !selectedCard.classList.contains("open", "show", "match")) {
        // to start the timer once 
        if (timerOn === false) {
            startTimer();
            timerOn = true;
        }
        // add classes open and show to the selected card
        selectedCard.classList.add("open", "show");
        // add the selected card to checkCards array to check if it's
        // like the next selected card or not
        checkCards.push(selectedCard);
    }
    // checking cards when their are two cards in checkCards array
    if (checkCards.length === 2) {
        // to prevent opening more than two cards till the
        // checking process is finished
        cardsBoard.classList.add("stop-event");
        //counting the moves
        movesCalculator();
        // if the cards are matched call the matched function
        if (checkCards[0].innerHTML === checkCards[1].innerHTML) {
            matched();
        } else {
            // if they aren't matched call the notMatched function
            // after 800ms to allow the player to see the second card
            setTimeout(notMatched, 800);
        }
        gameOver();
    }
}

// if the cards are matched 
function matched() {
    // add class match to both cards
    checkCards[0].classList.add("match");
    checkCards[1].classList.add("match");
    // push both cards to the matchedCards array
    matchedCards.push(checkCards[0]);
    matchedCards.push(checkCards[1]);
    // remove cards from checkCards array
    checkCards = [];
    // to allow opening and checking two cards again
    cardsBoard.classList.remove("stop-event");
}

// if the cards are not matched 
function notMatched() {
    setTimeout(() => {
        // remove open & show classes from both cards
        checkCards[0].classList.remove("open", "show", "nomatch");
        checkCards[1].classList.remove("open", "show", "nomatch");
        // remove cards from checkCards array
        checkCards = [];
        openedCards = [];
        // to allow opening and checking two cards again
        cardsBoard.classList.remove("stop-event");
    }, 500);
    // Allow the shake functionality
    checkCards[0].classList.add("nomatch");
    checkCards[1].classList.add("nomatch");
}

// Moves
function movesCalculator() {
    // to increment moves number after opening two cards
    moves++;
    if (moves === 1) {
        movesCounter.innerHTML = `1  Move`;
    } else {
        movesCounter.innerHTML = `${moves}  Moves`;
    }
}

// Fix Timer by adding zero if the number is less than ten 
function fixTimer(x, y) {
    if (x < 10) {
        return (y.innerHTML = ` 0${x}`);
    } else {
        return (y.innerHTML = ` ${x}`);
    }
}

function startTimer() {
    // to start the timer to avoid delay
    if (seconds == 0) {
        seconds++;
    }

    timeCounter = setInterval(function() {
        hourTimer.innerHTML = `${hours}`;
        minuteTimer.innerHTML = ` ${minutes} `;
        secondsTimer.innerHTML = ` ${seconds} `;
        // fixTimer each part of the timer
        fixTimer(seconds, secondsTimer);
        fixTimer(minutes, minuteTimer);
        fixTimer(hours, hourTimer);

        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        } else if (minutes == 60) {
            hours++;
            minutes = 0;
        }
    }, 1000);
}

// Restart Game
function restartGame() {
    // set it to false in order to fulfil the condition 
    // at line 130 to start the timer after opening the 
    // first card after restarting the game
    timerOn = false;
    // reset the moves to zero
    moves = 0;
    movesCounter.innerHTML = `0 Moves`;
    // empty both arrays 
    matchedCards = [];
    checkCards = [];
    // to clear the old board, create a new 
    // shuffled cards board  
    createCardsBoard();
    // to stop the timer
    clearInterval(timeCounter);
    // reset the timer to zero
    seconds = 0;
    minutes = 0;
    hours = 0;
    secondsTimer.innerText = "00";
    minuteTimer.innerText = " 00";
    hourTimer.innerText = "00";
}

// To Restart the game when the player click on the restart icon
restart.addEventListener("click", restartGame);

// Game Completion Function
function gameOver() {
    // Game is Over!
    if (matchedCards.length === 16) {
        // to add the stats to the Result
        timeResult.innerText = timer.innerText;
        movesResult.innerHTML = movesCounter.innerHTML.slice(0, 3);
        //stop the timer and show the Result
        clearInterval(timeCounter);
        result.style.display = 'block';
    }
}

playAgain.addEventListener('click', function() {
    // to close the result and restart the game
    result.style.display = 'none';
    restartGame();
    timerOn = false;
})