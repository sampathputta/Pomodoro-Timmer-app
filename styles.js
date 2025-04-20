const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const stopBtn = document.getElementById('stopBtn');
const modeButtons = document.querySelectorAll('.modeBtn');

let duration = 1500; // default 25 minutes (Pomodoro)
let remainingTime = duration;
let interval = null;

function updateDisplay(seconds) {
  const min = Math.floor(seconds / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
}

function startTimer() {
  if (interval) return;
  interval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay(remainingTime);
    } else {
      clearInterval(interval);
      interval = null;
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
  interval = null;
}

function resetTimer() {
  pauseTimer();
  remainingTime = duration;
  updateDisplay(remainingTime);
}

function stopTimer() {
  clearInterval(interval);
  interval = null;
  remainingTime = 0;
  updateDisplay(remainingTime);
}

function switchMode(e) {
  modeButtons.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  duration = parseInt(e.target.dataset.time);
  resetTimer();
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
stopBtn.addEventListener('click', stopTimer);
modeButtons.forEach(btn => btn.addEventListener('click', switchMode));

updateDisplay(duration);
