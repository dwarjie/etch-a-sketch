// Create a 16x16 grid using js inside of the container tag
const gridContainer = document.querySelector('#container');
const items = document.querySelectorAll('.div-items');

function createDiv() {
    const divElem = document.createElement('div');
    divElem.classList.add('div-items');

    gridContainer.appendChild(divElem);
}

// loop 16 times for the row
for(let i = 1; i <= 16; i++) {
    // loop 16 times to make the column for row i
    for(let j = 1; j <= 16; j++) {
        createDiv();
    }
}

items.forEach((box) => box.addEventListener('onmouseenter', addColor));

function addColor(e) {
    console.log(e.target);
}