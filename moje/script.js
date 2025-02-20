'use strict';

// Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1'); // alternativa pro vyber podle id (rychlejsi nez querySelector)
const diceElement = document.querySelector('.dice');
const current0Score = document.querySelector('#current--0');
const current1Score = document.querySelector('#current--1');
const p1name = document.querySelector('#name--0');
const p2name = document.querySelector('#name--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);

let currentScore, activePlayer, totalScore;

function init() {
  btnRoll.disabled = false;
  btnHold.disabled = false;
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];

  p1name.textContent = prompt(`Zadej jmeno hrace 1: `);
  p2name.textContent = prompt(`Zadej jmeno hrace 2: `);

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Score.textContent = 0;
  current1Score.textContent = 0;

  diceElement.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');
}

function switchPlayer() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

init();

btnRoll.addEventListener('click', function () {
  let diceNum = Math.trunc(Math.random() * 6) + 1;
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${diceNum}.png`;
  if (diceNum !== 1) {
    currentScore += diceNum;
    document.querySelector(`#current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  totalScore[`${activePlayer}`] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    totalScore[`${activePlayer}`];
  if (totalScore[`${activePlayer}`] >= 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceElement.classList.add('hidden');
    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
