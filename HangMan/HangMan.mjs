"use strict"

//Initial References
let letterContainer
let optionsContainer
let userInputSection
let newGameContainer
let newGameButton
let canvas
let resultText


//Options values for buttons
let options = {
    fruits: [
        "Apple",
        "Banana",
        "Cherry",
        "Coconut",
        "Fig",
        "Grape",
        "Lemon",
        "Lime",
        "Mango",
        "Orange",
        "Pineapple",
        "Raspberry"
    ],
    animals: [
        "Armadillo",
        "Bird",
        "Cat",
        "Dog",
        "Elephant",
        "Firefly",
        "Hyena",
        "Iguana",
        "Koala",
        "Llama",
        "Raccoon",
        "Weasel",
        "Zebra"
    ],
    countries: [
        "Afghanistan",
        "Australia",
        "Azerbaijan",
        "Bosnia and Herzegovina",
        "Costa Rica",
        "Czechia",
        "Dominican Republic",
        "France",
        "Guinea-Bissau",
        "Japan",
        "Liechtenstein",
        "Madagascar",
        "Papua New Guinea",
        "Sao Tome and Principe",
        "Switzerland",
        "United States of America",
        "Zimbabwe"
    ]
}

//Count
let winCount = 0
let count = 0

let chosenWord = ""

//Display option buttons
function displayOptions(){
    optionsContainer.innerHTML += `<h3>Please Select An Option</h3>`
    let buttonCon = document.createElement("div")
    for(let value in options){
        buttonCon.innerHTML += `<button class="options" onClick="generateWord('${value}')">${value}</button>`
    }
    optionsContainer.appendChild(buttonCon)
}

//Block all Buttons
function blocker(){
    let optionsButtons = document.querySelectorAll(".options")
    let letterButtons = document.querySelectorAll(".letters")
    optionsButtons.forEach( (button) => {
        button.disabled = true
    })
    letterButtons.forEach( (button) => {
        button.disable.true
    })
    newGameContainer.classList.remove("hide")
}

//Word Generator
function generateWord(optionValue){
    let optionsButtons = document.querySelectorAll(".options")
    optionsButtons.forEach( (button) =>{
        if(button.innerText.toLowerCase() === optionValue){
            button.classList.add("active")
        }
        button.disabled = true
    })

    //inittialy hide letters, clear previous word
    letterContainer.classList.remove("hide")
    userInputSection.innerText = ""

    let optionArray = options[optionValue]

    chosenWord = optionArray[Math.floor(Math.random()*optionArray.length)]
    

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">-</span>');
    userInputSection.innerHTML = displayItem
}

//Initial Function
function initializer(){
    winCount = 0
    count = 0

    //Creating letter buttons
    for(let i = "A".charCodeAt(0); i<"Z".charCodeAt(0); i++){
        let button = document.createElement("button")
        button.classList.add("letters")
        button.innerText = String.fromCharCode(i)
        letterContainer.append(button)
    }

    displayOptions()
}

function initContainers(){
    letterContainer = document.getElementById("letter-container")
    optionsContainer = document.getElementById("options-container")
    userInputSection = document.getElementById("user-input-section")
    newGameContainer = document.getElementById("new-game-container")
    newGameButton = document.getElementById("new-game-button")
    canvas = document.getElementById("canvas")
    resultText = document.getElementById("result-text")

    newGameButton.addEventListener("click",initializer)
}

//New Game
window.onload = function(){
    initContainers()
    initializer()
}