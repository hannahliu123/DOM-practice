const addInput = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const textContainer = document.getElementById('text-container');
const colorContainer = document.getElementById('change-color-container');
const charCountInput = document.getElementById('char-count-input');
const charDisplay = document.getElementById('char-display');
const checkboxContainer = document.getElementById('checkboxes');
const pointsDisplay = document.getElementById('habits-points');
const pointsMessage = document.getElementById('points-message');

addInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const addText = document.createElement('p');
        addText.textContent = addInput.value;
        textContainer.append(addText);
        addInput.value = '';
    }
});

addButton.addEventListener('click', () => {
    const addText = document.createElement('p');
    addText.textContent = addInput.value;
    textContainer.append(addText);
    addInput.value = '';
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
    } else {
        totalPoints -= parseInt(checkbox.dataset.points); // Convert string into integer
    } 
    
    pointsDisplay.textContent = totalPoints;
    if (totalPoints >= 70) {
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
