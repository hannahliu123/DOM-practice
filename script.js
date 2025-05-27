// ========== Add Text Section ==========
const addInput = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const textContainer = document.getElementById('text-container');

// ========== Shapes Color Section ==========
const colorContainer = document.getElementById('change-color-container');

// ========== Character Counter ==========
const charCountInput = document.getElementById('char-count-input');
const charDisplay = document.getElementById('char-display');

// ========== Habit Checkboxes ==========
const checkboxContainer = document.getElementById('checkboxes');
const sleepCheckbox = document.getElementById('get-sleep');
const sleepHoursContainer = document.getElementById('sleep-hours-container');
const sleepHoursInput = document.getElementById('sleep-hours-input');
const pointsDisplay = document.getElementById('habits-points');
const pointsMessage = document.getElementById('points-message');

// ========== Functions ==========
function addTextToContainer() {
    const addText = document.createElement('p');
    addText.textContent = addInput.value;
    textContainer.append(addText);
    addInput.value = '';
}

function updatePointsMessage() {
    pointsMessage.classList.remove('zero', 'one', 'two', 'three');

    if (totalPoints >= 70) {
        pointsMessage.textContent = 'Amazing Job! Keep it up!';
        pointsMessage.classList.add('three');
    } else if (totalPoints > 40) {
        pointsMessage.textContent = 'You are doing great!';
        pointsMessage.classList.add('two');
    } else if (totalPoints > 15) {
        pointsMessage.textContent = 'Nice Work!';
        pointsMessage.classList.add('one');
    } else {
        pointsMessage.textContent = 'You can do better.';
        pointsMessage.classList.add('zero');
    }
}

// ========== Event Listeners ==========
addButton.addEventListener('click', addTextToContainer);    // passing in reference to function, not calling it, so no parenthases needed
addInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addTextToContainer();
});

textContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') { // so you don't delete the div (container)
        event.target.remove();
    }
});

colorContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('shape')) {
        event.target.classList.toggle('active');
    }
});

charCountInput.addEventListener('input', () => {
    charDisplay.textContent = 'Characters: ' + charCountInput.value.length;
});

let totalPoints = 0;
checkboxContainer.addEventListener('change', (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
        totalPoints += parseInt(checkbox.dataset.points); // Convert string into integer
        if (checkbox.id === 'get-sleep') sleepHoursContainer.style.display = 'block';
    } else if (checkbox.type === 'checkbox') {   // not number input
        totalPoints -= parseInt(checkbox.dataset.points); // Convert string into integer
        if (checkbox.id === 'get-sleep') sleepHoursContainer.style.display = 'none';
    }
    
    // update points display
    if (sleepCheckbox.checked) pointsDisplay.textContent = totalPoints + parseInt(sleepHoursInput.value);
    else pointsDisplay.textContent = totalPoints;
    updatePointsMessage();
});
