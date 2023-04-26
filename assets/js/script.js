//
//Make sure that DOM is loading before the game
//Get the cards and messages

function startGame(cardsArray, totalTime) {
  // Initialize variables to track game state
  let totalClicks = 0;
  let timeRemaining = totalTime;
  let cardToCheck = null;
  let matchedCards = [];
  let busy = true;

  // Get references to DOM elements
  const timer = document.getElementById("time-remaining");
  const ticker = document.getElementById("flips");

  // Shuffle cards after a delay and start countdown timer
  setTimeout(() => {
    shuffleCards(cardsArray);
    countdown = startCountdown();
    busy = false;
  }, 500);

  // Hide all cards at the start of the game
  hideCards(cardsArray);

  // Set initial values for the timer and click counter
  timer.innerText = timeRemaining;
  ticker.innerText = totalClicks;

  // Start countdown timer
  function startCountdown() {
    return setInterval(() => {
      timeRemaining--;
      timer.innerText = timeRemaining;
      if (timeRemaining === 0) gameOver();
    }, 1000);
  }

  // End the game when the timer reaches zero
  function gameOver() {
    clearInterval(countdown);
    document.getElementById("game-over-text").classList.add("visible");
  }

  // Display a victory message when all cards are matched
  function victory() {
    clearInterval(countdown);
    document.getElementById("victory-text").classList.add("visible");
  }

  // Hide all cards
  function hideCards(cardsArray) {
    cardsArray.forEach((card) => {
      card.classList.remove("visible");
      card.classList.remove("matched");
    });
  }

  // Flip a card and check for a match
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

  // Check if two flipped cards match
  function checkForCardMatch(card) {
    if (getCardType(card) === getCardType(cardToCheck))
      cardMatch(card, cardToCheck);
    else cardMismatch(card, cardToCheck);

    cardToCheck = null;
  }

  // Handle case where two flipped cards match
  function cardMatch(card1, card2) {
    matchedCards.push(card1);
    matchedCards.push(card2);
    card1.classList.add("matched");
    card2.classList.add("matched");
    if (matchedCards.length === cardsArray.length) victory();
  }

  // Handle case where two flipped cards do not match
  function cardMismatch(card1, card2) {
    busy = true;
    setTimeout(() => {
      card1.classList.remove("visible");
      card2.classList.remove("visible");
      busy = false;
    }, 1000);
  }

  // Shuffle cards using the Fisher-Yates algorithm
  function shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
      let randIndex = Math.floor(Math.random() * (i + 1));
      cardsArray[randIndex].style.order = i;
      cardsArray[i].style.order = randIndex;
    }
  }

  // Get the type of a card by checking its image source
  function getCardType(card) {
    return card.getElementsByClassName("card-value")[0].src;
  }

  // Check if a card can be flipped

  function canFlipCard(card) {
    return !busy && !matchedCards.includes(card) && card !== cardToCheck;
  }

  cardsArray.forEach((card) => {
    card.addEventListener("click", () => {
      flipCard(card);
    });
  });
}

function ready() {
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  let cards = Array.from(document.getElementsByClassName("card"));

  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      overlay.classList.remove("visible");
      startGame(cards, 100);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

/**
 * Removes the initial message
 * return the cards on the click event
 */

/**
 * shuffle the cards
 */

/**
 * Check if the cards match
 * If they match, leave them turned
 * If they do not match, they return to the initial state
 */

/**
 * It counts the number of clicks and displays them in Flip
 */

/**
 * At the beginning of the game it displays a number of seconds
 * That will be the time in which all the cards must be turned over
 * To win the game
 */

/**
 * It displays a text that confirms winning the game
 * and the possibility of restarting the game
 */

/**
 * It displays a text that confirms loosing the game
 * and the possibility of restarting the game
 */
