const getRandumNum = (min , max) => {
    return Math.floor(Math.random() * (max - min + 1)+ min);
}

let min = 1,
  max = 10,
  winningNum = getRandumNum(min , max),
  guessesLeft = 3;

const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-number"),
  maxNum = document.querySelector(".max-number"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;


const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
};

game.addEventListener("mousedown", (e) => {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});
const gameOver = (won, msg) => {
  let color;
  won === true ? (color = "green") : (color = "red");
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  //Play again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
};

const numberCheck = () => {
  let enteredNum = parseInt(guessInput.value);
  if (isNaN(enteredNum) || enteredNum < min || enteredNum > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
  } else if (enteredNum === winningNum) {
    //guessInput.disabled = true;
    //guessInput.style.borderColor = "green";
    gameOver(true, `${enteredNum} is true, you Won!`);
    // setMessage(`${enteredNum} is true, you Won!`, "green");
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      gameOver(
        false,
        `Game Over, you lost! the correct number was ${winningNum}`
      );
    } else {
      //   gameOver(false , `${enteredNum} is not correct! ${guessesLeft} guesses left` );
      //   guessInput.disabled = false;
      guessInput.focus();
      guessInput.value = "";
      setMessage(
        `${enteredNum} is not correct! ${guessesLeft} guesses left`,
        "red"
      );
    }
  }
};

guessBtn.addEventListener("click", numberCheck);
