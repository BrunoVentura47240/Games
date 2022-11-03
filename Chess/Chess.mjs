"use strict"

const ROWS = 8
const COLUMNS = 8

let board

window.onload = function(){
    setupGame()
}

let whitePieces = {
    Rook1:{
        x: 1,
        y: 1,
        position: `1-1`,
        turn: true,
        type: "rook",
        img: './resources/w_rook.png'
    },
    Rook2:{
        x: 1,
        y: 8,
        position: `8-1`,
        turn: true,
        type: "rook",
        img: './resources/w_rook.png'
    },
    Knight1:{
        x: 1,
        y: 2,
        position: `2-1`,
        turn: true,
        type: "knight",
        img: './resources/w_knight.png'
    },
    Knight2:{
        x: 1,
        y: 7,
        position: `7-1`,
        turn: true,
        type: "knight",
        img: './resources/w_knight.png'
    },
    Bishop1:{
        x: 1,
        y: 3,
        position: `3-1`,
        turn: true,
        type: "bishop",
        img: './resources/w_bishop.png'
    },
    Bishop2:{
        x: 1,
        y: 6,
        position: `6-1`,
        turn: true,
        type: "bishop",
        img: './resources/w_bishop.png'
    },
    Queen:{
        x: 1,
        y: 4,
        position: `4-1`,
        turn: true,
        type: "queen",
        img: './resources/w_queen.png'
    },
    King:{
        x: 1,
        y: 5,
        position: `5-1`,
        turn: true,
        type: "king",
        img: './resources/w_king.png'
    }
}
let blackPieces = {
    Rook1:{
        x: 8,
        y: 1,
        position: `1-8`,
        turn: false,
        type: "rook",
        img: './resources/b_rook.png'
    },
    Rook2:{
        x: 8,
        y: 8,
        position: `8-8`,
        turn: false,
        type: "rook",
        img: './resources/b_rook.png'
    },
    Knight1:{
        x: 8,
        y: 2,
        position: `2-8`,
        turn: false,
        type: "knight",
        img: './resources/b_knight.png'
    },
    Knight2:{
        x: 8,
        y: 7,
        position: `7-8`,
        turn: false,
        type: "knight",
        img: './resources/b_knight.png'
    },
    Bishop1:{
        x: 8,
        y: 3,
        position: `3-8`,
        turn: false,
        type: "bishop",
        img: './resources/b_bishop.png'
    },
    Bishop2:{
        x: 8,
        y: 6,
        position: `6-8`,
        turn: false,
        type: "bishop",
        img: './resources/b_bishop.png'
    },
    Queen:{
        x: 8,
        y: 4,
        position: `4-8`,
        turn: false,
        type: "queen",
        img: './resources/b_queen.png'
    },
    King:{
        x: 8,
        y: 5,
        position: `5-8`,
        turn: false,
        type: "king",
        img: './resources/b_king.png'
    }
}

function createPawns(turn,pieces){
    for(let i = 1; i<=ROWS; i++){
        let x = 2
        let image = './resources/w_pawn.png'
        if(!turn){
            x = 7
            image = './resources/b_pawn.png'
        }
        pieces[`Pawn${i}`] = {
            x: x,
            y: i,
            position: `${i}-${x}`,
            turn: turn,
            type: "pawn",
            img: image
        }
    }
    return pieces
}

function putPieces(board){
    whitePieces = createPawns(true,whitePieces)
    blackPieces = createPawns(false,blackPieces)

    board[7][0] = whitePieces.Rook1
    board[7][1] = whitePieces.Knight1
    board[7][2] = whitePieces.Bishop1
    board[7][3] = whitePieces.Queen
    board[7][4] = whitePieces.King
    board[7][5] = whitePieces.Bishop2
    board[7][6] = whitePieces.Knight2
    board[7][7] = whitePieces.Rook2
    for(let j = 0; j<COLUMNS;j++ ){
        board[6][j] = whitePieces[`Pawn${j+1}`]
    }

    board[0][0] = blackPieces.Rook1
    board[0][1] = blackPieces.Knight1
    board[0][2] = blackPieces.Bishop1
    board[0][3] = blackPieces.Queen
    board[0][4] = blackPieces.King
    board[0][5] = blackPieces.Bishop2
    board[0][6] = blackPieces.Knight2
    board[0][7] = blackPieces.Rook2
    for(let j = 0; j<COLUMNS;j++ ){
        board[1][j] = blackPieces[`Pawn${j+1}`]
    }
}

function setupGame(){
    board = [
        [{},{},{},{},{},{},{},{},],
        [{},{},{},{},{},{},{},{},],
        [{},{},{},{},{},{},{},{},],
        [{},{},{},{},{},{},{},{},],
        [{},{},{},{},{},{},{},{},],
        [{},{},{},{},{},{},{},{},],
        [{},{},{},{},{},{},{},{},],
        [{},{},{},{},{},{},{},{},]
    ]

    putPieces(board)
    
    for(let r = 0; r<ROWS; r++){
        let tileName = document.createElement("div")
        tileName.classList.add("tileName")
        tileName.innerText = ROWS-r
        document.getElementById("board").append(tileName)

        for(let c = 0; c<COLUMNS; c++){
            let tile = document.createElement("div")
            
            let piece = board[r][c]
            if(piece.img != undefined){
                let img = putImage(piece)
                tile.append(img)
            }

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


function putImage(piece){
    let img = document.createElement("img")
    img.src = piece.img
    img.height = 40
    img.width = 40
    img.style.paddingRight = "4px"
    img.style.paddingTop = "4px"
    return img
}
