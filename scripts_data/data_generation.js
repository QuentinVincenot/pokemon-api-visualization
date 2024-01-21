/*--------------------------------------------------------------------------------
----- INPUT STARTING DATA POINTS
--------------------------------------------------------------------------------*/

// Function to initialise data in a global manner, that will serve for all visualisations
function startup_initialise_data() {
    let promise = fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur');
    promise.then(response => {
        console.log(response);
        if(response.status == 200) {
            let json_response = response.json();
            return json_response;
        }
    }).then(data => {
        console.log(data);
        console.log(data['types'])
    })
}

//
function update_data() {
    
}


// 
let POKEMON_DATA = [];
startup_initialise_data();

// 
setInterval(update_data, 2000);
