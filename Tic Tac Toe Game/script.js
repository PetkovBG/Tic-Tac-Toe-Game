
const xClass = 'x';
const circleClass = 'circle';

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7 ,8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]


const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningElement = document.getElementById('winningMsg');
const restartBtn = document.getElementById('restartBtn');
const winningMsgElement = document.querySelector('[data-winning-message-text]');
let circleTurn;

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener('click', onClick);
        cell.addEventListener('click', onClick, {once: true})
    });
    setHoverClass();
    winningElement.classList.remove('show');
}

function onClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;
    placeMark(cell, currentClass);
    if(checkWin(currentClass)){
        endGame(false);
    } else if(isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setHoverClass();
    }

}

function endGame(draw) {
    if(draw) {
        winningMsgElement.textContent = 'Draw';
    } else {
        winningMsgElement.textContent = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningElement.classList.add('show');
}

function isDraw() {
    return [...cellElement].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}

function placeMark(cell, currentClass){
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setHoverClass() {
board.classList.remove(xClass);
board.classList.remove(circleClass);
if(circleTurn) {
    board.classList.add(circleClass);
} else {
    board.classList.add(xClass);
}
}

function checkWin(currentClass){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElement[index].classList.contains(currentClass);
        })
    })
}