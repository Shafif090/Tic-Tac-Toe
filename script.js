const board = document.querySelector('.board');
const cells = [];
let currentPlayer = 'X';
let gameOver = false;

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleClick);
        cells.push(cell);
        board.appendChild(cell);
    }

    updateMessage();
}

function handleClick(e) {
    if (gameOver) return;

    const cell = e.target;
    if (cell.textContent) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    checkWin();

    if (!gameOver) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateMessage();

        if (currentPlayer === 'O') {
            setTimeout(computerMove, 500);
        }
    }
}

function computerMove() {
    const emptyCells = cells.filter(cell => !cell.textContent);
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerCell = emptyCells[randomIndex];

    if (computerCell) {
        computerCell.textContent = 'O';
        computerCell.classList.add('O');
        checkWin();
        currentPlayer = 'X';
        updateMessage();
    }
}

function updateMessage() {
    const messageContainer = document.querySelector('.message');
    messageContainer.textContent = currentPlayer === 'X' ? "It's your turn!" : "Computer is thinking...";

    if (currentPlayer === 'X') {
        removeResetButton();
    }
    if (currentPlayer === 'O') {
        removeResetButton();
    }
}

function checkWin() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const line of lines) {
        const [a, b, c] = line;
        const cellA = cells[a].textContent;
        const cellB = cells[b].textContent;
        const cellC = cells[c].textContent;

        if (cellA && cellA === cellB && cellA === cellC) {
            gameOver = true;
            cells[a].classList.add('winner');
            cells[b].classList.add('winner');
            cells[c].classList.add('winner');
            document.querySelector('.board').classList.add('game-over');
            document.querySelector('.message').textContent = currentPlayer === 'O' ? "The computer won!" : `${cellA} wins!`;
            createResetButton();
            return;
        }
    }

    if (!cells.some(cell => !cell.textContent)) {
        gameOver = true;
        document.querySelector('.board').classList.add('game-over');
        document.querySelector('.message').textContent = "It's a tie!";
        createResetButton();
    }
}

function createResetButton() {
    const resetButton = document.createElement('button');
    resetButton.classList.add('reset-button');
    resetButton.textContent = 'Reset Board';
    resetButton.addEventListener('click', resetBoard);
    document.body.appendChild(resetButton);
}

function removeResetButton() {
    const resetButton = document.querySelector('.reset-button');

    if (resetButton) {
        resetButton.remove();
    }
}
createBoard();
