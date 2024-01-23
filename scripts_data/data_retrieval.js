/*--------------------------------------------------------------------------------
----- RETRIEVED DATA INFORMATION ABOUT POKEMONS
--------------------------------------------------------------------------------*/

// 
function retrieve_pokemon_data() {
    // First API call to retrieve the list of every Pokémon
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0').then(response => {
        if(response.status == 200) {
            let json_response = response.json();
            return json_response;
        }
    }).then(data => {
        // Once we got the list of every Pokémon, we can iterate over them to retrieve more information
        for(let pokemon_id=1; pokemon_id<=data['results'].length; pokemon_id++) {
            // Retrieve the current Pokémon name
            let pokemon_name = data['results'][pokemon_id-1]['name'];
            // Second API call to retrieve for a single Pokémon many information, especially its base statistics
            fetch(data['results'][pokemon_id-1]['url']).then(response => {
                if(response.status == 200) {
                    let json_response = response.json();
                    return json_response;
                }
            }).then(pokemon_data => {
                // Retrieve the base statistics of the current Pokémon
                let pokemon_stats = pokemon_data['stats'];
                // Build the complete Pokémon data object with retrieved information
                let current_pokemon_data = {
                    'ID': pokemon_id,
                    'Name': pokemon_name,
                    'Stats': {
                        'HP':               pokemon_stats[0]['base_stat'],
                        'Attack':           pokemon_stats[1]['base_stat'],
                        'Defense':          pokemon_stats[2]['base_stat'],
                        'Special Attack':   pokemon_stats[3]['base_stat'],
                        'Special Defense':  pokemon_stats[4]['base_stat'],
                        'Speed':            pokemon_stats[5]['base_stat'],
                    }
                };
                // Save the current Pokémon retrieved information within a global list
                POKEMON_DATA.push(current_pokemon_data);
            });
        }
    }).then(() => {
        console.log(POKEMON_DATA);
    });
}


// 
let POKEMON_DATA = [];
retrieve_pokemon_data();
