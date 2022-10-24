const userInputField = document.querySelector('#inputfield');
const testDisplay = document.querySelector('#testdisplay');
const startButton = document.querySelector('#startbutton');

let randomNumbers = [];
let position = 0;
let totalnumbers = 0;

userInputField.addEventListener("input", () => {
    userInputField.value = onlyAllowNumbers(userInputField.value);
    if (userInputField.value.length > 0) {position=userInputField.value.length-1;}
    compareNumbers(userInputField.value[position], randomNumbers[position]);
  }
);

startButton.addEventListener("click", () => {
    init();
  }
);

const addNumberImages = (targetId, array) => {
    array.forEach((element, index) => {
        const image = document.createElement('img');
        image.setAttribute("src",`images/${element}.png`);
        image.setAttribute("alt","Image");
        image.setAttribute("id",`image${index}`);
        image.classList.add("image");
        image.classList.add("image-hide");
        document.querySelector(targetId).appendChild(image);
    });
}


const compareNumbers = (guessedNumber, actualNumber) => {
    //displayContent(`${userInputField.value[position]} VS ${randomNumbers[position]}`, testDisplay);
    //document.body.style.backgroundColor = "white";
    guessedNumber == actualNumber ? getPoint(userInputField.value.length-1) : gameResult(userInputField.value.length, false);
}

const getPoint = (currentNumberPosition) => {
    showImage(currentNumberPosition);
    if (currentNumberPosition >= totalnumbers-1) {
        gameResult(userInputField.value.length, true);
    } 
}

const showImage = (id) => {
    image = document.querySelector(`#image${id}`);
    if (image) {
        image.classList.remove("image-hide");
    }
}

const onlyAllowNumbers = (str) => {
    return str.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');
}

const displayContent = (content, targetElement) => {
    targetElement.textContent = content;
}

const clearContent = (targetId) => {
    //mend this later:
    document.querySelector(targetId).innerHTML='';
}

const gameResult = (strLen, outcome) => {
    //outcome: true = winner, false = loser
    if (!outcome) {document.body.classList.add('gameover');}
    userInputField.maxLength = strLen;
    userInputField.disabled = true;
    displayContent(outcome ? 'Success!' : 'Fail!', document.querySelector('#resultmessage'));
}

const randomizeNumbers = (iterations) => {
    return Array(iterations).fill().map(() => Math.round((Math.random() * 8) + 1));
    //return [1,3,6,5,5,8,9,2,3,2,1,1,4,8,9,3,9];
}

const resetGame = () => {
    randomNumbers = randomizeNumbers(16);
    totalnumbers=randomNumbers.length;
    clearContent('#randomdisplay');
    addNumberImages('#randomdisplay', randomNumbers);
    userInputField.disabled = false;
    document.body.classList.remove('gameover');
}

const init = () => {
    document.querySelector('.startscreen').classList.add('hide');
    document.querySelector('.gamescreen').classList.add('show');
    resetGame();
}
