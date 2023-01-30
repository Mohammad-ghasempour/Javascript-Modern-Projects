let min = 1,
  max = 10,
  winningNum = 2,
  guessesLeft = 3;

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-number"),
  maxNum = document.querySelector(".max-number"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");


  minNum.textContent = min;
  maxNum.textContent = max;

const setMessage = (msg , color) => {
    message.style.color = color;
    message.textContent = msg;
    }
  const getNumber = ()=>{
    let enteredNum = parseInt(guessInput.value);
    if (isNaN(enteredNum) || enteredNum< min || enteredNum> max){
        setMessage(`Please enter a number between ${min} and ${max}` , 'red')
    }
}

  guessBtn.addEventListener('click' , getNumber)