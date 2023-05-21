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


function startGame() {
    if (!isPlaying) {
      isPlaying = true;
      disableDeck = false;
  
      // Remove the event listeners from the cards
      cards.forEach(card => card.removeEventListener("click", flipCard));
  
      let timer = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timer);
          // Code to end the game when time is up
        } else {
          const minutes = Math.floor(timeLeft / 60);
          const seconds = timeLeft % 60;
          timerElement.innerHTML = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          timeLeft--;
        }
      }, 1000);
  
      // Add the event listeners to the cards
     cards.forEach(card => card.addEventListener("click", flipCard));
    }
  }
  
  startButton.addEventListener('click', () => {
    startButton.classList.add('clicked');
    // Set up the game state
    shuffleCard();
    disableDeck = true;
    timeLeft = timeLimit;
    timerElement.innerHTML = `${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
    // Start the timer
    setTimeout(() => {
      startGame();
    },1000);
  });




function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
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
function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched == 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1000);
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






