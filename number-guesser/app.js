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
  const numberCheck = ()=>{

    let enteredNum = parseInt(guessInput.value);
    if (isNaN(enteredNum) || enteredNum< min || enteredNum> max){
        setMessage(`Please enter a number between ${min} and ${max}` , 'red')
    }

    if (enteredNum === winningNum){
        guessInput.disabled = true;
        guessInput.style.borderColor = 'green';
        setMessage(`${enteredNum} is true, you Won!` , 'green');
    }
    else{
        guessesLeft -=1;
        if (guessesLeft === 0){
            guessInput.disabled = true;
        guessInput.style.borderColor = 'red';
        setMessage(`Game Over, you lost! the correct number was ${winningNum}`);
        }else{
            guessInput.style.borderColor = 'red';
            guessInput.value = '';
            setMessage(`${enteredNum} is not correct! ${guessesLeft} guesses left` , 'red');
        }
    }
}

  guessBtn.addEventListener('click' , numberCheck)