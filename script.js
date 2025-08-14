const words = ['apple', 'banana', 'grape', 'orange', 'peach', 'melon'];

const wordContainer = document.querySelector('.word');
const correctCountEl = document.querySelector('.correct-count');
const wrongCountEl = document.querySelector('.wrong-count');
const wordMistakesEl = document.querySelector('.word-mistakes');

let currentWord = '';
let currentIndex = 0;
let mistakesInWord = 0;

function getRandomWord() {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}
