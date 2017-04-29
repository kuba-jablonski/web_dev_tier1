const columns = document.querySelectorAll('.column');
const leftCol = document.querySelector('.column1');
const centerCol = document.querySelector('.column2');
const rightCol = document.querySelector('.column3');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const selectBtn = document.querySelector('.select');
let moveCount = 0;
let timeouts = [];
let numOfDisks, diskToMove, src, dest;
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
                diskToMove = src.querySelector('.disk:last-of-type');
                diskToMove.classList.add('floating');
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
            diskToMove.classList.remove('floating');
            src = null;
            dest = null;
            isGameOver();
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
    centerCol.classList.remove('game-won');
    moveCount = 0;
    timeouts.forEach((timeout) => {
        clearTimeout(timeout);
    });
    timeouts = [];
    isPlayingAllowed = true;
}

function isValidMove(src, dest) {
    const disk1 = src.querySelector('.disk:last-of-type');
    const disk2 = dest.querySelector('.disk:last-of-type');
    let width1, width2;
    if (disk1) width1 = disk1.offsetWidth;
    if (disk2) width2 = disk2.offsetWidth;

    if (!disk1) return false;
    return !disk2 || (width1 < width2);
}

function isGameOver() {
    const disksInCenter = centerCol.querySelectorAll('.disk');
    if (disksInCenter.length === numOfDisks) {
        centerCol.classList.add('game-won');
        isPlayingAllowed = false;
    }
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