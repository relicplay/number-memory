const userInputField = document.querySelector('#inputfield');
const testDisplay = document.querySelector('#testdisplay');
const randomDisplay = document.querySelector('#randomdisplay');

let randomNumber = "73389293483943849384984398349834934934894292942929101114340294249";
let hiddenNumbers = '';
let position = 0;

//oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"


userInputField.addEventListener("input", () => {
    if (userInputField.value.length > 0) {position=userInputField.value.length-1;}
    console.log(position);
    displayContent(randomNumber, randomDisplay);
    compareNumbers(userInputField.value[position], randomNumber[position]);
  }
  );


  const displayContent = (content, targetElement) => {
    targetElement.textContent = content;
  }

  const compareNumbers = (guessedNumber, actualNumber) => {
    displayContent(`${userInputField.value[position]} VS ${randomNumber[position]}`, testDisplay);
    document.body.style.backgroundColor = "white";
    if (guessedNumber == actualNumber) {
      document.body.style.backgroundColor = "blue";
    }
    
    //convert hiddenNumbers to array:
    //find position in hiddenNumbers equal to inputValue last.
    //replace with inputvalue if correct, otherwise == *
    //convert hiddenNumbers back to string.

    /*
    let result = '';
    inputNumber.split("").forEach((element) => {
        result += '*';
    });
    return result;
    */
  }

  const createConcealedString = (inputNumber) => {
    return '*'.repeat(inputNumber.length);
  }


  const init = () => {
    hiddenNumbers = createConcealedString(randomNumber);
    displayContent(randomNumber, randomDisplay);
    displayContent(hiddenNumbers, hiddenNumbersDisplay);
    userInputField.maxLength = randomNumber.length;
  }


  init();