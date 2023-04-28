// Initialize global variables
let timeRemaining = 0;
let cardToCheck = null;
let matchedCards = [];
let busy = true;
let totalClicks = 0;
let countdown = 0;
let cardsArray = [];

// Get references to DOM elements
let timer = document.getElementById("time-remaining");
let ticker = document.getElementById("flips");
document.addEventListener("DOMContentLoaded", initializeGame);

/** Get all elements with class "overlay-text" and convert them into an array
* Get all elements with class "card" and convert them into an array
* Add a click event listener to each overlay
* Remove the "visible" class from the overlay
Call the startGame function, passing in the cards array and 60 (total time in seconds)
*/
function initializeGame() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      startGame(cards, 60);
    });
  });
}

/** Shuffle cards after a delay and start countdown timer*/
function startGame(cards, totalTime) {
  matchedCards = [];
  timeRemaining = totalTime;
  cardsArray = cards;
  setTimeout(function () {
    shuffleCards(cards);
    countdown = startCountdown();
    busy = false;
  }, 500);

  hideCards(cards);
  timer.innerText = timeRemaining;
  totalClicks = 0;
  ticker.innerText = totalClicks;

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      flipCard(card);
    });
  });
}

/** Shuffle cards using the Fisher-Yates algorithm*/
function shuffleCards(cardsArray) {
  for (let i = cardsArray.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    cardsArray[randIndex].style.order = i;
    cardsArray[i].style.order = randIndex;
  }
}

/** Start countdown timer*/
function startCountdown() {
  return setInterval(function () {
    timeRemaining--;
    timer.innerText = timeRemaining;
    if (timeRemaining === 0) gameOver();
  }, 1000);
}

/** End the game when the timer reaches zero*/
function gameOver() {
  clearInterval(countdown);
  document.getElementById("game-over-text").classList.add("visible");
}

function hideCards(cardsArray) {
  cardsArray.forEach(function (card) {
    card.classList.remove("visible");
    card.classList.remove("matched");
  });
}

/** Flip a card and check for a match*/
function flipCard(card) {
  if (canFlipCard(card)) {
    totalClicks++;
    ticker.innerText = totalClicks;
    card.classList.add("visible");

    if (cardToCheck) {
      checkForCardMatch(card);
    } else {
      cardToCheck = card;
    }
  }
}

/** Check if a card can be flipped*/
function canFlipCard(card) {
  return !busy && !matchedCards.includes(card) && card !== cardToCheck;
}

/** Check if two flipped cards match*/
function checkForCardMatch(card) {
  if (getCardType(card) === getCardType(cardToCheck))
    cardMatch(card, cardToCheck);
  else cardMismatch(card, cardToCheck);

  cardToCheck = null;
}

/** Get the type of card by checking its image source*/
function getCardType(card) {
  return card.getElementsByClassName("card-value")[0].src;
}

/** Handle case where two flipped cards match*/
function cardMatch(card1, card2) {
  matchedCards.push(card1);
  matchedCards.push(card2);
  card1.classList.add("matched");
  card2.classList.add("matched");
  if (matchedCards.length === cardsArray.length) displayVictory();
}

/**  Handle case where two flipped cards do not match*/
function cardMismatch(card1, card2) {
  busy = true;
  setTimeout(function () {
    card1.classList.remove("visible");
    card2.classList.remove("visible");
    busy = false;
  }, 1000);
}

/** Display a victory message when all cards are matched
 */
function displayVictory() {
  clearInterval(countdown);
  document.getElementById("victory-text").classList.add("visible");
}
