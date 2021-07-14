const grid = document.getElementById("sketch-grid");
const length = 16;
const eraseBtn = document.getElementById("erase");

// key to press to temporarily disable drawing
const STOP_KEY = "Space";


// mouseover event listener
function cellHover(evt){
    evt.target.classList.add('cell-hover');
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
}

// functions to enable/disable hover(mouseover) for cells
function hoverToggle(enable){
    if(enable){
        //grid.style.pointerEvents = "";
        addHover();
    }

    else{
        //grid.style.pointerEvents = "none";
        removeHover();
    }
}



// remove cell hover
function eraseGrid(){
    document.querySelectorAll('.cell').forEach((cell)=>{
        if(cell.classList.contains('cell-hover')){
            cell.classList.remove('cell-hover');
        }
    });
}

eraseBtn.addEventListener('click', eraseGrid);




gridInit(length);

// let removed = false;
//     document.body.addEventListener('keydown', function(e){
//         if (e.code === HOLD_KEY && !removed){
//             removeHover();
//             removed = true;
//         }
//     });

//     document.body.addEventListener('keyup', function(e){
//         if(e.code == HOLD_KEY && removed){
//             addHover();
//             removed = false;
//         }
//     });

// Everytime keydown is activated the mouse pointer flickers even without hoverToggle, not sure why
// when stop key is pressed, cells stop being colored. press again to enable drawing
// function stopDrawing(){
//     let removed = false;
    
//     document.body.addEventListener('keydown', function(e){
//         if(e.code == STOP_KEY){
//             if(!removed){
//                 hoverToggle(false);
//                 removed = true;
//             }

//             else{
//                 hoverToggle(true);
//                 removed = false;
//             }
//         }

//         console.log(removed);
//     });
// }