let SECONDS = 100;
let TENTHS = 1000;
let RUNNING = false;
let MIDWAY = false;
let NOW = Date.now();
let TIMELEFT = 0;

let secondsEl = document.getElementById("seconds");
let tenthsEl = document.getElementById("tenths");
let button = document.getElementById("start");
let form = document.getElementById("form");
let input = document.getElementById("input");
let reset = document.getElementById("reset");

let runningInterval = "hi";

form.addEventListener("submit", formSubmit);
button.addEventListener("click", handleStopStart);
reset.addEventListener("click", resetTime);

function resetTime() {
  console.log("reset");
  window.clearInterval(runningInterval);
  RUNNING = false;
  MIDWAY = false;
  TIMELEFT = 0;
  secondsEl.innerHTML = SECONDS;
  tenthsEl.innerHTML = "00";
}

function formSubmit(e) {
  e.preventDefault();
  SECONDS = input.value;
  secondsEl.innerHTML = SECONDS;
  tenthsEl.innerHTML = "00";
  TENTHS = SECONDS * 10;
  RUNNING = false;
  MIDWAY = false;
  TIMELEFT = 0;
}

function handleStopStart() {
  if (RUNNING) {
    stopTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  let now;
  let to;
  if (!MIDWAY) {
    now = Date.now();
    to = now + TENTHS * 100;
    RUNNING = true;
  } else {
    console.log("paused starting");
    now = Date.now();
    to = now + TIMELEFT;
    RUNNING = true;
  }
  TIMELEFT = to - now;
  runningInterval = setInterval(() => {
    MIDWAY = true;
    let now = Date.now();
    TIMELEFT = to - now;
    // console.log(TIMELEFT);
    secondsEl.innerHTML = Math.floor((to - now) / 1000);
    tenthsEl.innerHTML = `0${Math.floor(((to - now) / 100) % 10)}`;
    if (now >= to) {
      window.clearInterval(runningInterval);
      secondsEl.innerHTML = "00";
      tenthsEl.innerHTML = "00";
      RUNNING = false;
      MIDWAY = false;
      TIMELEFT = 0;
    }
  }, 100);
}

function stopTimer() {
  RUNNING = false;
  window.clearInterval(runningInterval);
}
