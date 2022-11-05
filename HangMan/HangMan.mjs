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
        "Czechia",
        "France",
        "Japan",
        "Liechtenstein",
        "Madagascar",
        "Switzerland",
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
        button.disable = true
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

    chosenWord = optionArray[Math.floor(Math.random()*optionArray.length)].toUpperCase()
    

    //replace every letter with span containing dash
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">-</span>');
    userInputSection.innerHTML = displayItem
}

//Initial Function
function initializer(){
    winCount = 0
    count = 0

    //Initially erase all content and hide letters and new game button
    userInputSection.innerHTML = ""
    optionsContainer.innerHTML = ""
    letterContainer.classList.add("hide")
    newGameContainer.classList.add("hide")
    letterContainer.innerHTML = ""

    //Creating letter buttons
    for(let i = "A".charCodeAt(0); i<="Z".charCodeAt(0); i++){
        let button = document.createElement("button")
        button.classList.add("letters")
        button.innerText = String.fromCharCode(i)

        button.addEventListener("click", () => {
            
            let charArray = chosenWord.split("")
            let dashes = document.getElementsByClassName("dashes")

            if(charArray.includes(button.innerText)){
                charArray.forEach((char,index) => {
                    if(char == button.innerText){
                        dashes[index].innerText = char
                        winCount += 1

                        if(winCount == charArray.length){
                            resultText.innerHTML = `<h2 class='win-msg'>You Win!</h2><p>The word was <span>${chosenWord}</span><p>`
                            blocker()
                        }
                    }
                })
            }else{
                count += 1;
                drawMan(count);
                //Count==6 because head,body,left arm, right arm,left leg,right leg
                if (count == 6) {
                    resultText.innerHTML = `<h2 class='lose-msg'>You Lose!</h2><p>The word was <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            button.disabled = true;
        })
        letterContainer.append(button)
    }
    displayOptions()

    let {initialDrawing} = canvasCreator()

    initialDrawing()
}

function canvasCreator(){
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 2;
    //For drawing lines
    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };
    const head = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };
    const body = () => {
        drawLine(70, 40, 70, 80);
    };
    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };
    const rightArm = () => {
        drawLine(70, 50, 90, 70);
    };
    const leftLeg = () => {
        drawLine(70, 80, 50, 110);
    };
    const rightLeg = () => {
        drawLine(70, 80, 90, 110);
    };

    //initial frame
  const initialDrawing = () => {
    //clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    //bottom line
    drawLine(10, 130, 130, 130);
    //left line
    drawLine(10, 10, 10, 131);
    //top line
    drawLine(10, 10, 70, 10);
    //small top line
    drawLine(70, 10, 70, 20);
  };
  return { initialDrawing, head, body, leftArm, rightArm, leftLeg, rightLeg };

}

//draw the man
const drawMan = (count) => {
    let { head, body, leftArm, rightArm, leftLeg, rightLeg } = canvasCreator();
    switch (count) {
      case 1:
        head();
        break;
      case 2:
        body();
        break;
      case 3:
        leftArm();
        break;
      case 4:
        rightArm();
        break;
      case 5:
        leftLeg();
        break;
      case 6:
        rightLeg();
        break;
      default:
        break;
    }
  };

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