/*--------------------------------------------------------------------------------
----- POKEMONS RESEARCH LOGIC IMPLEMENTATION
--------------------------------------------------------------------------------*/

//
function display_search_suggestions() {
    // Retrieve the text written in the search bar and convert it to lower case
    let search_bar_content = document.getElementById('search_bar').value.toLowerCase();
    console.log('Searched :', search_bar_content);

    // Compute the first 5 matching suggestions in Pokémon data names matching the search
    let matching_names = [], matching_names_number = 0, current_search_id = 0;
    while(matching_names_number < 5 && current_search_id < POKEMON_SORTED_NAMES.length) {
        if(search_bar_content != "" && POKEMON_SORTED_NAMES[current_search_id].startsWith(search_bar_content)) {
            matching_names.push(POKEMON_SORTED_NAMES[current_search_id]);
            matching_names_number += 1;
        }
        current_search_id += 1;
    }

    // Clear previous suggestions items
    let suggestions_area = document.getElementById('search_suggestions');
    suggestions_area.innerHTML = '';
    
    // Display suggestions based on the current search
    for(let i=0; i<matching_names.length; i++) {
        // Create suggestion item under the search bar
        let suggestion_item = document.createElement('li');
        let displayed_search = '<b>' + search_bar_content.charAt(0).toUpperCase() + search_bar_content.slice(1) + '</b>';
        suggestion_item.innerHTML = displayed_search + matching_names[i].substr(from=search_bar_content.length);
        // Add a click event listener to perform the search when selecting a suggestion
        suggestion_item.addEventListener('click', select_suggestion);
        // Display the suggestion in a list
        suggestions_area.appendChild(suggestion_item);
    }
}

//
function select_suggestion(event) {
    // Retrieve the clicked suggestion with the click event
    let clicked_suggestion = event.target;
    // Retrieve the parent node if we got the bold part of the suggestion
    if(event.target.tagName == "B") {
        clicked_suggestion = event.target.parentNode;
    }

    // Escape the bold tags in the suggestion text to get the complete Pokémon name
    let escaped_suggestion = clicked_suggestion.innerHTML.replace('<b>','').replace('</b>', '');
    // Replace the searched value in the search bar by the complete Pokémon name
    let search_bar_content = document.getElementById('search_bar');
    search_bar_content.value = escaped_suggestion;
    // Hide the previously displayed suggestions
    let suggestions_area = document.getElementById('search_suggestions');
    suggestions_area.innerHTML = '';
    
    // Perform the search with the selected suggested Pokémon
    search_for_pokemon();
}

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


//
const search_bar = document.getElementById('search_bar');
search_bar.addEventListener('keyup', display_search_suggestions);

// Retrieve the search button and map its click behaviour on the research function
const search_button = document.getElementById('search_button');
search_button.addEventListener('click', search_for_pokemon);
