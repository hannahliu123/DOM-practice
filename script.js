const addInput = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const textContainer = document.getElementById('text-container');
const colorContainer = document.getElementById('change-color-container');
const charCountInput = document.getElementById('char-count-input');
const charDisplay = document.getElementById('char-display');
const checkboxContainer = document.getElementById('checkboxes');
const pointsDisplay = document.getElementById('habits-points');
let points = 0;

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


