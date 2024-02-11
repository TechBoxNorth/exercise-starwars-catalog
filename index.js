

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

let planetApi = '';
async function fetchPlanet(planetApi){
    try {
        response = await fetch(planetApi);
        planet = await response.json();
        return planet;
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
const charList = document.querySelector('.selection-list').children;
selection.addEventListener('click',(e) => {
    if(e.target.classList.contains('list-item')){
        displayCharacterData(e);
        for(let i = 0; i < charList.length; i++){
            if(charList[i].listId === e.target.listId){
                charList[i].style.backgroundColor = 'var(--border)';
                charList[i].selected = true;
            } else {
                charList[i].style.backgroundColor = charList[i].bgc;
                charList[i].selected = false;
            }
        }
    } else if(e.target.classList.contains('left')){
        console.log('clicked on left arrow');
        for(let i = 0; i < charList.length; i++) {
            if(charList[i].selected && i > 0){
                displayNextPrevCharData(charList[i - 1].listId);
                charList[i - 1].style.backgroundColor = 'var(--border)';
                charList[i - 1].selected = true;
                charList[i].style.backgroundColor = charList[i].bgc;
                charList[i].selected = false;
            }
        }
    }else if(e.target.classList.contains('right')){
        console.log('clicked on right arrow');
        for(let i = 0; i < charList.length; i++) {
            if(charList[i].selected && i < charList.length - 1){
                charList[i].style.backgroundColor = charList[i].bgc;
                charList[i].selected = false;
                charList[i + 1].style.backgroundColor = 'var(--border)';
                charList[i + 1].selected = true;
                displayNextPrevCharData(charList[i + 1].listId);
                //console.log(charList[i + 1]);
                return
            }
        }
    }
});

// function will add elements for character list in dom
function addCharactersToDom(){
    for(let i = 0; i < characters.length; i++) {
        let person = document.createElement('div');
        person.classList.add('list-item');
        person.listId = i;
        person.selected = false;
        person.innerText = characters[i].name;
        if(i % 2 === 0){
            person.bgc = 'var(--even-character)';
            person.style.backgroundColor = person.bgc;
            person.style.color = 'black';
        } else {
            person.bgc = 'var(--odd-character)';
            person.style.backgroundColor = person.bgc;
            person.style.color = 'white';
        }
        
        selectionList.appendChild(person);
    }
}

// function for setting character data in dom
function displayCharacterData(e){
    fetchPeople('/people/' + (e.target.listId + 1) + '/').then((data) => {
        document.querySelector('.char-name').innerText = data.name;
        document.querySelector('.char-height').innerText = 'Height: ' + data.height + 'cm';
        document.querySelector('.char-mass').innerText = 'Mass: ' + data.mass + 'kg';
        document.querySelector('.char-hair').innerText = 'Hair color: ' + data.hair_color;
        document.querySelector('.char-skin').innerText = 'Skin color: ' + data.skin_color;
        document.querySelector('.char-eyes').innerText = 'Eye color: ' + data.eye_color;
        document.querySelector('.char-birth').innerText = 'Year of birth: ' + data.birth_year;
        document.querySelector('.char-gender').innerText = 'Gender: ' + data.gender;
        planetApi = data.homeworld;
        console.log(planetApi);
        displayPlanetData(planetApi);
    });
}

function displayNextPrevCharData(listId){
    fetchPeople('/people/' + (listId + 1) + '/').then((data) => {
        document.querySelector('.char-name').innerText = data.name;
        document.querySelector('.char-height').innerText = 'Height: ' + data.height + 'cm';
        document.querySelector('.char-mass').innerText = 'Mass: ' + data.mass + 'kg';
        document.querySelector('.char-hair').innerText = 'Hair color: ' + data.hair_color;
        document.querySelector('.char-skin').innerText = 'Skin color: ' + data.skin_color;
        document.querySelector('.char-eyes').innerText = 'Eye color: ' + data.eye_color;
        document.querySelector('.char-birth').innerText = 'Year of birth: ' + data.birth_year;
        document.querySelector('.char-gender').innerText = 'Gender: ' + data.gender;
        planetApi = data.homeworld;
        console.log(planetApi);
        displayPlanetData(planetApi);
    });
}

function displayPlanetData(planetApi){
    fetchPlanet(planetApi).then((planet) => {
        console.log(planet);
        document.querySelector('.planet-name').innerText = planet.name;
        document.querySelector('.planet-rotation').innerText = 'Rotation period: ' + planet.rotation_period + ' hours';
        document.querySelector('.planet-orbit').innerText = 'Orbital period: ' + planet.orbital_period + ' days';
        document.querySelector('.planet-diameter').innerText = 'Diameter: ' + planet.diameter + ' kilometers';
        document.querySelector('.planet-climate').innerText = 'Climate: ' + planet.climate;
        document.querySelector('.planet-gravity').innerText = 'Gravity: ' + planet.gravity;
        document.querySelector('.planet-terrain').innerText = 'Terrain: ' + planet.terrain;
    });
}

