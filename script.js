const grid = document.getElementById("sketch-grid");
const length = 6;


function createCell(i){
    const div = document.createElement("div");
    //div.innerText = ((i+1)%10);
    div.classList.add("cell");
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