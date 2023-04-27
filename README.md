# Cards - Memory Game

![img](readme-img/am-i-responsive-img.png)

## 1. How to Use the Game

The game has been implemented with several functions that handle different aspects of the game. These functions are responsible for shuffling cards, handling game state, and checking for matches.

## How to Play

1. Click anywhere on the game screen to start the game.
2. Click on any card to flip it and reveal the picture.
3. Click on another card to reveal its picture.
4. If the pictures on the cards match, they will remain face-up and you will earn points. If they don't match, they will be flipped back over and you can continue playing.
5. Keep playing until you have found all the pairs or until the time runs out.
6. If you successfully find all the pairs before the time runs out, you win the game!

### startGame(cardsArray, totalTime)

The `startGame` function initializes variables to track the game state and gets references to DOM elements. It then shuffles cards after a delay, starts a countdown timer, and hides all cards at the start of the game. Finally, it sets initial values for the timer and click counter. It takes two arguments:

- `cardsArray` is an array of DOM elements representing the cards in the game.
- `totalTime` is the amount of time, in seconds, that the player has to complete the game.

### startCountdown()

The `startCountdown` function starts the countdown timer and returns the interval ID.

### gameOver()

The `gameOver` function ends the game when the timer reaches zero by clearing the interval and showing the "game over" message.

### victory()

The `victory` function displays a victory message when all cards are matched by clearing the interval and showing the "victory" message.

### hideCards(cardsArray)

The `hideCards` function hides all cards at the start of the game by removing the "visible" and "matched" classes from all cards in the `cardsArray`.

### flipCard(card)

The `flipCard` function flips a card and checks for a match. If the card can be flipped, it increments the click counter, adds the "visible" class to the card, and checks if the flipped cards match.

### checkForCardMatch(card)

The `checkForCardMatch` function checks if two flipped cards match by comparing their image sources. If they match, it calls the `cardMatch()` function. Otherwise, it calls the `cardMismatch()` function.

### cardMatch(card1, card2)

The `cardMatch` function handles the case where two flipped cards match by pushing them to the `matchedCards` array, adding the "matched" class to both cards, and checking if all cards are matched.

### cardMismatch(card1, card2)

The `cardMismatch` function handles the case where two flipped cards do not match by removing the "visible" class from both cards after a delay of 1 second.

### shuffleCards(cardsArray)

The `shuffleCards` function shuffles cards using the Fisher-Yates algorithm by randomly swapping the order of cards in the `cardsArray`.

### getCardType(card)

The `getCardType` function gets the type of a card by checking its image source.

### canFlipCard(card)

The `canFlipCard` function checks if a card can be flipped by verifying if it is not busy, has not already been matched, and is not the same as the card already being checked.

### ready()

The `ready` function gets references to DOM elements for the overlays and cards and adds event listeners to the overlays to start the game

## 2 Test cases (user story based with screenshots)

- As a user, when I load the page, I see a message telling me that I have to click to start the game, this message is displayed on a transparent background and behind it is a game with several cards

  ![img](readme-img/startpageimg.png)

- As a user, when I click on the screen, the message with a transparent background disappears and I see a game that has a time of 60 seconds that decreases and the title tells me to match all the cards

- As a user, when I click on a card it turns around and shows me an image, the number of flips is recorded and displayed on the right side above the game

![img](readme-img/start-game-img.png)

- As a user, when I click on another book, if it's the same as the first one, they both stay facing away, if they have different images, they go back.
  As a user, when I turn over all the cards in pairs of two of the same kind, I am greeted by a message on a transparent background that overlaps the game and which informs me that I have won, and gives me the opportunity to restart the game

![img](readme-img/wingame-img.png)

- As a user, if I do not manage to turn over all the cards in 6o seconds, I am greeted by a message that informs me that the game is over and gives me the opportunity to restart the game

![img](readme-img/game-over-img.png)

## 3. Features:

- Randomly shuffled cards for a unique game every time.
- A timer to add an element of challenge and excitement.
- A counter to keep track of the number of flips made.
- An overlay text that appears at the start of the game to give instructions and disappears once the game begins.
- An overlay text that appears when the game is won or lost.

## Technologies Used

- HTML
- CSS
- JavaScript

## 4. future features:

- I would like to add the audio part to make the game more interactive

## 5. Typography and color scheme:

- I used a very simple design. I applied a radial gradient for the background by combining two colors (#0b180a, #212361) to match the text color (#20d40b) of the title. For the smaller text that displays the time and flip number I used a light color (#e9e9ee)

- I chose the image on the back of the cards to be green to match the main title.

## 6. Validator Testing

### Lighthouse check

![img](readme-img/lighthouse-test.png)

#### code validation

- [HTML Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fbogdan131992.github.io%2FProject2-MemoryCardsGame%2F)

- [W3C CSS Validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fbogdan131992.github.io%2FProject2-MemoryCardsGame%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

### fixed bugs

- During the validation test, the HTML code returned an error because we had an extra closing tag for a p element

![img](readme-img/bug%20p%20element.png)

- I deleted the extra closing tag to fix the code

![img](readme-img/bugp%20elem.png)

## supported screens

- I used media queries (@media screen and (max-width:600px))
- below 600 px, the playing cards are displayed only on two columns, and the size of the titles decreases.
- To create a responsive website for all devices

## 7. Deployment

- The steps followed for project deployment are as follows:

- In the GitHub repository I selected my project from the menu on the left.

- Then I clicked on Settings and from the settings menu on the left I clicked on the Pages button

- Then from the Branch section I chose "main".

- At the end, I entered the domain name bogdan131992.github.io in Custom domain

- I clicked on save.

- I was informed that the deployment process was successful and I received a link for my website


[via gitpod - live link](https://bogdan131992.github.io/Project2-MemoryCardsGame/)

[via github](https://github.com/Bogdan131992/Project2-MemoryCardsGame)

## 8. credits

### Content

- To implement this game and to understand the algorithms behind the game, I was inspired by two projects that I found on YouTube.

- For the structure of the program in HTMl, especially the arrangement of the playing cards, I was inspired by the project presented by freeCodeCamp.

- For the functional part of Java Script as well as for how to apply the styles, I would use the videos presented by the YouTube channels WebDev and Port Exe.

- In my code, I did not use objects as used in these projects for the JavaScript part, but only functions.

- [freeCodeCamp](https://www.youtube.com/watch?v=ZniVgo8U7ek)

- [portExe](https://www.youtube.com/watch?v=3uuQ3g92oPQ)
- [WebDevSimplified](https://www.youtube.com/watch?v=28VfzEiJgy4)

- [Web-Dev-Github](https://github.com/WebDevSimplified/Mix-Or-Match)

### Images

- [img1.jpeg](https://stock.adobe.com/ie/images/portrait-of-two-funny-donkeys-black-and-white/293791323?asset_id=293791323)

- [img2.jpeg](https://stock.adobe.com/ie/images/cute-fluffy-rabbit-on-color-background/411745360?asset_id=411745360)

- [img3.jpeg](https://stock.adobe.com/ie/images/cardinal-on-a-brown-plank/84805167?asset_id=84805167)

- [img4.jpeg](https://stock.adobe.com/ie/images/european-wolf-in-winter-canis-lupus/461415700)

- [img5.jpeg](https://stock.adobe.com/ie/images/chimpanzee-consists-of-two-extant-species-common-chimpanzee-and-bonobo-bonobos-and-common-chimpanzees-are-the-only-species-of-great-apes-that-are-currently-restricted-in-their-range-to-africa/305259897)

- [img6.jpeg](https://stock.adobe.com/ie/images/mare-with-young-colt/215104218)

- [img7.jpeg](https://stock.adobe.com/ie/images/long-eared-owl-asio-otus/171955612)

- [img8.jpeg](https://stock.adobe.com/ie/images/adorable-cute-harvest-mice-micromys-minutus-on-yellow-tulip-flower-foliage-with-neutral-green-nature-background/287897661?asset_id=287897661)
- [backcard.jpg](https://www.jucariesimagie.ro/4939-large_01bold/bicycle-verde-carti-de-joc.jpg)
