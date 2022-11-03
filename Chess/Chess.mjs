"use strict"

const ROWS = 8
const COLUMNS = 8

let board

window.onload = function(){
    setupGame()
}

function setupGame(){
    board = [
        ['BT','BH','BB','BQ','BK','BB','BH','BT'],
        ['BP','BP','BP','BP','BP','BP','BP','BP'],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        ['WP','WP','WP','WP','WP','WP','WP','WP'],
        ['WT','WH','WB','WQ','WK','WB','WH','WT']
    ]

    for(let r = 0; r<ROWS; r++){
        for(let c = 0; c<COLUMNS; c++){
            let tile = document.createElement("div")
            tile.id = r.toString()+"-"+c.toString()
            tile.classList.add("tile")
            //tile.addEventListener("click",setTile)
            document.getElementById("board").append(tile)
        }
    }
}

function startGame(){

}

function setTile(){
    console.log(this)
}