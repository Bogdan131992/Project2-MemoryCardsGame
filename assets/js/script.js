// Initialize global variables
let timeRemaining = 0;
let imageToCheck = null;
let pairedImages = [];
let busy = true;
let totalClicks = 0;
let countdown = 0;
let imagesArray = [];

// Get references to DOM elements
let timer = document.getElementById("time-remaining");
let flipNr = document.getElementById("flips");
document.addEventListener("DOMContentLoaded", initializeGame);

/** Get all elements with class "cover-text" and convert them into an array
* Get all elements with class "image" and convert them into an array
* Add a click event listener to each overlay
* Remove the "active" class from the overlay
Call the startGame function, passing in the images array and 60 (total time in seconds)
*/
function initializeGame() {
  let covers = Array.from(document.getElementsByClassName("cover-text"));
  let images = Array.from(document.getElementsByClassName("image"));
  covers.forEach((overlay) => {
    overlay.addEventListener("click", function() {
      overlay.classList.remove("active");
      startGame(images, 60);
    });
  });
}

/** Shuffle images after a delay and start countdown timer*/
function startGame(images, totalTime) {
  pairedImages = [];
  timeRemaining = totalTime;
  imagesArray = images;
  setTimeout(function () {
    shuffleImages(images);
    countdown = startCountdown();
    busy = false;
  }, 500);

  hideImages(images);
  timer.innerText = timeRemaining;
  totalClicks = 0;
  flipNr.innerText = totalClicks;

  images.forEach(function (image) {
    image.addEventListener("click", function () {
      flipImage(image);
    });
  });
}

/** Shuffle images using the Fisher-Yates algorithm*/
function shuffleImages(imagesArray) {
  for (let i = imagesArray.length - 1; i > 0; i--) {
    let randIndex = Math.floor(Math.random() * (i + 1));
    imagesArray[randIndex].style.order = i;
    imagesArray[i].style.order = randIndex;
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
  document.getElementById("end-game-text").classList.add("active");
}

function hideImages(imagesArray) {
  imagesArray.forEach(function (image) {
    image.classList.remove("active");
    image.classList.remove("paired");
  });
}

/** Flip an image and check for a match*/
function flipImage(image) {
  if (canFlipImage(image)) {
    totalClicks++;
    flipNr.innerText = totalClicks;
    image.classList.add("active");

    if (imageToCheck) {
      checkForImageMatch(image);
    } else {
      imageToCheck = image;
    }
  }
}

/** Check if a image can be flipped*/
function canFlipImage(image) {
  return !busy && !pairedImages.includes(image) && image !== imageToCheck;
}

/** Check if two flipped images match*/
function checkForImageMatch(image) {
  if (getImageType(image) === getImageType(imageToCheck))
    imageMatch(image, imageToCheck);
  else imageMismatch(image, imageToCheck);

  imageToCheck = null;
}

/** Get the type of image by checking its image source*/
function getImageType(image) {
  return image.getElementsByClassName("image-value")[0].src;
}

/** Handle case where two flipped images match*/
function imageMatch(image1, image2) {
  pairedImages.push(image1);
  pairedImages.push(image2);
  image1.classList.add("paired");
  image2.classList.add("paired");
  if (pairedImages.length === imagesArray.length) displayWinText();
}

/**  Handle case where two flipped images do not match*/
function imageMismatch(image1, image2) {
  busy = true;
  setTimeout(function () {
    image1.classList.remove("active");
    image2.classList.remove("active");
    busy = false;
  }, 1000);
}

/** Display a victory message when all images are paired
 */
function displayWinText() {
  clearInterval(countdown);
  document.getElementById("win-text").classList.add("active");
}

