/*--------------------------------------------------------------------------------
----- INPUT STARTING DATA POINTS
--------------------------------------------------------------------------------*/

// Function to initialise data in a global manner, that will serve for all visualisations
function startup_initialise_data() {
    let promise = fetch('https://pokeapi.co/api/v2/pokemon/pikachu');
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
