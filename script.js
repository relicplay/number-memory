const userInputField = document.querySelector('#inputfield');
const testDisplay = document.querySelector('#testdisplay');
const randomDisplay = document.querySelector('#randomdisplay');

let randomNumber = "73389293483943849384984398349834934934894292942929101114340294249";
let hiddenNumbers = "******";
let position = 0;


userInputField.addEventListener("input", () => {
    if (userInputField.value.length > 0) {position=userInputField.value.length-1;}
    console.log(position);
    displayContent(`${userInputField.value[position]} VS ${randomNumber[position]}`, testDisplay);
    displayContent(randomNumber, randomDisplay);
  }
  );


  const displayContent = (content, targetElement) => {
    targetElement.innerHTML = content;
  }


  displayContent(randomNumber, randomDisplay);
  displayContent(hiddenNumbers, hiddenNumbersDisplay);