const resetButton = document.querySelector(".resetButton");
const cells = document.querySelectorAll(".cell");
const turn = document.querySelector(".turn");
const winner = document.querySelector(".winner");
const choose = document.querySelector(".choose");

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayerXO = "X";
let gameEnded = false;
let buttonClicked = false;


cells.forEach(cell => cell.addEventListener("click", (event) => {
    const cellIndex = Array.from(event.target.parentNode.children).indexOf(event.target);
    buttonClicked = true;
    selectPlayer();

    if (gameEnded) {
        return;
    }

    if (board[cellIndex] === "") {    

        if (!event.currentTarget.querySelector("div")) { 
            const signDiv = document.createElement("div");
            signDiv.classList.add(currentPlayerXO === "X" ? "xSign" : "oSign");
            event.currentTarget.appendChild(signDiv);
            board[cellIndex] = currentPlayerXO;

            if (checkWinner()) {
                turn.textContent = "Finalizado";
                winner.textContent = `Winner: ${currentPlayerXO}`;
                gameEnded = true;
                resetGame();
            } else if (board.every(cell => cell !== "")) {
                turn.textContent = "Finalizado";
                winner.textContent = "¡Empate!";
                gameEnded = true;
                resetGame();
            } else {
                currentPlayerXO = currentPlayerXO === "X" ? "O" : "X";
                turn.textContent = `${currentPlayerXO}'s Round`;
            }
        }

    }
    
}));


function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}


resetGame();
function resetGame() {
    resetButton.addEventListener("click", () => {
        Array.from(document.getElementsByClassName("cell")).forEach(cell => {
            cell.innerHTML = "";
        })

        gameEnded = false;
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayerXO = "X";
        choose.textContent = currentPlayerXO;
        turn.textContent = "X's Round";
        winner.textContent = `Ganador: En espera`;
        buttonClicked = false;
        choose.disabled = false;
    });
}


function selectPlayer() {
    if (buttonClicked === false) {
        choose.disabled = false;
    } else if (buttonClicked === true) {
        choose.disabled = true;
    }
}


choose.addEventListener("click", () => {
    currentPlayerXO = currentPlayerXO === "X" ? "O" : "X";
    choose.textContent = currentPlayerXO;
    turn.textContent = `${currentPlayerXO}'s Round`
}); 