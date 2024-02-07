let characters = [];

const swapi = 'https://swapi.dev/api/people/';
async function fetchSwapi(){
    try {
        response = await fetch(swapi);
        data = await response.json();
        return data;
    } catch (error) {
        console.log('Error: ', error);
    }
}

fetchSwapi().then((data) => {
    console.log(data.results[1].name);
    for(let i = 0; i < data.results.length; i++){
        console.log(data.results[i].name);
        characters.push(data.results[i]);
    }
});
