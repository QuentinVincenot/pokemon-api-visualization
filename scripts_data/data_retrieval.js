/*--------------------------------------------------------------------------------
----- RETRIEVED DATA INFORMATION ABOUT POKEMONS
--------------------------------------------------------------------------------*/

// Function to retrieve data about Pokémons (names, types, stats, images, etc.)
async function retrieve_pokemon_data() {
    // Disable the search bar while data is completely retrieved from the API
    document.getElementById('search_bar').disabled = true;
    document.getElementById('search_bar').style.backgroundColor = "#CCC";

    // First API call to retrieve the list of every Pokémon
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    let data = await response.json();

    // Once we got the list of every Pokémon, we can iterate over them to retrieve more information
    for(let pokemon_id=1; pokemon_id<=data['results'].length; pokemon_id++) {
        // Retrieve the current Pokémon name
        let pokemon_name = data['results'][pokemon_id-1]['name'];
        
        // Second API call to retrieve for a single Pokémon many information, especially its base statistics
        let response2 = await fetch(data['results'][pokemon_id-1]['url']);
        let pokemon_data = await response2.json();

        // Retrieve the types of the current Pokémon
        let pokemon_types = pokemon_data['types'];
        let first_type = pokemon_types[0]['type']['name'];
        let second_type = null;
        // Process the case where the Pokémon has two types
        if(pokemon_types.length == 2) {
            second_type = pokemon_types[1]['type']['name'];
        }

        // Retrieve the base statistics of the current Pokémon
        let pokemon_stats = pokemon_data['stats'];
        // Build the complete Pokémon data object with retrieved information
        let current_pokemon_data = {
            'ID': pokemon_id,
            'Name': pokemon_name,
            'Type 1': first_type,
            'Type 2': second_type,
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
    }

    // Put every Pokémon names in a single and sorted list to display suggestions on search
    for(let i=0; i<POKEMON_DATA.length; i++) {
        POKEMON_SORTED_NAMES.push(POKEMON_DATA[i]['Name'].toLowerCase());
    }
    POKEMON_SORTED_NAMES.sort();

    // Reactivate the search bar while the data retrieval process is finished
    document.getElementById('search_bar').disabled = false;
    document.getElementById('search_bar').style.backgroundColor = "#FFF";
}


// Call the data retrieval function to get intitial Pokémon data from online source (pokeapi.co)
let POKEMON_DATA = [], POKEMON_SORTED_NAMES = [];
retrieve_pokemon_data();
