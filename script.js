const userInputField = document.querySelector('#inputfield');
const testDisplay = document.querySelector('#testdisplay');
const startButton = document.querySelector('#startbutton');
const retryButton = document.querySelector('#retrybutton');
const resetButton = document.querySelector('#resetbutton');
const nextButton = document.querySelector('#nextbutton');
const loaderCounter = document.querySelector('#counter');
const resultMessage = document.querySelector('#resultmessage');

const maxlevel = 100;

let randomNumbers = [];
let position = 0;
let level = 1;

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

retryButton.addEventListener("click", () => {
    resetGame(false);
  }
);

resetButton.addEventListener("click", () => {
    resetGame();
  }
);

nextButton.addEventListener("click", () => {
    level < maxlevel ? level++ : level;
    resetGame();
  }
);

const addNumberImages = (targetId, array) => {
    array.forEach((element, index) => {
        const image = document.createElement('img');
        image.setAttribute("src",`images/${element}.png`);
        image.setAttribute("alt","Image");
        image.setAttribute("id",`image${index}`);
        image.classList.add("image");
        document.querySelector(targetId).appendChild(image);
    });
}

const hideNumberImages = (array) => {
    array.forEach((element, index) => {
        const image = document.querySelector(`#image${index}`);
        image.classList.add("image-hide");
    });
}


const compareNumbers = (guessedNumber, actualNumber) => {
    //displayContent(`${userInputField.value[position]} VS ${randomNumbers[position]}`, testDisplay);
    guessedNumber == actualNumber ? getPoint(userInputField.value.length-1) : gameResult(userInputField.value.length, false);
}

const getPoint = (currentNumberPosition) => {
    showImage(currentNumberPosition);
    if (currentNumberPosition >= randomNumbers.length-1) {
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
    userInputField.maxLength = strLen;
    userInputField.disabled = true;
    if (!outcome) {
        document.body.classList.add('gameover');
        lockButton('#retrybutton', false);
        lockButton('#resetbutton', false);
    }
    else {
        lockButton('#nextbutton', false);
    }
    displayContent(outcome ? 'Success!' : 'Fail!', document.querySelector('#resultmessage'));
}

const randomizeNumbers = (iterations) => {
    return Array(iterations).fill().map(() => Math.round((Math.random() * 8) + 1));
    //return [1,3,6,5,5,8,9,2,3,2,1,1,4,8,9,3,9];
}

const resetClassLists = (targetElement) => {
    targetElement.classList.remove('show');
    targetElement.classList.remove('hide');
}

const startTimer = (secondsleft) => {
    loaderCounter.textContent = secondsleft;
    document.querySelector('.loadingscreen').classList.add('show');
    let timer = () => {
        loaderCounter.textContent = secondsleft;
        secondsleft > 0 ? secondsleft-- : killTimer(timerId);
    }
    let timerId = setInterval(timer, 1000);
}

const killTimer = (timerId) => {
    clearInterval(timerId);
    resetClassLists(document.querySelector('.loadingscreen'));
    document.querySelector('.loadingscreen').classList.add('hide');
    document.querySelector('.controls').classList.add('show');
    hideNumberImages(randomNumbers);
}

const lockButton = (buttonId, buttonStatus) => {
    document.querySelectorAll(buttonId).forEach(element => {
        element.disabled = buttonStatus;
        buttonStatus === true ? element.classList.add('nohover') : element.classList.remove('nohover');
    });
}

const resetGame = (retry) => {
    userInputField.value = '';
    lockButton('.buttonwrapper button', true);
    if (retry === undefined) {
        randomNumbers = randomizeNumbers(3+level);
    }
    userInputField.maxLength = randomNumbers.length;
    clearContent('#randomdisplay');
    addNumberImages('#randomdisplay', randomNumbers);
    userInputField.disabled = false;
    document.body.classList.remove('gameover');
    resetClassLists(document.querySelector('.controls'));
    document.querySelector('.controls').classList.add('hide');
    startTimer(5);
    resultMessage.textContent = `Level ${level}`;
}

const init = () => {
    document.querySelector('.startscreen').classList.add('hide');
    document.querySelector('.gamescreen').classList.add('show');
    document.querySelector('main').classList.add('main-boxshadow');
    resetGame();
}
