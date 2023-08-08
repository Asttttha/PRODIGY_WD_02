const timeElement = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const lapButton = document.getElementById("lap");
const resetButton = document.getElementById("reset");
const lapsList = document.getElementById("laps");

let startTime = 0;
let intervalId = null;
let running = false;

function formatTime(seconds) {
  const date = new Date(seconds);
  return date.toISOString().substr(11, 8);
}

function updateDisplay() {
  const currentTime = running ? Date.now() - startTime  :  startTime;
  timeElement.textContent = formatTime(currentTime);
}

function toggleStartStop() {
  if (running) {
    clearInterval(intervalId);
    startStopButton.textContent = "Start";
    lapButton.disabled = true;
  } else {
    startTime = Date.now() - startTime;
    intervalId = setInterval(updateDisplay, 10);
    startStopButton.textContent = "Stop";
    lapButton.disabled = false;
  }
  running = !running;
}

function lap() {
  if (!running) return;

  const lapTime = Date.now() - startTime;
  const lapItem = document.createElement("li");
  lapItem.textContent = ` ${formatTime(lapTime)}`;
  lapsList.appendChild(lapItem);
}

function reset() {
  clearInterval(intervalId);
  startTime = 0;
  running = false;
  startStopButton.textContent = "Start";
  lapButton.disabled = true;
  timeElement.textContent = "00:00:00";
  lapsList.innerHTML = " ";
}

startStopButton.addEventListener("click", toggleStartStop);
lapButton.addEventListener("click", lap);
resetButton.addEventListener("click", reset);