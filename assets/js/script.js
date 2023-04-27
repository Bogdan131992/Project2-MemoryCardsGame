/**
Function to start the memory card game.
cardsArray - Array of card elements to be used in the game.
totalTime - Total time in seconds to complete the game.
*/

function startGame(cardsArray, totalTime) {
  // Initialize variables to track the game state
    let timeRemaining = totalTime;
    let cardToCheck = null;
    let matchedCards = [];
    let busy = true;
    let totalClicks = 0;
    let countdown = 0;
    
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

  // // Set initial values for the timer and click counter
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

/**
 * Attaches a click event listener to each overlay and calls the startGame function when clicked.
 *
 */
function ready() {
  // Get all elements with class "overlay-text" and convert them into an array
  let overlays = Array.from(document.getElementsByClassName("overlay-text"));
  // Get all elements with class "card" and convert them into an array
  let cards = Array.from(document.getElementsByClassName("card"));

  // Add a click event listener to each overlay
  overlays.forEach((overlay) => {
    overlay.addEventListener("click", () => {
      // Remove the "visible" class from the overlay
      overlay.classList.remove("visible");
      // Call the startGame function, passing in the cards array and 60 (total time in seconds)
      startGame(cards, 60);
    });
  });
}

// Check if the document has finished loading
if (document.readyState === "loading") {
  // If the document is still loading, add a DOMContentLoaded event listener to the document that calls the ready function when the content is loaded
  document.addEventListener("DOMContentLoaded", ready);
} else {
  // If the document has already finished loading, call the ready function
  ready();
}
