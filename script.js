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

// ========== Rearrange Items ==========
const items = document.querySelectorAll('div.item');
const itemBank = document.getElementById('item-bank');
const dropLine = document.getElementById('drop-line');

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

let draggedItem = null;
items.forEach(item => { // add an event listener that stores an item in a variable to be used every it's dragged
    item.addEventListener('dragstart', () => {
        draggedItem = item;
    });

    // allow draggedItem to be dropped over an item
    item.addEventListener('dragover', (event) => event.preventDefault());

    // draggedItem dropped over an item (position above/below the item)
    item.addEventListener('drop', (event) => {
        event.preventDefault();
        if (draggedItem && draggedItem != item) {   // prevents some weird behavior
            // calculate whether draggedItem should be dropped before or after the item
            const mousePos = event.clientY;
            const bounding = item.getBoundingClientRect();  // returns { top, left, width, height, bottom, right } values
            const offset = mousePos - bounding.top; // how far down from the top of item until you reach the pointer
            const middle = bounding.height / 2;  // how far down until you reach the center of item

            if (offset < middle) {  // mouse was above the middle of item
                item.parentNode.insertBefore(draggedItem, item);
            } else {    // mouse was below the middle of item
                item.parentNode.insertBefore(draggedItem, item.nextSibling);
            }
            
            draggedItem = null;
        }
    });
});

// 'dragover' = when item is hovering over a potential drop zone (drop zone receives the dragover event)
// the default (not dropping) is prevented, which allows the next event listener ('drop') to function properly
dropLine.addEventListener('dragover', (event) => event.preventDefault());
itemBank.addEventListener('dragover', (event) => event.preventDefault());

// needed for the first item dropped into empty dropLine (or if it's dropped perfectly inbetween two items)
dropLine.addEventListener('drop', (event) => {
    event.preventDefault();     // not needed in this situation, but default is to open the dragged file/element (like dragging a file into a browser)
    if (draggedItem) {  // if there is a valid dragged item (not null)
        dropLine.append(draggedItem);
        draggedItem = null;     // just in case
    }
});
    
itemBank.addEventListener('drop', (event) => {
    event.preventDefault();
    if (draggedItem) {
        itemBank.append(draggedItem);
        draggedItem = null;
    }
});
