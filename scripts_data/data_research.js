/*--------------------------------------------------------------------------------
----- POKEMONS RESEARCH LOGIC IMPLEMENTATION
--------------------------------------------------------------------------------*/

//
function search_for_pokemon() {
    // Retrieve the text written in the search bar and convert it to lower case
    let search_bar_content = document.getElementById('search_bar').value.toLowerCase();

    // Filter the complete Pokémon information data to find the searched name
    let found_pokemons = POKEMON_DATA.filter(pokemon => pokemon['Name'] === search_bar_content);
    display_searched_pokemon_data(found_pokemons);
}

// 
function display_searched_pokemon_data(pokemon_array) {
    if(pokemon_array.length != 1) {
        // Erase everything that was displayed before when no Pokémon has been found
        document.getElementById('pokemon_name').innerHTML = ''
        document.getElementById('pokemon_types').innerHTML = ''
        document.getElementById('pokemon_image').innerHTML = ''
        document.getElementById('pokemon_stats').innerHTML = ''
    } else {
        // Extract the Pokémon data from the search resulting object
        const pokemon_data = pokemon_array[0];
        // Display the Pokémon data into the dedicated space for search result
        document.getElementById('pokemon_name').innerHTML = pokemon_data['Name'].toString();
        document.getElementById('pokemon_types').innerHTML = ''
        document.getElementById('pokemon_image').innerHTML = ''
        document.getElementById('pokemon_stats').innerHTML = JSON.stringify(pokemon_data['Stats'])
    }
}

// Retrieve the search button and map its click behaviour on the research function
const search_button = document.getElementById('search_button');
search_button.addEventListener('click', search_for_pokemon);
