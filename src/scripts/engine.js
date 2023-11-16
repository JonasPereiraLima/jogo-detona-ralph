const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeleft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    livesLeft: document.querySelector("#lives"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 30,
    lives: 3,
  },
  actions: {
    timerId: null,
    countDownTimerId: setInterval(countDown, 1000),
  },
};

main();

function main() {
  moveEnemy();
  addListenerHitBox();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  const randomNumber = Math.floor(Math.random() * 9);
  const randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy() {
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;

        playSound("hit");
      } else {
        livesDown();
      }
    });
  });
}

function countDown() {
  state.values.currentTime--;
  state.view.timeleft.textContent = state.values.currentTime;

  if (state.values.currentTime <= 0) {
    // clearInterval(state.actions.countDownTimerId);
    // clearInterval(state.actions.timerId);
    alert(`Game Over! O seu resultado foi: ${state.values.result}`);
    state.values.currentTime = 30;
    state.values.result = 0;
    state.values.lives = 3;
    state.view.livesLeft.textContent = "x" + state.values.lives;
    state.view.score.textContent = state.values.result;
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function livesDown() {
  state.values.lives--;
  state.view.livesLeft.textContent = `x${state.values.lives}`;
  if (state.values.lives <= 0) {
    alert(`Game Over! O seu resultado foi: ${state.values.result}`);
    state.values.currentTime = 30;
    state.values.result = 0;
    state.values.lives = 3;
    state.view.livesLeft.textContent = "x" + state.values.lives;
    state.view.score.textContent = state.values.result;
  }
}
