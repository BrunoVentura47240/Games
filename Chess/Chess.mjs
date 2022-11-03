"use strict"

const ROWS = 8
const COLUMNS = 8

let board

window.onload = function(){
    setupGame()
}

function setupGame(){
    board = [
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',],
        [' ',' ',' ',' ',' ',' ',' ',' ',]
    ]

    for(let r = 0; r<ROWS; r++){
        let tileName = document.createElement("div")
        tileName.classList.add("tileName")
        tileName.innerText = ROWS-r
        document.getElementById("board").append(tileName)

        for(let c = 0; c<COLUMNS; c++){
            let tile = document.createElement("div")

            if( ((c+1) + (COLUMNS-r))%2 != 0) tile.classList.add("tile")
            else tile.classList.add("tile", "black")

            tile.id = (c+1).toString()+"-"+(COLUMNS-r).toString()
            document.getElementById("board").append(tile)
        }
    }

    let tileName = document.createElement("div")
    tileName.classList.add("tileName")
    document.getElementById("board").append(tileName)

    for(let c = 0; c<COLUMNS; c++){
        let tileName = document.createElement("div")
        tileName.classList.add("tileName")
        tileName.innerText = String.fromCharCode('a'.charCodeAt(0)+c)
        document.getElementById("board").append(tileName)
    }

    let turn = document.createElement("div")
    turn.id = "turn"
    turn.innerText = "It's White's Turn"
    document.getElementById("board").append(turn)
}
