// ========== Add Text Section ==========
const addInput = document.getElementById('text-input');
const addButton = document.getElementById('add-button');
const textContainer = document.getElementById('text-container');
// If there is data in "paragraphs", retrieve it. Otherwise, initialize an empty array
let paragraphs = JSON.parse(localStorage.getItem('paragraphs')) || [];

// ========== Shapes Color Section ==========
const colorContainer = document.getElementById('change-color');
const shapes = document.querySelectorAll('.shape');
let shapeState = JSON.parse(localStorage.getItem('shapes')) || [false, false, false];

// ========== Character Counter ==========
const charCountInput = document.getElementById('char-count-input');
const charDisplay = document.getElementById('char-display');
const saveButton = document.getElementById('save-button');
const saveCheckmark = document.getElementById('saved-checkmark');
let counterText = localStorage.getItem('counterText') || '';

// ========== Habit Checkboxes ==========
const checkboxContainer = document.getElementById('checkboxes');
const allCheckboxes = document.querySelectorAll('.checkbox');
const sleepCheckbox = document.getElementById('get-sleep');
const sleepHoursContainer = document.getElementById('sleep-hours-container');
const sleepHoursInput = document.getElementById('sleep-hours-input');
const pointsDisplay = document.getElementById('habits-points');
const pointsMessage = document.getElementById('points-message');
let checkboxState = JSON.parse(localStorage.getItem('checkboxStates')) || [false, false, false, false, false, false, false];
let totalPoints = parseInt(localStorage.getItem('points')) || 0;

// ========== Rearrange Items ==========
const items = document.querySelectorAll('div.item');
const itemBank = document.getElementById('item-bank');
const dropLine = document.getElementById('drop-line');

// ========== Navagation Bar ==========
const navMenuContainer = document.getElementById('nav-menu');
const navButtonsContainer = document.getElementById('nav-controls');
const navToggle = document.getElementById('nav-toggle');
const themeToggle = document.getElementById('theme-toggle');


// ========== Functions ==========
function addTextToContainer() {
    // Add item to local storage
    if (addInput.value !== '') {    // not empty
        paragraphs.push(addInput.value);
        localStorage.setItem('paragraphs', JSON.stringify(paragraphs));

        displayParagraphs();    // Add elements to page (update everything)    
    }
}

function displayParagraphs() {
    textContainer.textContent = '';
    paragraphs.forEach((item, index) => {
        const addText = document.createElement('p');
        addText.textContent = item;
        addText.setAttribute('data-index', index);     // for removing elements later (set an index)
        addText.classList.add('paragraph');
        textContainer.append(addText);
    });

    addInput.value = '';
}

function displayShapes() {
    shapes.forEach((shape, index) => {
        if (shapeState[index]) shape.classList.add('active');
        else shape.classList.remove('active');
    });
}

function displayCounterText() {
    charCountInput.textContent = counterText;
    charDisplay.textContent = 'Characters: ' + charCountInput.value.length;
}

function displayCheckboxes() {
    allCheckboxes.forEach((box, index) => {
        if (checkboxState[index]) {
            box.checked = true;
        } else box.checked = false;
    });

    updatePoints();
}

function updatePoints() {
    // update points display
    if (sleepCheckbox.checked) pointsDisplay.textContent = totalPoints + parseInt(sleepHoursInput.value);
    else pointsDisplay.textContent = totalPoints;

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
document.addEventListener('DOMContentLoaded', () => {
    displayParagraphs();
    displayShapes();
    displayCounterText();
    displayCheckboxes();
});

addButton.addEventListener('click', addTextToContainer);    // passing in reference to function, not calling it, so no parenthases needed
addInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') addTextToContainer();
});

textContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('paragraph')) { // so you don't delete the div (container)
        // Remove item from local storage
        const indexRemove = event.target.dataset.index;
        paragraphs.splice(indexRemove, 1);
        localStorage.setItem('paragraphs', JSON.stringify(paragraphs));

        // Remove item from user's view
        displayParagraphs();
    }
});

colorContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('shape')) {
        shapeState[event.target.dataset.index] = !shapeState[event.target.dataset.index];
        displayShapes();

        localStorage.setItem('shapes', JSON.stringify(shapeState));
    }
});

charCountInput.addEventListener('input', () => {
    charDisplay.textContent = 'Characters: ' + charCountInput.value.length;
});

saveButton.addEventListener('click', () => {
    counterText = charCountInput.value;
    localStorage.setItem('counterText', counterText);
    saveCheckmark.classList.add('active');

    // delay the following action by 1000 ms (1 sec)
    setTimeout(() => {
        saveCheckmark.classList.remove('active');
    }, '1000');
});

checkboxContainer.addEventListener('change', (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
        totalPoints += parseInt(checkbox.dataset.points); // Convert string into integer
        if (checkbox.id === 'get-sleep') sleepHoursContainer.style.display = 'block';
        checkboxState[checkbox.dataset.index] = true;
    } else if (checkbox.type === 'checkbox') {   // not number input
        totalPoints -= parseInt(checkbox.dataset.points); // Convert string into integer
        if (checkbox.id === 'get-sleep') sleepHoursContainer.style.display = 'none';
        checkboxState[checkbox.dataset.index] = false;
    }
    
    updatePoints();
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxState));
    localStorage.setItem('points', totalPoints);
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

navToggle.addEventListener('click', () => {
    navMenuContainer.classList.toggle('active');
    navButtonsContainer.classList.toggle('active');
});

document.addEventListener('click', (event) => {
    const menuActive = navMenuContainer.classList.contains('active');
    const noClick = event.target.classList.contains('no-click');

    if (menuActive && !noClick) {
        navMenuContainer.classList.toggle('active');
        navButtonsContainer.classList.toggle('active');
    }
});

themeToggle.addEventListener('click', (event) => {
        document.body.classList.toggle('dark-mode');
    if (event.target.textContent === '🔆') {
        event.target.textContent = '⚫';
    } else event.target.textContent = '🔆';
});
