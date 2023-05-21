const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne;
let cardTwo;
let disableDeck = true;

let isPlaying = false;

const timeLimit = 180;

const timerElement = document.getElementById('timer');
let timeLeft = timeLimit;

const startButton = document.getElementById('start');

let timer;
let timerIntervalId;

function clearTimerInterval() {
  clearInterval(timerIntervalId);
}

// function startGame() {
//     if (!isPlaying) {
//       isPlaying = true;
//       disableDeck = false;
  
//       // Remove the event listeners from the cards
//       cards.forEach(card => card.removeEventListener("click", flipCard));
  
//       let timer = setInterval(() => {
//         if (timeLeft <= 0) {
//           clearInterval(timer);
//           disableDeck = true;
//           // Code to end the game when time is up
//         } else {
//           const minutes = Math.floor(timeLeft / 60);
//           const seconds = timeLeft % 60;
//           timerElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
//           timeLeft--;
//         }
//       }, 1000);
  
//       // Add the event listeners to the cards
//      cards.forEach(card => card.addEventListener("click", flipCard));
//     }
//   }

function startGame() {
    if (!isPlaying) {
      isPlaying = true;
      disableDeck = false;
      matched = 0;
      timeLeft = timeLimit; // Reset the time left to the time limit
  
      // Remove the event listeners from the cards
      cards.forEach((card) => card.removeEventListener("click", flipCard));
  
      // Reset the score display
      document.getElementById("punto").textContent = "0";
  
      // Reset the timer display
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerElement.innerHTML = `${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
  
      // Start the timer
      timer = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timer);
          // Code to end the game when time is up
        } else {
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          timerElement.innerHTML = `${minutes}:${
            seconds < 10 ? "0" : ""
      }${seconds}`;
          timeLeft--;
        }
      }, 1000);
  
      // Add the event listeners to the cards
      cards.forEach((card) => card.addEventListener("click", flipCard));
    }
  }


  startButton.addEventListener('click', () => {
    startButton.classList.add('clicked');
    // Set up the game state
    shuffleCard();
    disableDeck = false;
    timeLeft = timeLimit;
    timerElement.innerHTML = `${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
    // Start the timer
    startGame();
  });



// function flipCard({target: clickedCard}) {
//     if(cardOne !== clickedCard && !disableDeck) {
//         clickedCard.classList.add("flip");
//         if(!cardOne) {
//             return cardOne = clickedCard;
//         }
//         cardTwo = clickedCard;
//         disableDeck = true;
//         let cardOneImg = cardOne.querySelector(".back-view img").src,
//         cardTwoImg = cardTwo.querySelector(".back-view img").src;
//         matchCards(cardOneImg, cardTwoImg);
//     }
// }

function flipCard({target: clickedCard}) {
    if (isPlaying && cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if(!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}
// function matchCards(img1, img2) {
//     if(img1 === img2) {
//         matched++;
//         if(matched == 8) {
//             setTimeout(() => {
//                 return shuffleCard();
//             }, 1000);
//      o   }
//         cardOne.removeEventListener("click", flipCard);
//         cardTwo.removeEventListener("click", flipCard);
//         cardOne = cardTwo = "";
//         return disableDeck = false;
//     }
//     setTimeout(() => {
//         cardOne.classList.add("shake");
//         cardTwo.classList.add("shake");
//     }, 400);
//     setTimeout(() => {
//         cardOne.classList.remove("shake", "flip");
//         cardTwo.classList.remove("shake", "flip");
//         cardOne = cardTwo = "";
//         disableDeck = false;
//     }, 1200);
// }

function matchCards(img1, img2) {
    if (img1 === img2) {
      matched++;
      if (matched === 8) { // Check if all cards have been matched
        clearInterval(timer); // Stop the timer
        const maxScore = 100;
        const score = Math.floor(maxScore * (timeLeft / timeLimit)); // Calculate the score based on time left
        document.getElementById('punto').textContent = score; // Display the score to the user
        console.log(`Your score is: ${score}`); // Output the score to the console for debugging purposes
        disableDeck = true; // Disable further card flips
      }
      cardOne.removeEventListener("click", flipCard);
      cardTwo.removeEventListener("click", flipCard);
      cardOne = cardTwo = "";
      return disableDeck = false;
    }
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);
    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `Imagenes/${arr[i]}.jpg`;
        card.addEventListener("click", flipCard);
    });
}
shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});




startButton.addEventListener('mouseover', () => {
  startButton.style.backgroundColor = "white";
  startButton.style.color = 'orange';
  
});

startButton.addEventListener('mouseout', () => {
  startButton.style.backgroundColor = '';
  
});


// Define the initial score and time values
let score = 0;
let time = 0;

// Function to reset the score and time variables
function resetScoreAndTime() {
    score = 0;
    time = 180; // set the time to 180 seconds (3 minutes)
    // Update the score and time displays on the page
    document.getElementById("punto").textContent = score;
    document.getElementById("timer").textContent = formatTime(time);
  }
  function startNewGame() {
    // Clear the timer interval
   
    clearTimerInterval();
    // Reset the score and time variables
    resetScoreAndTime();
    // Shuffle the cards and reset their state
    shuffle(cards);
    resetCards();
    // Hide the start game button
    document.getElementById("start").classList.add("hide");
  
    // Set the time limit and update the timer display
    time = timeLimit;
    document.getElementById("timer").textContent = formatTime(time);
  
    // Start the timer interval
    timerIntervalId = setInterval(function() {
      time--;
      document.getElementById("timer").textContent = formatTime(time);
      if (time === 0) {
        // End the game if the time is up
        endGame();
      }
    }, 1000);
  }


document.getElementById("start").addEventListener("click", function() {
    startNewGame();
  });

  function updateTimer() {
    time--;
    document.getElementById("timer").textContent = formatTime(time);
    if (time === 0) {
      // End the game if the time is up
      endGame();
    }
  }
