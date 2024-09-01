let [seconds, minutes, hours] = [0, 0, 0];
let displayTime = document.getElementById('displaytime');
let timer = null;
let isRunning = false; // Track whether the stopwatch is running

function updateDisplay() {
    // Format time correctly
    let hours1 = hours < 10 ? '0' + hours : hours;
    let minutes1 = minutes < 10 ? '0' + minutes : minutes;
    let seconds1 = seconds < 10 ? '0' + seconds : seconds;
    
    displayTime.innerHTML = `${hours1}:${minutes1}:${seconds1}`;
}

function stopwatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateDisplay();
}

function startwatch() {
    if (!isRunning) {
        timer = setInterval(stopwatch, 1000);
        isRunning = true;
        document.getElementById('pause').textContent = 'Pause'; // Change button text to 'Pause'
        document.getElementById('start').disabled = true; // Disable 'Start' button
    }
}

function pausewatch() {
    if (isRunning) {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        document.getElementById('pause').textContent = 'Resume'; // Change button text to 'Resume'
        document.getElementById('start').disabled = false; // Enable 'Start' button
    }
}

function resetwatch() {
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
        isRunning = false;
        document.getElementById('pause').textContent = 'Pause'; // Reset button text
        document.getElementById('start').disabled = false; // Enable 'Start' button
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const pauseButton = document.getElementById('pause');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');

    startButton.addEventListener('click', () => {
        startwatch(); // Start the stopwatch
    });

    pauseButton.addEventListener('click', () => {
        if (isRunning) {
            pausewatch(); // Pause the stopwatch if running
        } else {
            startwatch(); // Resume the stopwatch if paused
        }
    });

    resetButton.addEventListener('click', () => {
        resetwatch(); // Reset the stopwatch
    });
});
