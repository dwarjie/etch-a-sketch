// Create a 16x16 grid using js inside of the container tag
const gridContainer = document.querySelector("#container");
const root = document.documentElement; // for the css
const btnGrid = document.querySelector("#grid-content");
const btnColorWheel = document.querySelector("#pick-color");
const colorPicker = document.querySelector("#picker");
const btnSmall = document.querySelector("#small");
const btnMed = document.querySelector("#medium");
const btnLarge = document.querySelector("#large");
const btnPen = document.querySelector("#pen");
const btnEraser = document.querySelector("#eraser");
const btnClear = document.querySelector("#clear-btn");
const btnRandom = document.querySelector("#random");
const btnBlacken = document.querySelector("#blacken");

let mode = "pen";
let canvasSize = 16;
let penColor = "rgba(0,0,0,1)";

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

btnClear.addEventListener("click", clearCanvas);
btnPen.addEventListener("click", () => setNewBtnActive(btnPen));
btnEraser.addEventListener("click", () => setNewBtnActive(btnEraser));
btnRandom.addEventListener("click", () => setNewBtnActive(btnRandom));
btnBlacken.addEventListener("click", () => setNewBtnActive(btnBlacken));
colorPicker.addEventListener("input", updateColor, false);

function setup() {
  // Setup everything when the program loads
  divLoops();
  btnPen.classList.add("btn-active");
}

setup();
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
  divElem.setAttribute("style", "background-color: " + `rgba(255,255,255,1)`);

  gridContainer.appendChild(divElem);
  // add eventListener after div is created
  divElem.addEventListener("mouseenter", (e) => {
    addColor(e);
  });
}

function addColor(e) {
  let divElem = e.target;
  // check the pen mode
  switch (mode) {
    case "pen":
      penColor = "rgba(0,0,0,1)";
      break;
    case "eraser":
      penColor = "rgba(255,255,255,1)";
      break;
    // case "random":
    //   randomColor(e);
    //   break;
    case "blacken":
      blackenColor(e);
      break;
  }

  if (divElem.style.backgroundColor != penColor) {
    divElem.style.backgroundColor = penColor;
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
    item.style.backgroundColor = "#ffffff";
  }
}

function setNewBtnActive(newButton) {
  // remove the active class to a button
  const activeClass = "btn-active";
  btnPen.classList.remove(activeClass);
  btnEraser.classList.remove(activeClass);
  btnRandom.classList.remove(activeClass);
  btnBlacken.classList.remove(activeClass);

  // set new active
  newButton.classList.add(activeClass);
  setMode(newButton);
}

function setMode(newMode) {
  switch (newMode) {
    case btnPen:
      mode = "pen";
      break;
    case btnEraser:
      mode = "eraser";
      break;
    case btnRandom:
      mode = "random";
      break;
    case btnBlacken:
      mode = "blacken";
      break;
  }
}

/* Functionalities
 * Pen /
 * Eraser
 * Color Picker /
 * Canvas Grid /
 * Random Color
 * Blacken / Shadow
 */

function blackenColor(e) {
  let currColor = e.target.style.backgroundColor;
  console.log(currColor);
}

// toggle color wheel
function colorWheel() {
  console.log("working");
  if (btnColorWheel.style.display == "none")
    btnColorWheel.style.display = "block";
  else btnColorWheel.style.display = "none";
}

function closeWheel() {
  if (btnColorWheel.style.display == "block")
    btnColorWheel.style.display = "none";
}

function updateColor(event) {
  penColor = event.target.value;
}

// toggle dropdown
function dropDown() {
  if (btnGrid.style.display == "none") btnGrid.style.display = "block";
  else btnGrid.style.display = "none";
}

function closeDropdown() {
  if (btnGrid.style.display == "block") btnGrid.style.display = "none";
}

window.onclick = function (event) {
  if (!event.target.matches(".drop-down")) {
    closeDropdown();
  }

  if (!event.target.matches(".wheel")) {
    closeWheel();
  }
};
