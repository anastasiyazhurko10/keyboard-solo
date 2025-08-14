const words = ['apple', 'banana', 'grape', 'orange', 'peach', 'melon'];

const wordContainer = document.querySelector('.word');
const correctCountEl = document.querySelector('.correct-count');
const wrongCountEl = document.querySelector('.wrong-count');
const wordMistakesEl = document.querySelector('.word-mistakes');

let currentWord = '';
let currentIndex = 0;
let mistakesInWord = 0;
let correctWords = 0;
let wrongWords = 0;
let seconds = 0;
let timerInterval;

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

    if (mistakesInWord === 3) {
        wrongWords++;
        wrongCountEl.textContent = wrongWords;
        checkGameStatus();
        setTimeout(initWord, 500);
    }
  }
});

function checkGameStatus() {
  if (correctWords === 5) {
    alert('🎉 Победа! Вы ввели 5 слов правильно.');
    resetGame();
  } else if (wrongWords === 5) {
    alert('😢 Поражение. 5 слов введены с ошибками.');
    resetGame();
  }
}

function resetGame() {
  correctWords = 0;
  wrongWords = 0;
  mistakesInWord = 0;
  currentIndex = 0;
  seconds = 0;

  correctCountEl.textContent = '0';
  wrongCountEl.textContent = '0';
  wordMistakesEl.textContent = '0';
  updateTimerDisplay();
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    updateTimerDisplay();
  }, 1000);
}

function updateTimerDisplay() {
  const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');
  timerEl.textContent = `${mins}:${secs}`;
}

initWord();
startTimer();