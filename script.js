const grid = document.getElementById("sketch-grid");
const length = 5;


function createCell(i){
    const div = document.createElement("div");
    div.innerText = (i%10);
    div.classList.add("cell");
    return div;
}

for(let i = 0; i < length**2; i++){
    grid.appendChild(createCell(i));
}