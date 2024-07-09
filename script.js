let btnRef = document.querySelectorAll('.button-option');
let popupRef = document.querySelector('.popup');
let newGameBtn = document.getElementById('new-game');
let restartBtn = document.getElementById('restart');
let toggleModeBtn = document.getElementById('toggle-mode');
let msgRef = document.getElementById('message');
let scoreX = document.getElementById('score-x');
let scoreO = document.getElementById('score-o');
let turnIndicator = document.getElementById('turn-indicator');
let clickSound = document.getElementById('click-sound');
let winSound = document.getElementById('win-sound');
let drawSound = document.getElementById('draw-sound');

let xTurn = true;
let count = 0;
let scores = { X: 0, O: 0 };

// Winning Patterns
let winningPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Disable all buttons
const disableButtons = () => {
    btnRef.forEach((element) => element.disabled = true);
    popupRef.classList.remove("hide");
};

// Enable all buttons (for new game and restart)
const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    });
    popupRef.classList.add("hide");
};

// Function to display the win message
const winFunction = (letter) => {
    disableButtons();
    msgRef.innerHTML = `&#x1F389; <br> '${letter}' Wins`;
    winSound.play();
    updateScore(letter);
    highlightWinningLine();
};

// Function to display the draw message
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
    drawSound.play();
};

// Function to check for a win or draw
const winChecker = () => {
    for (let pattern of winningPattern) {
        let [a, b, c] = [btnRef[pattern[0]].innerText, btnRef[pattern[1]].innerText, btnRef[pattern[2]].innerText];
        if (a !== "" && a === b && b === c) {
            winFunction(a);
            return;
        }
    }
    if (count === 9) {
        drawFunction();
    }
};

// Update scoreboard
const updateScore = (winner) => {
    scores[winner]++;
    scoreX.innerText = scores.X;
    scoreO.innerText = scores.O;
};

// Event listener for New Game button
newGameBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
    resetScores();
    turnIndicator.innerText = "X's Turn";
});

// Event listener for Restart button
restartBtn.addEventListener('click', () => {
    count = 0;
    enableButtons();
    resetScores();
    turnIndicator.innerText = "X's Turn";
});

// Toggle Dark Mode
toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleModeBtn.innerText = document.body.classList.contains('dark-mode') ? 'Toggle Light Mode' : 'Toggle Dark Mode';
});

// Event listeners for each button
btnRef.forEach((element, index) => {
    element.addEventListener('click', () => {
        if (element.innerText === "") {
            clickSound.play();
            if (xTurn) {
                element.innerText = 'X';
                turnIndicator.innerText = "O's Turn";
            } else {
                element.innerText = 'O';
                turnIndicator.innerText = "X's Turn";
            }
            xTurn = !xTurn;
            element.disabled = true;
            count++;
            winChecker();
        }
    });
});

// Highlight Winning Line
const highlightWinningLine = () => {
    for (let pattern of winningPattern) {
        let [a, b, c] = pattern;
        if (btnRef[a].innerText !== "" && btnRef[a].innerText === btnRef[b].innerText && btnRef[a].innerText === btnRef[c].innerText) {
            btnRef[a].style.backgroundColor = "#d161ff";
            btnRef[b].style.backgroundColor = "#d161ff";
            btnRef[c].style.backgroundColor = "#d161ff";
            break;
        }
    }
};

// Reset Scores
const resetScores = () => {
    scores.X = 0;
    scores.O = 0;
    scoreX.innerText = scores.X;
    scoreO.innerText = scores.O;
};
