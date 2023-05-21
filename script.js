const cards = document.querySelectorAll(".card");
let matched = 0;
let cardOne;
let cardTwo;
let disableDeck = true;
let isPlaying = false;
let username = "";

const timeLimit = 180;
const leaderboardUsersTable=document.getElementById('leaderboard')
const timerElement = document.getElementById('timer');
let timeLeft = timeLimit;

const startButton = document.getElementById('start');
const submitButton = document.getElementById("submit")

let timer;
let timerIntervalId;

function clearTimerInterval() {
  clearInterval(timerIntervalId);
}



function startGame() {
    if (!isPlaying) {
        console.log('entre')
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
        updateScore(score)
      }
      cardOne.removeEventListener("click", flipCard);
      cardTwo.removeEventListener("click", flipCard);
      cardOne = cardTwo = "";
      return disableDeck = false;
    }
    setTimeout(() => { //no hubo match
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
shuffleCard(); //suffle ante de iniciar
    
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


submitButton.addEventListener('mouseover', () => {
    submitButton.style.backgroundColor = "white";
    submitButton.style.color = '';
    
  });
  
  submitButton.addEventListener('mouseout', () => {
    submitButton.style.backgroundColor = 'orange';
    
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
  

    //newnew
    
     // Reset the score display
     document.getElementById("punto").textContent = "0";
  
   
  }


  function startNewGame() {
    // Clear the timer interval
   
    clearTimerInterval();
    // Reset the score and time variables
    resetScoreAndTime();
    // Shuffle the cards and reset their state
    // shuffleCard();
    // resetCards();
    // Hide the start game button
    document.getElementById("start").classList.add("hide");
    
  

      timeLeft = timeLimit; // Reset the time left to the time limit
  

  

  
      // Start the timer
      console.log('mkcdmkmcmdkmcdk',timeLimit)
      timer = setInterval(() => {
        console.log(timeLeft)
        if (timeLeft < 0) {
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

  
  }


document.getElementById("start").addEventListener("click", function() {
    // startNewGame();
    startNewGame()

  });

  function updateTimer() {
    time--;
    document.getElementById("timer").textContent = formatTime(time);
    if (time === 0) {
      // End the game if the time is up
      endGame();
    }
  }









  function endGame() {
    clearInterval(timer);
    disableDeck = true;
    isPlaying = false;
    const score = parseInt(document.getElementById("punto").textContent);
    const username = "John Doe"; // Reemplazar por el nombre del usuario ingresado por el usuario
    const user = { name: username, score: score };
    localStorage.setItem(username, JSON.stringify(user));
    showScores();
  }

//   let currentScore;

// function endGame() {
//   currentScore = parseInt(document.getElementById("punto").textContent);
//   document.getElementById("modal").style.display = "block";
// }


 // Obtener elementos del DOM
const modal = document.getElementById("modal"); 
const form = document.querySelector("form");
const usernameInput = document.getElementById("username");
const scoreDisplay = document.getElementById("punto");
const leaderboardTable = document.getElementById("leaderboard");


function tabla() {
    let userPoints=[];
    if(JSON.parse(localStorage.getItem('all_users')) !=null){
        userPoints=JSON.parse(localStorage.getItem('all_users'))
      
    }
  
    userPoints.sort((a, b) => b.score - a.score);
    console.log(userPoints.length)
for(let i=0;i<userPoints.length;i++){

    agregarFila(userPoints[i].name, userPoints[i].score)
}
    
}

function agregarFila(nombre, puntaje) {

    const fila = document.createElement("tr");
    const celdaNombre = document.createElement("td");
    const celdaPuntaje = document.createElement("td");
    celdaNombre.textContent = nombre;
    celdaPuntaje.textContent = puntaje;
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPuntaje);
    console.log(leaderboardUsersTable.querySelector("tbody"))
    leaderboardUsersTable.querySelector("tbody").appendChild(fila);

}

// Función para mostrar el formulario modal
function showModal() {

  modal.style.display = "block";

  tabla()
 

}

// Función para ocultar el formulario modal
function hideModal() {
  modal.style.display = "none";
}

// Agregar evento de submit al formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // Obtener nombre deusuario
  const username = usernameInput.value;
  // Almacenar nombre de usuario y puntaje inicial en LocalStorage
  const user = { name: username, score: score }; //lo que cambie de 0
  let auxStorage=[]
  if(localStorage.getItem('all_users') != null){
    auxStorage=JSON.parse(localStorage.getItem('all_users'))
    auxStorage.push(user)
  }else{
    console.log('njhnxhsbxyhsuybyhsb')

    auxStorage.push(user)

  }
  console.log(auxStorage)

  localStorage.setItem('all_users', JSON.stringify(auxStorage));

  localStorage.setItem('current_user',username)
  // Ocultar formulario modal y comenzar juego
  hideModal();
  // ...
});



//Función para actualizar puntaje del usuario en LocalStorage
function updateScore(newScore) {
    console.log('kijhugyftdrfghjkn', localStorage.getItem('all_users'), localStorage.getItem('current_user'))
  // Obtener objeto JSON almacenado en LocalStorage
  if(localStorage.getItem('all_users') != null && localStorage.getItem('current_user') != null ){
        // Obtener objeto JSON almacenado en LocalStorage
   
        const userList = JSON.parse(localStorage.getItem('all_users'));

        if(userList.some(user => user.name === localStorage.getItem('current_user'))){
      // userList.localStorage.getItem('current_user')=newScore
      const index= userList.findIndex((item => item.name == localStorage.getItem('current_user')));
      const user=localStorage.getItem('current_user')
          userList[index].score=newScore
          localStorage.setItem('all_users',JSON.stringify(userList))
        }
    
//   // Actualizar tabla de puntuaciones
//   updateLeaderboard();
  }
}

//Función para obtener lista de usuarios y puntajes almacenados en LocalStorage y ordenarla por puntaje descendente
function getLeaderboard() {
  const leaderboard = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const userData = JSON.parse(localStorage.getItem(key));
    if (userData && userData.score) {
      leaderboard.push({ name: userData.name, score: userData.score });
    }
  }
  leaderboard.sort((a, b) => b.score - a.score);
  return leaderboard;
}

//Función para mostrar tabla de puntuacionesen la interfaz de usuario
function updateLeaderboard() {
  // Obtener lista de usuarios y puntajes
tabla()
}

function addRowToLeaderboard(name, score) {
    // Obtener el cuerpo de la tabla
    var tbody = document.querySelector("#leaderboard tbody");
  
    // Crear una nueva fila de tabla
    var newRow = document.createElement("tr");
  
    // Crear las celdas de la fila y agregar el contenido
    var nameCell = document.createElement("td");
    nameCell.textContent = name;
}

function showScores() {
    const scores = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const user = JSON.parse(localStorage.getItem(key));
      if (user) {
        scores.push(user);
      }

      console.log("holaaaa")
    }
    scores.sort((a, b) => b.score - a.score);
    const tableBody = document.getElementById("scores-body");
    tableBody.innerHTML = "";
    for (const user of scores) {
      const row = document.createElement("tr");
      const nameCell = document.createElement("td");
      nameCell.textContent = user.name;
      const scoreCell = document.createElement("td");
      scoreCell.textContent = user.score;
      row.appendChild(nameCell);
      row.appendChild(scoreCell);
      tableBody.appendChild(row);
    }
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    closeBtn.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }



showModal();
updateLeaderboard();

