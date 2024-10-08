const gameBoard = document.getElementById('gameBoard');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('resetButton');
const cells = document.querySelectorAll('.cell');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to check for winner
function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = "It's a Tie!";
        isGameActive = false;
    }
}

// Function to handle cell clicks
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index');

    if (board[index] === '' && isGameActive) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;

        checkWinner();

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (isGameActive) {
            statusText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

// Initialize status text
statusText.textContent = `Player ${currentPlayer}'s Turn`;
