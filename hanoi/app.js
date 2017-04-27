const columns = document.querySelectorAll('.column');
const leftCol = document.querySelector('.column1');
const centerCol = document.querySelector('.column2');
const rightCol = document.querySelector('.column3');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const selectBtn = document.querySelector('.select');
const status = document.querySelector('.game-status');
let moveCount = 0;
let timeouts = [];
let numOfDisks, src, dest;
let isPlayingAllowed = true;



function solveTower(n = numOfDisks, src = leftCol, dest = centerCol, temp = rightCol) {
    if (n === 0) return;
    solveTower(n - 1, src, temp, dest);
    timeouts.push(setTimeout(() => {
        moveDisk(src, dest);
    }, 500 * ++moveCount));
    solveTower(n - 1, temp, dest, src);
}

function playGame() {
    if (isPlayingAllowed) {
        if (!src) {
            if (this.hasChildNodes()) {
                src = this;
                src.classList.add('active');
            }
        } else {
            dest = this;
        }
        if (src && dest) {
            if (isValidMove(src, dest)) {
                moveDisk(src, dest);
            }
            src.classList.remove('active');
            src = null;
            dest = null;
            if (isGameOver()) {
                status.textContent = 'Victory!!!';
                isPlayingAllowed = false;
            }
        }
    }
}

function moveDisk(src, dest) {
    const diskToMove = src.querySelector('.disk:last-of-type');
    src.removeChild(diskToMove);
    dest.appendChild(diskToMove);
}

function draw() {
    clear();
    numOfDisks = parseInt(document.querySelector('.select').value);
    for (let i = 1; i <= numOfDisks; i++) {
        let disk = document.createElement('div');
        disk.classList.add('disk');
        disk.classList.add(`disk-${i}`);
        leftCol.appendChild(disk);
    }
}

function clear() {
    columns.forEach((column) => {
        column.innerHTML = '';
        column.classList.remove('active');
    })
    status.innerHTML = '';
    moveCount = 0;
    timeouts.map((timeout) => {
        clearTimeout(timeout);
    });
    timeouts = [];
    isPlayingAllowed = true;
}

function isValidMove(src, dest) {
    let disk1 = src.querySelector('.disk:last-of-type');
    let disk2 = dest.querySelector('.disk:last-of-type');
    let width1, width2;
    if (disk1) width1 = disk1.offsetWidth;
    if (disk2) width2 = disk2.offsetWidth;

    if (!disk1) return false;
    return !disk2 || (width1 < width2);
}

function isGameOver() {
    let disksInCenter = centerCol.querySelectorAll('.disk');
    return (disksInCenter.length === numOfDisks);
}



columns.forEach((column) => {
    column.addEventListener('click', playGame);
});

startBtn.addEventListener('click', () => {
    draw();
    isPlayingAllowed = false;
    solveTower();
});

resetBtn.addEventListener('click', draw);

selectBtn.addEventListener('change', () => {
    if (isPlayingAllowed) draw();
});



draw();