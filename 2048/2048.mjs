"use strict"

const ROWS = 4
const COLUMNS = 4

const MIN_VALUE = 2
const MAX_VALUE = 2048
let currentValue = MIN_VALUE

let board
let score = 0
let gameOver = false
let win = false

window.onload = function(){
    setupGame()
}

function setupGame(){
    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLUMNS; c++) {      
            let tile = document.createElement("div")
            tile.id = r.toString() + "-" + c.toString()
            let num = board[r][c]
            updateTile(tile,num)
            document.getElementById("board").append(tile)
        } 
    }
    setTwo()
    setTwo()
}

function hasEmptyTile(){
    for(let r = 0; r < ROWS; r++){
        for (let c = 0; c < COLUMNS; c++) {
            if(board[r][c] == 0){
                return true
            }      
        }
    }
    return false
}

function setTwo(){//add new tile
    if(!hasEmptyTile()){
        return
    }
    let found = false
    while(!found){
        let r = Math.floor(Math.random() * ROWS)
        let c = Math.floor(Math.random() * COLUMNS)

        if(board[r][c] == 0){
            board[r][c] = MIN_VALUE
            let tile = document.getElementById(r.toString()+"-"+c.toString())
            tile.innerText = "2"
            tile.classList.add("x2")
            found = true
        }
    }
}

function updateTile(tile,num){
    tile.innerText = ""
    tile.classList.value = ""
    tile.classList.add("tile")
    if(num > 0){
        tile.innerText = num
        if(num <= 4096){
            tile.classList.add("x"+num.toString())
        }
        else{
            tile.classList.add("x8192")
        }
    }
}

function slideHorizontallyTest(sideLeft){ //sideLeft: true->left ; false->right
    let testBoard = board.map(arr => arr.slice())
    for(let r = 0; r<ROWS; r++){
        let row = testBoard[r]
        if(sideLeft) row = slide(row,false)
        else {
            row.reverse()
            row = slide(row,false)
            row.reverse()
        }
        testBoard[r] = row
    }
    return testBoard
}
function slideVerticallyTest(sideUp){ //sideUp: true->left ; false->right
    let testBoard = board.map(arr => arr.slice())
    for(let c = 0; c<COLUMNS; c++){
        let row = [testBoard[0][c],testBoard[1][c],testBoard[2][c],testBoard[3][c]]
        if(sideUp) row = slide(row,false)
        else{
            row.reverse()
            row = slide(row,false)
            row.reverse()
        }
        for(let r = 0; r < ROWS; r++) testBoard[r][c] = row[r]
    }
    return testBoard
}

function checkGameOver(){
    let beforeBoard = board.toString()
    let afterBoard = slideHorizontallyTest(true)
    if(beforeBoard!=afterBoard.toString()) return

    afterBoard = slideHorizontallyTest(false)
    if(beforeBoard!=afterBoard.toString()) return

    afterBoard = slideVerticallyTest(true)
    if(beforeBoard!=afterBoard.toString()) return

    afterBoard = slideVerticallyTest(false)
    if(beforeBoard!=afterBoard.toString()) return

    if(beforeBoard==afterBoard.toString()){
        gameOver = true
        console.log("GAME OVER",gameOver)
        score = score + " GAME OVER"
    }
}

function checkWin(){
    for(let r = 0; r<ROWS; r++){
        for(let c = 0; c<COLUMNS; c++){
            let value = board[r][c]
            if(value > currentValue) currentValue = value
        }
    }
    if(currentValue >= MAX_VALUE && !win){
        console.log("2048 reached, keep playing to get your max score")
        win = true
    }
}

function executeMove(slideKey,side){//side: True->Up & Left ; False->Down & Right
    let beforeBoard = board.toString()
    slideKey(side)
    let afterBoard = board.toString()
    if(beforeBoard != afterBoard) setTwo() 
    checkGameOver()
    checkWin()
}

document.addEventListener("keyup", (e) => {
    if     (e.code == "ArrowLeft" && !gameOver)  executeMove(slideHorizontally,true)
    else if(e.code == "ArrowRight" && !gameOver) executeMove(slideHorizontally,false)
    else if(e.code == "ArrowUp" && !gameOver)    executeMove(slideVertically,true)
    else if(e.code == "ArrowDown" && !gameOver)  executeMove(slideVertically,false)
    document.getElementById("score").innerText = score
})

function filterZero(row){
    //ex: row = [0,0,2,0] || [4,0,0,2]
    return row.filter(num => num != 0)
    //ex: row = [2] || [4,2]
}

function slide(row,changeScore = true){
    row = filterZero(row)
    for(let i = 0; i<row.length; i++){
        if(row[i] == row[i+1]){
            row[i] *= 2
            row[i+1] = 0
            if(changeScore) score += row[i]
        }
    }
    row = filterZero(row)
    while(row.length < COLUMNS){
        row.push(0)
    }
    return row
}

function slideHorizontally(sideLeft){ //sideLeft: true->left ; false->right
    for(let r = 0; r<ROWS; r++){
        let row = board[r]
        if(sideLeft) row = slide(row)
        else {
            row.reverse()
            row = slide(row)
            row.reverse()
        }
        board[r] = row

        for(let c = 0; c < COLUMNS; c++){
            let tile = document.getElementById(r.toString()+"-"+c.toString())
            let num = board[r][c]
            updateTile(tile,num)
        }
    }
}

function slideVertically(sideUp){ //sideUp: true->left ; false->right
    for(let c = 0; c<COLUMNS; c++){
        let row = [board[0][c],board[1][c],board[2][c],board[3][c]]
        if(sideUp) row = slide(row)
        else{
            row.reverse()
            row = slide(row)
            row.reverse()
        }
        for(let r = 0; r < ROWS; r++){
            board[r][c] = row[r]
            let tile = document.getElementById(r.toString()+"-"+c.toString())
            let num = board[r][c]
            updateTile(tile,num)
        }
    }

}
