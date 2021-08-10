// Create a 16x16 grid using js inside of the container tag
const gridContainer = document.querySelector("#container");
const root = document.documentElement; // for the css
const btnGrid = document.querySelector("#grid-content");
const btnSmall = document.querySelector("#small");
const btnMed = document.querySelector("#medium");
const btnLarge = document.querySelector("#large");
const btnClear = document.querySelector("#clear");
let canvasSize = 16;

// toggle dropdown
function dropDown() {
  if (btnGrid.style.display == "none") btnGrid.style.display = "block";
  else btnGrid.style.display = "none";
}

// adding event click to buttons
btnSmall.addEventListener("click", (e) => {
  setCanvas(e);
});
btnMed.addEventListener("click", (e) => {
  setCanvas(e);
});
btnLarge.addEventListener("click", (e) => {
  setCanvas(e);
});
// btnClear.addEventListener('click', clearCanvas);

divLoops();
// set the size of the canvas
root.style.setProperty("--grid-rows", canvasSize + ", 2fr");
root.style.setProperty("--grid-cols", canvasSize + ", 2fr");

function divLoops() {
  for (let i = 1; i <= canvasSize; i++) {
    // loop 16 times to make the column for row i
    for (let j = 1; j <= canvasSize; j++) {
      createDiv();
    }
  }
}

function createDiv() {
  const divElem = document.createElement("div");
  divElem.classList.add("div-items");

  gridContainer.appendChild(divElem);
  // add eventListener after div is created
  divElem.addEventListener("mouseenter", (e) => {
    addColor(e);
  });
}

function addColor(e) {
  let divElem = e.target;
  if (!divElem.classList.contains("color_1")) {
    divElem.classList.add("color_1");
  }
}

function removeAllChild(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function setCanvas(e) {
  let btnElem = e.target.id;
  if (btnElem == "small") {
    canvasSize = 16;
  } else if (btnElem == "medium") {
    canvasSize = 32;
  } else {
    canvasSize = 64;
  }
  removeAllChild(gridContainer);
  root.style.setProperty("--grid-rows", canvasSize + ", 2fr");
  root.style.setProperty("--grid-cols", canvasSize + ", 2fr");
  console.log(canvasSize);
  divLoops();
}

function clearCanvas() {
  const items = document.querySelectorAll(".div-items");
  for (const item of items) {
    item.classList.remove("color_1");
  }
}

function closeDropdown(event) {
  dropDown();
}

window.onclick = function (event) {
  closeDropdown(event);
};
