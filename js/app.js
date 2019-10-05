const background = document.querySelector('.deck');
const cards = document.querySelectorAll('.card');
let modalbtn = document.querySelector(".btn-yes");
const gameOverModal = document.querySelector(".modal.hide");
const totalPairs = 8;
let matched = 0;
const stars = document.querySelectorAll('.stars');

                        // setting up timer//

 function timerObject() {
 const timerDisplay = document.querySelectorAll(".timer");
 let timerID = null;
 let time = 0;

 function formatTime(time) {
   let minute = parseInt(time/60);
   let seconds = time%60;
   if (seconds <10) {
   seconds= '0'+ seconds;
   }
   let formattedTime =minute+':'+seconds;
   return formattedTime;
 };
  
 function updateTime(time) {
    timerDisplay.forEach(display => display.textContent = formatTime(time));
 };
  
 function startTimer() {
   timerID = setInterval(function() {
   time++; // time = time + 1
   updateTime(time);
   }, 1000);
  };
  
 function stopTimer() {
   clearInterval(timerID);
   timerID = null;
  };
  
 function isClockRunning() {
   if (timerID === null) {
      return false
    } else {
      return true;
    }
 };

function resetClock() {
    time = 0;
    updateTime(time);
}
  
    return {
      startTimer: startTimer,
      stopTimer: stopTimer,
      isClockRunning: isClockRunning,
      resetClock: resetClock
    }
  };
  
  const timer = timerObject();

//set up move counter//

let moves=0;

function updateMoveCounter(count) {
    const moveCount = document.querySelector('.moves');
    moveCount.textContent = count;
};

updateMoveCounter(0);



//set up modal to open when game ends//


function openModal() {
    const modal = document.querySelector('.modal');
    modal.style.display = "block";
    };
  

function gameOver() {
   if(timer !== null) {
        timer.stopTimer();
    }
    openCards = [];
    gameOverModal.classList.remove('hide');  
   // resetStars();
};

//this is the comparison and card turning functions//                        

let openCards = [];

cards.forEach(function(card) {
    card.addEventListener('click', function() {
        if (!timer.isClockRunning()) {
            timer.startTimer();
        }
        if (openCards.length < 2 && openCards.indexOf(card) === -1) {
            card.classList.toggle('open');
            openCards.push(card);
        }
        if (openCards.length === 2) {
            compareCards();
            moves++;
            updateStarCount(moves);
            updateMoveCounter(moves);
        };


        //comparison logic here//
        function compareCards() {

            const firstChild = openCards[0].querySelector('i');
            const secondChild = openCards[1].querySelector('i');

            if (firstChild.classList.item(1) === secondChild.classList.item(1)) {

                openCards[0].classList.add('match');
                openCards[1].classList.add('match');
                openCards = [];
                matched++

                if (matched === totalPairs) {
                    gameOver();
                    openModal();
                }

            } else {
                setTimeout(function() {
                    openCards.forEach(function(card) {
                        card.classList.toggle('open');
                    });
                    openCards = [];
                }, 1000);
            };
        }
    });
});

const cardArray = Array.from(cards);

//here I set up a shuffle function to change the order of the cards//

const shuffledArray = shuffle(cardArray);

function shuffle(array) {
    let counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
};

for (card of shuffledArray) {
    background.appendChild(card);
};

//this is the score section where stars are lost based on the move count//                        

function updateScore(updatedscore) {
    const scoreDisplay = document.querySelectorAll('.score-panel');
    scoreDisplay.forEach(function(display) {
        display.textContent = updatedscore;
    });
};

function updateStarCount(count) {
    let starsDisplay = document.querySelector('.stars');
    const starsDisplayModal = document.querySelector('.modal-container .stars')
    let stars = Array.from(starsDisplay.getElementsByTagName('li'));
    const starsModal = Array.from(starsDisplayModal.querySelectorAll('.fa-star'));
    if (count % 10 === 0 && stars.length > 0 && count < 30) {
        const star = stars.pop();
        starsDisplay.removeChild(star);
        const starModal = starsModal.pop();
        starsDisplayModal.removeChild(starModal);
       } 
   };

function resetStars() {
    const scoreDisplay = document.querySelectorAll('.stars');
    scoreDisplay.forEach(display => { display.innerHTML = ('<li><i class="fa fa-star"></i></li>') + ('<li><i class="fa fa-star"></i></li>') + ('<li><i " class="fa fa-star"></i></li>');
    });
};


//the reset button will clear the game so the player can play again//

const resetBtn = document.querySelector(".restart");

resetBtn.addEventListener("click", function(e) {
    resetGame();
});

   
// closing cards to reset game//

function closeCards() {
    const cards = document.querySelectorAll('.deck li');
    for (let card of cards) {
    card.className = 'card';
   };
};

function closeModal() {
    gameOverModal.style.display = "none";
};

function resetGame() {
    if (timer !== null) {
        timer.stopTimer();
    };
    shuffle(cardArray);
    closeModal();
    updateMoveCounter(0);
    resetStars();
    timer.resetClock();
    closeCards();
    openCards=[];
};

    
// the modal button clears the game so the player can restart the game//

modalbtn.addEventListener('click', function(e) {
    resetGame();
});

