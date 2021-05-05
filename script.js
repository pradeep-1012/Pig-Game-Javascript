"use strict";
// selecting elements
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
// starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;
	diceEl.classList.add("hidden");
	score0El.textContent = 0;
	score1El.textContent = 0;
	current0El.textContent = currentScore;
	current1El.textContent = currentScore;

	player0El.classList.remove("player--winner");
	player1El.classList.remove("player--winner");
	player0El.classList.add("player--active");
	player1El.classList.remove("player--active");
	playing = true;
};
init();
const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
	// generating a random dice roll
	if (playing) {
		const dice = Math.trunc(Math.random() * 6) + 1;
		// displaying the dice
		diceEl.classList.remove("hidden");
		diceEl.src = `dice-${dice}.png`;
		// check if rolled 1
		if (dice !== 1) {
			// add dice to current score
			currentScore += dice;
			document.getElementById(
				`current--${activePlayer}`
			).textContent = currentScore;
		} else {
			// switch to next player
			switchPlayer();
		}
	}
});
btnHold.addEventListener("click", function () {
	// add current score to active Player's total score
	if (playing) {
		scores[activePlayer] += currentScore;
		document.getElementById(`score--${activePlayer}`).textContent =
			scores[activePlayer];
		// check if player score >=100
		if (scores[activePlayer] >= 100) {
			diceEl.classList.add("hidden");
			playing = false;
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.add("player--winner");
			document
				.querySelector(`.player--${activePlayer}`)
				.classList.remove("player--active");
		} else {
			// switch player
			switchPlayer();
		}
	}
});
btnNew.addEventListener("click", init);
