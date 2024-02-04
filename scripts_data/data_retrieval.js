/*--------------------------------------------------------------------------------
----- RETRIEVED DATA INFORMATION ABOUT POKEMONS
--------------------------------------------------------------------------------*/

// Function to retrieve data about Pokémons (names, types, stats, images, etc.)
async function retrieve_pokemon_data() {
    // Disable the search bar while data is completely retrieved from the API
    document.getElementById('search_bar').value = '';
    document.getElementById('search_bar').disabled = true;
    document.getElementById('search_bar').style.backgroundColor = "#CCC";
    // Disable search and clear buttons for the same reason at the page loading phase
    document.getElementById('search_button').disabled = true;
    document.getElementById('clear_button').disabled = true;

    // First API call to retrieve the list of every Pokémon
    let response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0');
    let data = await response.json();

    // Once we got the list of every Pokémon, we can iterate over them to retrieve more information
    for(let pokemon_id=1; pokemon_id<=data['results'].length; pokemon_id++) {
        // Retrieve the current Pokémon name
        let pokemon_name = data['results'][pokemon_id-1]['name'];

        // Retrieve the URL to make a second call later and retrieve the Pokémon information
        let pokemon_url = data['results'][pokemon_id-1]['url'];
        
        // Build the complete Pokémon data object with retrieved information and placeholders
        let current_pokemon_data = {
            'ID': pokemon_id,
            'Name': pokemon_name,
            'Type 1': undefined,
            'Type 2': undefined,
            'Image': undefined,
            'Stats': {
                'HP':               undefined,
                'Attack':           undefined,
                'Defense':          undefined,
                'Special Attack':   undefined,
                'Special Defense':  undefined,
                'Speed':            undefined,
            },
            'URL': pokemon_url
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
