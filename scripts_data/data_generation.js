/*--------------------------------------------------------------------------------
----- INPUT STARTING DATA POINTS
--------------------------------------------------------------------------------*/

// Function to initialise data in a global manner, that will serve for all visualisations
function startup_initialise_data() {
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

    /*let promise = fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
    promise.then(response => {
        console.log(response);
        if(response.status == 200) {
            let json_response = response.json();
            return json_response;
        }
    }).then(data => {
        console.log(data);
        console.log(data['types']);
        console.log(data['stats']);

        let pokemon_stats = {
            "hp": 0, "attack": 0, "defense": 0, "special-attack": 0, "special-defense": 0, "speed": 0
        }

        for(let i=0; i<data['stats'].length; i++) {
            let stat_name = data['stats'][i]['stat']['name'];
            pokemon_stats[stat_name] = data['stats'][i]['base_stat']
        }

        document.getElementById('pikachu-hp').innerHTML = JSON.stringify(pokemon_stats['hp']);
        document.getElementById('pikachu-atk').innerHTML = JSON.stringify(pokemon_stats['attack']);
        document.getElementById('pikachu-def').innerHTML = JSON.stringify(pokemon_stats['defense']);
        document.getElementById('pikachu-spa').innerHTML = JSON.stringify(pokemon_stats['special-attack']);
        document.getElementById('pikachu-sdf').innerHTML = JSON.stringify(pokemon_stats['special-defense']);
        document.getElementById('pikachu-spd').innerHTML = JSON.stringify(pokemon_stats['speed']);
    })*/
}

//
function update_data() {
    
}


// 
let POKEMON_DATA = [];
startup_initialise_data();

// 
setInterval(update_data, 2000);
