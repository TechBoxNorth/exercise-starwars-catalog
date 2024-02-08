let characters = [];
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

function addCharactersToDom(){
    for(let i = 0; i < characters.length; i++) {
        let person = document.createElement('div');
        person.classList.add('list-item');
        person.innerText = characters[i].name;
        if(i % 2 === 0){
            person.style.backgroundColor = 'red';
        } else {
            person.style.backgroundColor = 'blue';
        }
        
        selectionList.appendChild(person);
    }
}