/*--------------------------------------------------------------------------------
----- POKEMONS RESEARCH LOGIC IMPLEMENTATION
--------------------------------------------------------------------------------*/

// Function to hide the displayed search suggestions
function hide_search_suggestions(event) {
    // Clear every existing suggestions items to hide them
    let suggestions_area = document.getElementById('search_suggestions');
    suggestions_area.innerHTML = '';
}

// Function to display search suggestions based on the search bar current content
function display_search_suggestions() {
    // Retrieve the text written in the search bar and convert it to lower case
    let search_bar_content = document.getElementById('search_bar').value.toLowerCase();
    // Enable/disable search/clear buttons depending on the current search content
    let search_bar_empty = (search_bar_content.length == 0);
    document.getElementById('search_button').disabled = search_bar_empty;
    document.getElementById('clear_button').disabled = !POKEMON_IS_DISPLAYED;

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
    hide_search_suggestions();
    
    // Display suggestions based on the current search
    for(let i=0; i<matching_names.length; i++) {
        // Create suggestion item under the search bar
        let suggestion_item = document.createElement('li');
        let displayed_search = '<b>' + search_bar_content.charAt(0).toUpperCase() + search_bar_content.slice(1) + '</b>';
        suggestion_item.innerHTML = displayed_search + matching_names[i].substr(from=search_bar_content.length);
        // Add a click event listener to perform the search when selecting a suggestion
        suggestion_item.addEventListener('click', select_suggestion);
        // Display the suggestion in a list
        let suggestions_area = document.getElementById('search_suggestions');
        suggestions_area.appendChild(suggestion_item);
    }
}

// Function the trigger the search when selecting a search suggestion
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
    hide_search_suggestions();
    
    // Perform the search with the selected suggested Pokémon
    search_for_pokemon();
}



// Function to search and filter for a specific Pokémon through the search bar
function search_for_pokemon() {
    // Retrieve the text written in the search bar and convert it to lower case
    let search_bar_content = document.getElementById('search_bar').value.toLowerCase();

    // Filter the complete Pokémon information data to find the searched name
    let found_pokemons = POKEMON_DATA.filter(pokemon => pokemon['Name'] === search_bar_content);
    display_searched_pokemon_data(found_pokemons);
}

// Function to clear search results and previously displayed Pokémon information
function clear_search_results() {
    // Clear the content of the complete Pokémon information zone and subzones
    document.getElementById('pokemon_name_container').innerHTML = '';
    document.getElementById('pokemon_types_container').innerHTML = '';
    document.getElementById('pokemon_image_container').innerHTML = '';
    document.getElementById('pokemon_stats_container').innerHTML = '';
    // Disable the clear button once a clearing operation has been done
    POKEMON_IS_DISPLAYED = false;
    document.getElementById('clear_button').disabled = !POKEMON_IS_DISPLAYED;
}



// Function to request a specific Pokémon more detailed information to the PokéAPI
async function request_pokemon_data(selected_pokemon) {
    // Second API call to retrieve for the searched Pokémon many information, especially its base statistics
    let response = await fetch(selected_pokemon['URL']);
    let pokemon_data = await response.json();

    // Retrieve the types of the current Pokémon
    let pokemon_types = pokemon_data['types'];
    let first_type = pokemon_types[0]['type']['name'];
    let second_type = null;
    // Process the case where the Pokémon has two types
    if(pokemon_types.length == 2) {
        second_type = pokemon_types[1]['type']['name'];
    }

    // Retrieve the Pokémon official artwork from Pokémon Home
    let pokemon_image = pokemon_data['sprites']['other']['home']['front_default'];

    // Retrieve the base statistics of the current Pokémon
    let pokemon_stats = pokemon_data['stats'];

    // Retrieve the initial global Pokémon dictionary and update its content with retrieved data
    let pokemon_index = POKEMON_DATA.indexOf(selected_pokemon);
    POKEMON_DATA[pokemon_index]['Type 1'] = first_type;
    POKEMON_DATA[pokemon_index]['Type 2'] = second_type;
    POKEMON_DATA[pokemon_index]['Image'] = pokemon_image;
    POKEMON_DATA[pokemon_index]['Stats'] = {
        'HP':               pokemon_stats[0]['base_stat'],
        'Attack':           pokemon_stats[1]['base_stat'],
        'Defense':          pokemon_stats[2]['base_stat'],
        'Special Attack':   pokemon_stats[3]['base_stat'],
        'Special Defense':  pokemon_stats[4]['base_stat'],
        'Speed':            pokemon_stats[5]['base_stat'],
    };
}

// Function to display the complete information page of a searched Pokémon
async function display_searched_pokemon_data(pokemon_array) {
    if(pokemon_array.length != 1) {
        // Erase everything that was displayed before when no Pokémon has been found
        clear_search_results();
    } else {
        // Extract the Pokémon data from the search resulting object
        const pokemon_data = pokemon_array[0];

        // Request more detailed information about the searched Pokémon to the API
        await request_pokemon_data(pokemon_data);

        // Display the Pokémon data into the dedicated space for search result
        let capitalized_pokemon_name = pokemon_data['Name'].substr(0, 1).toUpperCase() + pokemon_data['Name'].slice(1);
        document.getElementById('pokemon_name_container').innerHTML = capitalized_pokemon_name;

        // Format and display the Pokémon types (one or two)
        let formatted_pokemon_types = '<img src="images/pokemon-types/type_' + pokemon_data['Type 1'] + '_bulbapedia.png" style="width:120px;"/>';
        if(pokemon_data['Type 2'] !== null) {
            formatted_pokemon_types += '<img src="images/pokemon-types/type_' + pokemon_data['Type 2'] + '_bulbapedia.png" style="width:120px;"/>';
        }
        document.getElementById('pokemon_types_container').innerHTML = formatted_pokemon_types;

        // Format and display the official image of the Pokémon
        let formatted_pokemon_image = '<img src=' + pokemon_data['Image'] + ' style="width:230px;"/>';
        document.getElementById('pokemon_image_container').innerHTML = formatted_pokemon_image;
        
        // Format and display the various statistics of the Pokémon
        document.getElementById('pokemon_stats_container').innerHTML = '';
        let statistics = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'];
        let formatted_pokemon_stats_table = document.createElement('table');
        for(let i=0; i<statistics.length; i++) {
            // Create a new row for the current statistic
            let stat_row = document.createElement('tr');
            // Create a new cell for the current statistic name
            let stat_name_cell = document.createElement('td');
            stat_name_cell.innerHTML = statistics[i];
            stat_row.appendChild(stat_name_cell);

            // Create a new cell for the current statistic value
            let stat_value_cell = document.createElement('td');
            let stat_value_div = document.createElement('div');
            stat_value_div.style['width'] = '' + Math.round((pokemon_data['Stats'][statistics[i]] * 0.85)) + 'px';
            stat_value_div.style['background-color'] = '#89CFF0';
            stat_value_div.style['border-radius'] = '10px';
            stat_value_div.style['padding-left'] = '5px';
            stat_value_div.innerHTML = pokemon_data['Stats'][statistics[i]];
            stat_value_cell.appendChild(stat_value_div);
            stat_row.appendChild(stat_value_cell);

            // Add the current statistic row to the Pokémon statistics table
            formatted_pokemon_stats_table.appendChild(stat_row);
        }
        // Add the complete statistics table to the Pokémon page
        document.getElementById('pokemon_stats_container').appendChild(formatted_pokemon_stats_table);
        
        // Hide the previously displayed suggestions
        hide_search_suggestions();

        // Enable the clear button once a Pokémon has been displayed
        POKEMON_IS_DISPLAYED = true;
        document.getElementById('clear_button').disabled = !POKEMON_IS_DISPLAYED;
    }
}



// Information whether a Pokémon is currently displayed or not
let POKEMON_IS_DISPLAYED = false;

// Retrieve the search bar and map its behaviour with the suggestions display function
const search_bar = document.getElementById('search_bar');
search_bar.addEventListener('keyup', display_search_suggestions);

// Retrieve the search button and map its click behaviour on the research function
const search_button = document.getElementById('search_button');
search_button.addEventListener('click', search_for_pokemon);

// Retrieve the clear button and map its click behaviour on the clear function
const clear_button = document.getElementById('clear_button');
clear_button.addEventListener('click', clear_search_results);
