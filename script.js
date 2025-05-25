const input = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const textContainer = document.getElementById('text-container');
const colorContainer = document.getElementById('change-color-container');

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const addText = document.createElement('p');
        addText.textContent = input.value;
        textContainer.append(addText);
    }
});

addButton.addEventListener('click', () => {
    const addText = document.createElement('p');
    addText.textContent = input.value;
    textContainer.append(addText);
});

textContainer.addEventListener('click', (event) => {
    if (event.target.tagName === 'P') { // so you don't delete the div (container)
        event.target.remove();
    }
});

colorContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('shape')) {
        alert(event.target);    // UNFINISHED
    }
});
