document.body.innerHTML = `
        <div class="container">
        <div id="options-container"></div>
        <div id="letter-container" class="letter-container hide"></div>
        <div class="counter"><p>Incorrect guesses (only 6):<span id="counter"></span></p></div>
        <div id="user-input-section"></div>
        <canvas id="canvas"></canvas>
        <div id="new-game-container" class="new-game-popup hide">
          <div id="result-text"></div>
          <button id="new-game-button">New Game</button>
        </div>
        </div>`

const counterContainer = document.getElementById("counter");
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const canvas = document.getElementById("canvas");
const resultText = document.getElementById("result-text");



let options = {'Hint: The fruit is fluffy on the outside, green on the inside': 'kiwi',
               'Hint: A device with call buttons': 'telephone',
               'Hint: It doesn’t burn in fire and doesn’t drown in water': 'ice',
                'Hint: Large bird of prey': 'eagle',
                'Hint: Pet with a fluffy tail and long mustache': 'cat',
                'Hint: Pet, man is friend': 'dog',
                'Hint: Planet satellite of the Earth, visible at night': 'moon',
                'Hint: High strength, high speed data cable': 'fiber',
                'Hint: Wired digital stream connector': 'cross',
                'Hint: Manual device for lifting a car': 'jack'
};


let winCount = 0;
let count = 0;
let chosenWord = "";



//вывод заголовка с вопросом
const displayOptions = () => {
  optionsContainer.innerHTML += `<h3>-Hangman game-</h3>`;
  let buttonCon = document.createElement("div");

    //получаем массив ключей
    let keys = Object.keys(options);
    let entries = Object.entries(options);
    // let randomProperty = obj[keys[ keys.length * Math.random() << 0]];

    // получаем случайный ключ
    let randomKey = keys[ keys.length * Math.random() << 0];
    let randomEntries = entries[ keys.length * Math.random() << 0];
    console.log(randomEntries);

    buttonCon.innerHTML += `<div class="options">${randomEntries[0]}</div>`;
    chosenWord = randomEntries[1];
    generateWord(randomEntries[0],chosenWord);
  
  optionsContainer.appendChild(buttonCon);
};


const blocker = () => {
  let optionsButtons = document.querySelectorAll(".options");
  let letterButtons = document.querySelectorAll(".letters");

  optionsButtons.forEach((button) => {
    button.disabled = true;
  });

  letterButtons.forEach((button) => {
    button.disabled.true;
  });
  newGameContainer.classList.remove("hide");
};

//генерируем секретное слово
const generateWord = (optionValue,chosen) => {
  let optionsButtons = document.querySelectorAll(".options");
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
    chosenWord = chosenWord.toUpperCase();
    console.log(chosenWord);
    let displayItem = chosenWord.replace(/./g, '<span class="dashes">_</span>');
  userInputSection.innerHTML = displayItem;
};

//загрузка клавиатуры
const initializer = () => {
  winCount = 0;
  count = 0;

  userInputSection.innerHTML = "";
  optionsContainer.innerHTML = "";
  letterContainer.classList.add("hide");
  newGameContainer.classList.add("hide");
  letterContainer.innerHTML = "";9

  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //Number to ASCII[A-Z]
    button.innerText = String.fromCharCode(i);
   
    //события нажания виртуальной клавиатуры
    button.addEventListener("click", () => {
      let charArray = chosenWord.split("");
      let dashes = document.getElementsByClassName("dashes");
      
      //неправильные попытки 
      function counterGuesses(countValue){
        counterContainer.innerHTML = `${countValue}`;
      };
      
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Great you Win!!</h2><p>The secret word was <span>${chosenWord}</span></p>`;
              counterGuesses(0);
              blocker();
            }
          }
        });
      } else {    
        count += 1;
        counterGuesses(count);
        drawMan(count);
        //Count==6 because head,body,left arm, right arm,left leg,right leg
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Sorry, but you lose!!</h2><p>The secret word was <span>${chosenWord}</span></p>`;
          counterGuesses(0);
          blocker();
        }
      }
      button.disabled = true;
    });

    letterContainer.append(button);
  }



  displayOptions();
  let { initialDrawing } = canvasCreator();
  initialDrawing();
};

//Canvas
const canvasCreator = () => {
  let context = canvas.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#000";
  context.lineWidth = 2;

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
};

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
          
//события физической клавиатуры
window.addEventListener("keydown", (e) => {
    let currentKey;
      currentKey = e.key;
      currentKey = currentKey.toUpperCase();
      // console.log(currentKey);
      
    let button = document.querySelectorAll(" .letters");
      for(let elem of button){
      // console.log(elem.textContent);
      if(elem.textContent == currentKey){
        // console.log(true);
        elem.disabled = true;
      }
    }
    let controlArray = [];
    let charArray = chosenWord.split("");
    let dashes = document.getElementsByClassName("dashes");
      
    controlArray.push(currentKey);
    if(true){
      //неправильные попытки 
      function counterGuesses(countValue){
        counterContainer.innerHTML = `${countValue}`;
      };
        console.log(controlArray); 
  
      if (charArray.includes(currentKey)) {
        charArray.forEach((char, index) => {
          if (char === currentKey) {
            dashes[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerHTML = `<h2 class='win-msg'>Great you Win!!</h2><p>The secret word was <span>${chosenWord}</span></p>`;
              counterGuesses(0);
              blocker();
            }
          }
        });
      } else {
        count += 1;
        counterGuesses(count);
        drawMan(count);
        if (count == 6) {
          resultText.innerHTML = `<h2 class='lose-msg'>Sorry, but you lose!!</h2><p>The secret word was <span>${chosenWord}</span></p>`;
          counterGuesses(0);
          blocker();
        }
      }
    }
    }); 

//Новая игра
newGameButton.addEventListener("click", initializer);
window.onload = initializer;