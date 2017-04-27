const leftCol = document.querySelector('.column1');
const centerCol = document.querySelector('.column2');
const rightCol = document.querySelector('.column3');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const selectBtn = document.querySelector('.select');
let moveCount = 0;
let timeouts = [];
let numOfDisks;
draw();

function solveTower(n = numOfDisks, src = leftCol, dest = centerCol, temp = rightCol) {
    if (n === 0) return;
    solveTower(n - 1, src, temp, dest);
    timeouts.push(setTimeout(() => {
        moveDisk(src, dest);
    }, 500 * ++moveCount));
    solveTower(n - 1, temp, dest, src);
}

function moveDisk(src, dest) {
    const diskToMove = src.querySelector('.disk:last-of-type');
    src.removeChild(diskToMove);
    dest.appendChild(diskToMove);
}

function draw() {
    clear();
    numOfDisks = document.querySelector('.select').value;
    for (let i = 1; i <= numOfDisks; i++) {
        let disk = document.createElement('div');
        disk.classList.add('disk');
        disk.classList.add(`disk-${i}`);
        leftCol.appendChild(disk);
    }
}

function clear() {
    leftCol.innerHTML = '';
    centerCol.innerHTML = '';
    rightCol.innerHTML = '';
    moveCount = 0;
    timeouts.map((timeout) => {
        clearTimeout(timeout);
    });
    timeouts = [];
}

startBtn.addEventListener('click', () => {
    draw();
    solveTower();
});

resetBtn.addEventListener('click', () => {
    clear();
});

selectBtn.addEventListener('change', () => {
    numOfDisks = this.value;
    draw();
});