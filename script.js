//New Game button
const newGameBtn = document.querySelector(".btn--new-game");

//Points display
const x_score = document.querySelector("[data-score='x']");
const draw_score = document.querySelector("[data-score='draw']");
const o_score = document.querySelector("[data-score='o']");

//From section Events Display
const winMessage = document.querySelector(".win-message");
const turnDisplay = document.querySelector(".turn-display");

//Board
const boxes = document.querySelectorAll(".board_box");

//Overlay
const overlay = document.querySelector(".overlay");

//Variables
let playerTurn = "x";
let x_points = 0;
let o_points = 0;
let d_points = 0;

// Add o X or O in the box
function handleBoxClick(e) {
    if (e.currentTarget.innerText !== "") return;

    e.currentTarget.innerText = playerTurn;
    e.currentTarget.classList.remove("empty");
    e.currentTarget.style.cursor = "default";

    const haveWinner = checkWin();
    if (!haveWinner) {
        handleChangeTurn(playerTurn);
        turnDisplay.querySelector("span").innerText = playerTurn;
        checkDraw(haveWinner);
    }
}

//Initializing the game
function initializing() {
    winMessage.setAttribute("hidden", true);
    turnDisplay.setAttribute("hidden", true);
    newGameBtn.removeAttribute("hidden");
    x_score.innerText = 0;
    draw_score.innerText = 0;
    o_score.innerText = 0;
    boxes.forEach((box) => {
        box.removeEventListener("click", handleBoxClick);
        box.classList.remove("winCombination");
        box.style.cursor = "default";
        box.classList.remove("empty");
        box.innerText = "";
    });
}

//Starting a game
function start() {
    boxes.forEach((box) => {
        box.innerText = "";
        box.classList.remove("winCombination");
        box.style.cursor = "pointer";
        box.classList.add("empty");
        box.addEventListener("click", handleBoxClick);
    });
    winMessage.setAttribute("hidden", true);
    newGameBtn.setAttribute("hidden", true);
    turnDisplay.removeAttribute("hidden");
    turnDisplay.querySelector("span").innerText = playerTurn;
}

//Player Turn Change
function handleChangeTurn(player) {
    if (player === "x") {
        playerTurn = "o";
        turnDisplay.style.backgroundColor = "var(--player-o-color)";
    } else if (player === "o") {
        playerTurn = "x";
        turnDisplay.style.backgroundColor = "var(--player-x-color)";
    }
}

//Check if there is a winner.
function checkWin() {
    const winConditions = [
        //Rows
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        //Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        //Diagonals
        [0, 4, 8],
        [2, 4, 6],
    ];
    let haveWinner = false;
    for (let i = 0; i < winConditions.length; i++) {
        const v0 = boxes[winConditions[i][0]].innerHTML; // Checks the first box
        const v1 = boxes[winConditions[i][1]].innerHTML; // Checks the second box
        const v2 = boxes[winConditions[i][2]].innerHTML; // Checks the third box
        //Check if the selected boxes have the same value.
        if (v0 != "" && v0 === v1 && v0 === v2) {
            haveWinner = true;
            turnDisplay.setAttribute("hidden", true);
            winMessage.removeAttribute("hidden");
            winMessage.querySelector("span").innerText = ` Player ${v0} Wins!`;
            scoreUpdate(v0);
            newGameBtn.removeAttribute("hidden");
            boxes.forEach((box) => {
                box.removeEventListener("click", handleBoxClick);
                box.style.cursor = "default";
                box.classList.remove("empty");
            });
            for (j = 0; j < 3; j++) {
                boxes[winConditions[i][j]].classList.add("winCombination");
            }
        }
    }
    return haveWinner;
}

//Check if have a draw
function checkDraw(haveWinner) {
    if (!haveWinner) {
        let isDraw = true;
        boxes.forEach((e) => {
            if (e.innerHTML === "") {
                isDraw = false;
            }
        });

        if (isDraw) {
            turnDisplay.setAttribute("hidden", true);
            winMessage.removeAttribute("hidden");
            winMessage.querySelector("span").innerText = ` It's a Draw!`;
            newGameBtn.removeAttribute("hidden");
            boxes.forEach((box) => {
                box.removeEventListener("click", handleBoxClick);
                box.style.cursor = "default";
                box.classList.remove("empty");
            });
            scoreUpdate("draw");
        }
    }
}

//Add Points
function scoreUpdate(player) {
    if (player === "x") {
        x_points++;
        x_score.innerText = x_points;
    } else if (player === "o") {
        o_points++;
        o_score.innerText = o_points;
    } else if (player === "draw") {
        d_points++;
        draw_score.innerText = d_points;
    }
}

//reset the score
function resetScore() {
    x_points = 0;
    o_points = 0;
    d_points = 0;
    x_score.innerText = 0;
    draw_score.innerText = 0;
    o_score.innerText = 0;
}

initializing();

//Calls Start function
newGameBtn.addEventListener("click", () => {
    if (x_points > 0 || d_points > 0 || o_points > 0) {
        overlay.classList.add("overlayAnim");
    } else {
        start();
    }
});

//Close the modal
document.getElementById("noBtn").addEventListener("click", () => {
    overlay.classList.remove("overlayAnim");
    start();
});

// calls resetScore function and close the modal
document.getElementById("yesBtn").addEventListener("click", () => {
    overlay.classList.remove("overlayAnim");
    resetScore();
    initializing();
});
