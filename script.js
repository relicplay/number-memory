const userInputField = document.querySelector('#inputfield');
const testDisplay = document.querySelector('#testdisplay');

let randomNumbers = [1,3,6,5,5,8,9,2,3,2,1,1,4,8,9,3,9];
let position = 0;

userInputField.addEventListener("input", () => {
    userInputField.value = onlyAllowNumbers(userInputField.value);
    if (userInputField.value.length > 0) {position=userInputField.value.length-1;}
    console.log(position);
    compareNumbers(userInputField.value[position], randomNumbers[position]);
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


const showImage = (id) => {
    console.log('ID: '+id);
    image = document.querySelector(`#image${id}`);
    if (image) {
        image.classList.remove("image-hide");
    }
}


const compareNumbers = (guessedNumber, actualNumber) => {
    displayContent(`${userInputField.value[position]} VS ${randomNumbers[position]}`, testDisplay);
    document.body.style.backgroundColor = "white";
    if (guessedNumber == actualNumber) {
      document.body.style.backgroundColor = "blue";
      showImage(userInputField.value.length-1);
    }
}

const onlyAllowNumbers = (str) => {
    return str.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');
}

const displayContent = (content, targetElement) => {
    targetElement.textContent = content;
}

const displayRandomNumbers = () => {
    clearContent('#randomdisplay');
    addNumberImages('#randomdisplay', randomNumbers);
}

const clearContent = (targetId) => {
    document.querySelector(targetId).innerHTML='';
}

displayRandomNumbers();