const userInputField = document.querySelector('#inputfield'),
testDisplay = document.querySelector('#testdisplay'),
startButton = document.querySelector('#startbutton'),
retryButton = document.querySelector('#retrybutton'),
resetButton = document.querySelector('#resetbutton'),
nextButton = document.querySelector('#nextbutton'),
skipButton = document.querySelector('#skipbutton'),
loaderCounter = document.querySelector('#counter'),
resultMessage = document.querySelector('#resultmessage'),
levelSlider = document.querySelector('#levelslider'),
levelDisplay = document.querySelector('#leveldisplay');

const maxlevel = levelSlider.max;

let randomNumbers = [],
position = 0,
level = 1,
secondsleft;


levelDisplay.textContent = level;

userInputField.addEventListener("input", () => {
    userInputField.value = onlyAllowNumbers(userInputField.value);
    if (userInputField.value.length > 0) {position=userInputField.value.length-1;}
    compareNumbers(userInputField.value[position], randomNumbers[position]);
  }
);


document.body.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        secondsleft > 0 ? skipButton.click() : nextButton.click(); 
    }
});

levelSlider.addEventListener("input", () => {
    level = parseInt(levelSlider.value);
    levelDisplay.textContent = level;
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

skipButton.addEventListener("click", () => {
    secondsleft = 0;
    loaderCounter.textContent = secondsleft;
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
    guessedNumber == actualNumber ? getPoint(userInputField.value.length-1) : gameResult(userInputField.value.length, false);
}

const getPoint = (currentNumberPosition) => {
    showImage(currentNumberPosition);
    currentNumberPosition >= randomNumbers.length-1 && gameResult(userInputField.value.length, true);
}

const showImage = (id) => {
    image = document.querySelector(`#image${id}`);
    image && image.classList.remove("image-hide");
}

const onlyAllowNumbers = (str) => {
    return str.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');
}

const displayContent = (content, targetElement) => {
    targetElement.textContent = content;
}

const clearContent = (targetId) => {
    const element = document.querySelector(targetId);
    while (element.firstChild) element.removeChild(element.firstChild);
}

const gameResult = (strLen, outcome) => {
    //outcome: true = winner, false = loser
    userInputField.maxLength = strLen;
    userInputField.disabled = true;
    userInputField.blur();
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
}

const resetClassLists = (targetElement) => {
    targetElement.classList.remove('show');
    targetElement.classList.remove('hide');
}

const startTimer = () => {
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
    userInputField.focus();
}

const lockButton = (buttonId, buttonStatus) => {
    document.querySelectorAll(buttonId).forEach(element => {
        element.disabled = buttonStatus;
        buttonStatus === true ? element.classList.add('nohover') : element.classList.remove('nohover');
    });
}

const resetGame = (retry = true) => {
    userInputField.value = '';
    lockButton('.buttonwrapper button', true);
    if (retry === true) {
        randomNumbers = randomizeNumbers(3+level);
    }
    userInputField.maxLength = randomNumbers.length;
    clearContent('#randomdisplay');
    addNumberImages('#randomdisplay', randomNumbers);
    userInputField.disabled = false;
    document.body.classList.remove('gameover');
    resetClassLists(document.querySelector('.controls'));
    document.querySelector('.controls').classList.add('hide');
    secondsleft = 10 + Math.floor(level * 0.1);
    startTimer();
    resultMessage.textContent = `Level ${level}`;
}

const init = () => {
    document.querySelector('.startscreen').classList.add('hide');
    document.querySelector('.gamescreen').classList.add('show');
    document.querySelector('main').classList.add('main-boxshadow');
    resetGame();
}
