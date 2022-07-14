const WORD = "CHONK";

const DELAY = 350;

let currentGuess = 0;

let freezeInput = false;

let currentInput = [];

function insertCharacter(char) {
  if (freezeInput) {
    return;
  }

  if (currentInput.length >= 5) {
    console.log("Too many characters");
    return;
  }
  currentInput.push(char);
  updateBoard();
}

function testCurrentInput() {
  if (currentInput.length !== 5) {
    console.log("TOO SHORT.");
    return;
  }

  const guessRow = document.querySelector(".guesses").children[currentGuess];
  freezeInput = true;

  // For each letter, if it is a match, set a timeout to change the style.
  currentInput.forEach((c, i) => {
    setTimeout(() => {
      if (WORD[i] === c) {
        guessRow.children[i].classList.add("green");
      } else if (WORD.includes(c)) {
        guessRow.children[i].classList.add("yellow");
      } else {
        guessRow.children[i].classList.add("grey");
      }
    }, DELAY * i);
  });

  // Reset for next round.
  setTimeout(() => {
    if (currentGuess === 5) {
      window.alert("You lose. The answer is in the title!");
      return;
    }

    if (currentInput.join("") === WORD) {
      window.alert("CHONK!");
    }

    currentGuess++;
    currentInput = [];
    freezeInput = false;
  }, DELAY * 5);
}

function removeCharacter() {
  if (freezeInput) {
    return;
  }
  currentInput.pop();
  updateBoard();
}

function updateBoard() {
  const guessRow = document.querySelector(".guesses").children[currentGuess];

  // Clear
  for (let x = 0; x < 5; x++) {
    guessRow.children[x].innerHTML = "";
  }

  // Populate
  currentInput.forEach((c, i) => {
    guessRow.children[i].innerHTML = c;
  });
}

function init() {
  // Set up letter keys.
  for (let x = 0; x < 26; x++) {
    const letter = String.fromCharCode(65 + x);
    const keyboardKey = document.getElementById(letter);
    keyboardKey.onclick = () => insertCharacter(letter);
  }

  // Set up delete.
  document.getElementById("DELETE").onclick = removeCharacter;

  // Set up enter.
  document.getElementById("ENTER").onclick = testCurrentInput;

  window.onkeyup = (e) => {
    if (e.key === "Backspace") {
      removeCharacter();
    } else if (e.key === "Enter") {
      testCurrentInput();
    } else if (e.keyCode >= 65 && e.keyCode < 65 + 26) {
      insertCharacter(e.key.toUpperCase());
    }
  };
}

window.onload = init;
