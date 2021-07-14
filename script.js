const grid = document.getElementById("sketch-grid");
let length = 16;

const defaultColor = getComputedStyle(document.body).getPropertyValue("--default-color");
let brushColor = "hsl(202, 75%, 79%)";

const setLengthBtn = document.getElementById("set-length");


// key to press to temporarily disable drawing
const STOP_KEY = "Space";

function generateRandomColor(){
    return "#" + Math.floor(Math.random()*16777215).toString(16);
}

function changeBackgroundColor(elem, newColor){
    elem.style.backgroundColor = newColor;
}

function eraseCell(cell){
    changeBackgroundColor(cell, defaultColor);
}
// mouseover event listener
// to change color of a cell (paint)
function paintCell(evt){
    changeBackgroundColor(evt.target, brushColor);
}

// add hover listener to all the cells
function addHover(){
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener('mouseover', paintCell);
    });
}

function removeHover(){
    document.querySelectorAll(".cell").forEach(cell => {
        cell.removeEventListener('mouseover', paintCell);
    });
}

function createCell(i){
    const div = document.createElement("div");
    div.classList.add("cell");
    return div;
}

function gridInit(length){
    for(let r = 0; r < length; r++){
        const row = document.createElement("div");
        row.classList.add("row");

        for(let c = 0; c < length; c++){
            row.appendChild(createCell(r));
        }
        grid.appendChild(row);
    }

    addHover();

    setLengthBtn.innerText = `Set grid length: currently ${length}`
}

// functions to enable/disable hover(mouseover) for cells
function hoverToggle(enable){
    if(enable){
        grid.style.pointerEvents = "";
    }

    else{
        grid.style.pointerEvents = "none";
    }
}



// remove cell hover
function eraseGrid(){
    document.querySelectorAll('.cell').forEach((cell)=>{
        eraseCell(cell);
    });
}


function eraseGridListener(){
    document.body.addEventListener('keydown', function(e){
        if(e.code == 'Escape'){
            eraseGrid();
        }
    });
}

// Everytime keydown is activated the mouse pointer flickers even without hoverToggle, not sure why
// when stop key is pressed, cells stop being colored. press again to enable drawing
function stopDrawing(){
    let removed = false;

    document.addEventListener('keydown', function(e){
        if(e.repeat){return;}
        const key = e.code;

        if(key === STOP_KEY){
            if(!removed){
                hoverToggle(false);
                removed = true;
            }

            else{
                hoverToggle(true);
                removed = false;
            }

        }
    });
}

// instead of just removing cell hover, delete the elements within sketch-grid completely
function deleteGrid(){
    grid.innerHTML = '';
}

function setLengthFn(){
    const min = 2;
    const max = 100;
    let newLength = Number(prompt(`What do you want the length of the grid to be? Enter a number between ${min} and ${max} inclusive.\nCurrent length: ${length}`));
    
    if(isNaN(newLength) || newLength < min || newLength > max){
        alert("Invalid value, please try again");
    }

    else{
        deleteGrid();
        length = newLength;
        gridInit(length);
        
    }

    // IMPORTANT - space is used to trigger elements, without blur it causes unintended effects 
    // blur will take away focus from the current element so its not triggered randomly by buttons
    document.activeElement.blur()
}

gridInit(length);
stopDrawing();
eraseGridListener();
setLengthBtn.addEventListener('click', setLengthFn);


