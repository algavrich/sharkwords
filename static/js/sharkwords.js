'use strict';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

let numWrong = 0;

// Loop over the chars in `word` and create divs.
// The divs should be appended to the section with id="word-container".
const createDivsForChars = (word) => {
  for (const char of word) {
    document.querySelector('#word-container').insertAdjacentHTML('beforeend', `<div class="letter-box ${char}"></div>`);
  }
};

// Loop over each letter in the alphabet and generate a button for each letter
// The buttons should be appended to the section with id="letter-buttons"
const generateLetterButtons = () => {
  for (const letter of ALPHABET) {
    document.querySelector('#letter-buttons').insertAdjacentHTML('beforeend', `<button name=${letter} id=${letter}>${letter}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = (buttonEl) => {
  buttonEl.setAttribute('disabled', true);
};

// This is a helper function we will use in the future
// It should return `true` if `letter` is in the word
// For now, you should test it out to make sure it works

const isLetterInWord = (letter) => {
  if (document.querySelector(`.${letter}`)) {
    return true;
  }
};

const handleCorrectGuess = (letter) => {
  const spaces = document.querySelectorAll(`.${letter}`);
  
  for (const space of spaces) {
    space.insertAdjacentHTML('beforeend', `${letter}`);
  }

  const rightButton = document.querySelector(`#${letter}`);
  rightButton.setAttribute('disabled', true);

  
};

const handleWrongGuess = (letter) => {
  if (numWrong === 5) {
    for (const button of document.querySelectorAll('button')) {
      button.setAttribute('disabled', true);
    }

    document.querySelector('a').style.display = '';
  } else {
    numWrong += 1;
    const sharkPhoto = document.querySelector('img');
    sharkPhoto.setAttribute('src', `/static/images/guess${numWrong}.png`);
    const wrongButton = document.querySelector(`#${letter}`);
    wrongButton.setAttribute('disabled', true);
  }
}


// This is like if __name__ == '__main__' in Python
// It will be called when the file is run (because
// we call the function on line 66)
(function startGame() {
  // For now, we'll hardcode the word that the user has to guess
  // You can change this to choose a random word from WORDS once you
  // finish this lab but we hard code it so we know what the word is
  // and can tell if things look correct for this word
  // const word = WORDS[Math.floor(Math.random()*WORDS.length)];
  const word = 'hello';

  // call the function that makes an empty line for each letter in the word
  createDivsForChars(word);

  // call the function that makes a button for each letter in the alphabet
  generateLetterButtons();

  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    button.addEventListener('click', () => {
    const letter = button.name;
    if (isLetterInWord(letter)) {
      handleCorrectGuess(letter);
    } else {
      handleWrongGuess(letter);
    }
    });
  }

  

  // in the next lab, you will be adding functionality to handle when
  // someone clicks on a letter
})();
