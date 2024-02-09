let characters = [];
let currentCharacter = [
    character = {
        name: 'name',
        mass: '00kg',
        hairColor: 'bald',
        skinColor: 'albino',
        eyeColor: 'transparent',
        birthYear: '00BBY',
        gender: 'mixed'
    },
    planet = {
        name: 'death star',
        rotation: '3 minutes',
        orbit: '5 days',
        diameter: '151515km',
        climate: 'polar',
        gravity: '0.23 standard',
        terrain: 'asphalt'
    }
];
console.log(currentCharacter[0].hairColor);
const selectionList = document.querySelector('.selection-list');
const swapi = 'https://swapi.dev/api';
async function fetchPeople(){
    try {
        response = await fetch(swapi + '/people/');
        data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ', error);
    }
}

fetchPeople().then((data) => {
    for(let i = 0; i < data.results.length; i++){
        characters.push(data.results[i]);
    }
    console.log(characters);
}).then(() => {
    addCharactersToDom();
});

const selection = document.querySelector('.selection');
selection.addEventListener('click',(e) => {
    
    if(e.target.classList.contains('list-item')){
        console.log(characters[e.target.listId].name);
    }/*else if(e.target.classList.contains('left')){
        console.log('clicked on left arrow');
    }else if(e.target.classList.contains('right')){
        console.log('clicked on right arrow');
    }
    */
});

function addCharactersToDom(){
    for(let i = 0; i < characters.length; i++) {
        let person = document.createElement('div');
        person.classList.add('list-item');
        person.listId = i;
        person.innerText = characters[i].name;
        if(i % 2 === 0){
            person.style.backgroundColor = 'var(--even-character)';
            person.style.color = 'black';
        } else {
            person.style.backgroundColor = 'var(--odd-character)';
            person.style.color = 'white';
        }
        
        selectionList.appendChild(person);
    }
}