const grid = document.getElementById("sketch-grid");
const length = 64;

// key to hold to temporarily disable drawing
const HOLD_KEY = "Space";

// mouseover event listener
function cellHover(evt){
    this.classList.add('cell-hover');
}

// add hover listener to all the cells
function addHover(){
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener('mouseover', cellHover);
    });
}

function removeHover(){
    document.querySelectorAll(".cell").forEach(cell => {
        cell.removeEventListener('mouseover', cellHover);
    });
}

function createCell(i){
    const div = document.createElement("div");
    //div.innerText = ((i+1)%10);
    div.classList.add("cell");
    //div.addEventListener('mouseover', cellHover);
    return div;
}

for(let r = 0; r < length; r++){
    const row = document.createElement("div");
    row.classList.add("row");

    for(let c = 0; c < length; c++){
        row.appendChild(createCell(r));
    }
    grid.appendChild(row);
}

let removed = false;
document.body.addEventListener('keydown', function(e){
    if (e.code === HOLD_KEY && !removed){
        removeHover();
        removed = true;
    }
});

document.body.addEventListener('keyup', function(e){
    if(e.code == HOLD_KEY && removed){
        addHover();
        removed = false;
    }
});

addHover();