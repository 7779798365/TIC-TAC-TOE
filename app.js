let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");

let turn0 = true; // player X,player O
let count = 0; // to track draw

let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn0 = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn0 === true) {
      box.innerText = "X";
      turn0 = false;
      box.style.color = "black";
    } else if (turn0 === false) {
      box.innerText = "O";
      turn0 = true;
      box.style.color = "grey";
    }
    box.disabled = true;
    count++;
    console.log(count);
    checkWinner();

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations ! Winner is Player ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let postVal1 = boxes[pattern[0]].innerText;
    let postVal2 = boxes[pattern[1]].innerText;
    let postVal3 = boxes[pattern[2]].innerText;
    if (postVal1 != "" && postVal2 != "" && postVal3 != "") {
      if (postVal1 === postVal2 && postVal2 === postVal3) {
        showWinner(postVal1);
      }
    }
  }
};

const gameDraw = () => {
  msg.innerText = `OOPs! The Game was Draw , You both are Geniuses :)`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);