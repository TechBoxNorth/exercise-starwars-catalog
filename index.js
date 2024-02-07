const swapi = 'https://swapi.dev/api/';
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
    console.log(data);
});