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
const pointsDisplay = document.getElementById('habits-points');
const pointsMessage = document.getElementById('points-message');
const sleepHoursContainer = document.getElementById('sleep-hours-container');

function addTextToContainer() {
    const addText = document.createElement('p');
    addText.textContent = addInput.value;
    textContainer.append(addText);
    addInput.value = '';
}

addInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addTextToContainer();
});

addButton.addEventListener('click', addTextToContainer());

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
        // show hours of sleep input
        if (checkbox.id === 'get-sleep') {
            sleepHoursContainer.style.display = 'block';
        }
    } else {
        if (checkbox.type === 'checkbox') {
            totalPoints -= parseInt(checkbox.dataset.points); // Convert string into integer
            // hide hours of sleep input
            if (checkbox.id === 'get-sleep') {
                sleepHoursContainer.style.display = 'none';
            }
        }
    }
    
    pointsDisplay.textContent = totalPoints;
    if (totalPoints > 70) {
        pointsMessage.textContent = 'Amazing Job! Keep it up!';
        pointsMessage.classList.add('three');
    } else if (totalPoints > 40) {
        pointsMessage.textContent = 'You are doing great!';
        pointsMessage.classList.add('two');
        pointsMessage.classList.remove('three');
    } else if (totalPoints > 15) {
        pointsMessage.textContent = 'Nice Work!';
        pointsMessage.classList.add('one');
        pointsMessage.classList.remove('two');
    } else {
        pointsMessage.textContent = 'You can do better.';
        pointsMessage.classList.add('zero');
        pointsMessage.classList.remove('one');
    }
});
