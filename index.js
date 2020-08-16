const dogs = []

main();

async function main() {
    await loadDogs();
    displayDogs();
    document.getElementById('dog-save')
        .addEventListener('click', saveDog);
}

async function loadDogs() {
    const response = await fetch('/api/dogs');
    const retrievedData = await response.json();
    const retrievedDogs = retrievedData.dogs;
    for (let dog of retrievedDogs) {
        dogs.push(dog);
    }
}

function displayDogs() {
    for (let dog of dogs) {
        addDogToDisplay(dog);
    }
}

function addDogToDisplay(dog) {
    const dogItem = document.createElement('a');
    dogItem.href = '#';
    dogItem.innerText = dog.name;
    dogItem.className = 'list-group-item';

    const dogsListUI = document.getElementById('dog-list');
    dogsListUI.appendChild(dogItem);
}

async function saveDog() {
    const name = document.getElementById('dog-name').value;
    const dog = { name };

    const response = await fetch(
        '/api/dogs',
        {
            method: 'POST',
            body: JSON.stringify(dog),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    const retrievedDog = await response.json();
    dogs.push(retrievedDog);
    addDogToDisplay(retrievedDog);
}