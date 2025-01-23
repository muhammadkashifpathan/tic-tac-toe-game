const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset-game-btn");
const showWinnerContainer = document.querySelector(".show-winner-container");
const playerO = document.getElementById("playerO");
const playerX = document.getElementById("playerX");
const drewGames = document.getElementById("drew-games");

let playerOTotalWinning = 0;
let playerXTotalWinning = 0;
let totalDraws = 0;

let turnO = true;

const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function resetGame() {
    turnO = true;
    showWinnerContainer.classList.add("hide");
    enableBox();
    
    boxes.forEach(box => {
        box.style.boxShadow = "none";
    });
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.boxShadow = "0 0 10px 3px #00aa00";
            box.style.color = "#00aa00";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.boxShadow = "0 0 10px 3px red";
            box.style.color = "red";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

function disableBox() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

function enableBox() {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
    });
}

function showWinner(winner) {
    showWinnerContainer.classList.remove("hide");
    document.querySelector(".winner-text span").innerText = winner;

    if (winner === "O") {
        playerOTotalWinning += 1;
        playerO.innerText = playerOTotalWinning;
        
    } else {
        playerXTotalWinning += 1;
        playerX.innerText = playerXTotalWinning;
    }
    disableBox();
}

function showDraw() {
    showWinnerContainer.classList.remove("hide");
    document.querySelector(".winner-text").innerText = "Game Draw";
    totalDraws += 1;
    drewGames.innerText = totalDraws;
    disableBox();
}

function checkWinner() {
    let isWinner = false;

    for (let pattern of winPattern) {
        const position1 = boxes[pattern[0]].innerText;
        const position2 = boxes[pattern[1]].innerText;
        const position3 = boxes[pattern[2]].innerText;

        if (position1 !== "" && position2 !== "" && position3 !== "") {
            if (position1 === position2 && position2 === position3) {
                isWinner = true;
                showWinner(position1);
                return;
            }
        }
    }

    // Check for a draw
    const isDraw = [...boxes].every(box => box.innerText !== "");
    if (!isWinner && isDraw) {
        showDraw();
    }
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
