

const selectionList = document.querySelector('.selection-list');
const swapi = 'https://swapi.dev/api';
async function fetchPeople(filter){
    try {
        response = await fetch(swapi + filter);
        data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ', error);
    }
}
let characters = [];
fetchPeople('/people/').then((data) => {
    for(let i = 0; i < data.results.length; i++){
        characters.push(data.results[i]);
    }
}).then(() => {
    addCharactersToDom();
});

console.log(characters)

// click on character in list
const selection = document.querySelector('.selection');
selection.addEventListener('click',(e) => {
    if(e.target.classList.contains('list-item')){
        fetchPeople('/people/' + (e.target.listId + 1) + '/').then((data) => {
            document.querySelector('.char-name').innerText = data.name;
            document.querySelector('.char-height').innerText = 'Height: ' + data.height + 'cm';
            document.querySelector('.char-mass').innerText = 'Mass: ' + data.mass + 'kg';
            document.querySelector('.char-hair').innerText = 'Hair color: ' + data.hair_color;
            document.querySelector('.char-skin').innerText = 'Skin color: ' + data.skin_color;
            document.querySelector('.char-eyes').innerText = 'Eye color: ' + data.eye_color;
            document.querySelector('.char-birth').innerText = 'Year of birth: ' + data.birth_year;
            document.querySelector('.char-gender').innerText = 'Gender: ' + data.gender;
        });
    }/*else if(e.target.classList.contains('left')){
        console.log('clicked on left arrow');
    }else if(e.target.classList.contains('right')){
        console.log('clicked on right arrow');
    }
    */
});

// function will add elements for character list in dom
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

// function for setting character data in current object
function setCurrentCharacterData(i){
    currentCharacter[0].name = characters[i].name;
    currentCharacter[0].mass = characters[i].mass;
    currentCharacter[0].hairColor = characters[i].hair_color;
    currentCharacter[0].skinColor = characters[i].skin_color;
    currentCharacter[0].eyeColor = characters[i].eye_color;
    currentCharacter[0].birthYear = characters[i].birth_year;
    currentCharacter[0].gender = characters[i].gender;

}

