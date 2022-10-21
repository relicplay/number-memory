

let randomNumbers = [1,3,6,5,5,8,9,2,3,2,1,1,4,8,9,3,9];


const displayRandomNumbers = () => {
    clearContent('#randomdisplay');
    addNumberImages('#randomdisplay', randomNumbers);
}

const clearContent = (targetId) => {
    document.querySelector(targetId).innerHTML='';
}

const addNumberImages = (targetId, array) => {
    array.forEach((element) => {
        const image = document.createElement('img');
        image.setAttribute("src",`images/${element}.png`);
        image.setAttribute("class","image");
        image.setAttribute("alt","Image");
        document.querySelector(targetId).appendChild(image);
    });
}

displayRandomNumbers();