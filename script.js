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

function renderWord(word) {
  wordContainer.innerHTML = '';
  for (const char of word) {
    const span = document.createElement('span');
    span.textContent = char;
    span.classList.add('symbol');
    wordContainer.appendChild(span);
  }
}

function initWord() {
  currentWord = getRandomWord();
  currentIndex = 0;
  mistakesInWord = 0;
  wordMistakesEl.textContent = '0';
  renderWord(currentWord);
}

document.addEventListener('keydown', (event) => {
  const spans = wordContainer.querySelectorAll('span');
  const expectedChar = currentWord[currentIndex];

  if (!expectedChar) return;

  const inputChar = event.key;

  if (inputChar === expectedChar) {
    spans[currentIndex].classList.add('c');
    currentIndex++;

    if (currentIndex === currentWord.length) {
      correctCountEl.textContent = +correctCountEl.textContent + 1;
      setTimeout(initWord, 500);
    }
  } else {
    spans[currentIndex].classList.add('w');
    mistakesInWord++;
    wordMistakesEl.textContent = mistakesInWord;
    setTimeout(() => {
      spans[currentIndex].classList.remove('w');
    }, 300);
  }
});

initWord();