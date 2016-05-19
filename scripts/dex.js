
document.getElementById("menubtn").addEventListener("click", toggleMenu);

function toggleMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('#menubtn') && !event.target.matches('.dropdown-content show')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

/* Attach our funciton to our submit button */
document.addEventListener('DOMContentLoaded', bindButton);

/* Bind our function to our form button */
function bindButton() {
	document.getElementById('pokedexSubmit').addEventListener('click', function(event){

		/*Make the response object */
		var request = new XMLHttpRequest();

		/* The value we obtain from the form */
		var pokeID = document.getElementById("pokemonId").value;

		/* Step 2: Make the request */
		request.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokeID , true);

		/* Step 3: Put our info on the page! */
		request.addEventListener("load", function() {
			if(request.status >= 200 && request.status < 400){

				/* Get our JSON object */
		    	var response = JSON.parse(request.responseText);

		    	/* Create our Pokedex Entry and append it to the page!*/
		    	var dexEntry = document.createElement("div");
		    	document.getElementById("result").appendChild(dexEntry);

		    	/* Get the sprite of the pokemon */
		    	var sprite = document.createElement("img");
		    	sprite.src = response.sprites.front_default;
		    	dexEntry.appendChild(sprite);

		    	/* Create a list of all the attributes */
		    	var description = document.createElement("ul");

		    	/* Get the pokemon's name */
		    	var name = document.createElement("li");
		    	name.innerText = "Name: " + response.name;
		    	description.appendChild(name);

		    	/* Get the pokemon's height */
		    	var height = document.createElement("li");
		    	height.innerHTML = "height: " + response.height;
		    	description.appendChild(height);

		    	/* Get the pokemon's weight */
		    	var weight = document.createElement("li");
		    	weight.innerHTML = "weight: " + response.weight;
		    	description.appendChild(weight);

		    	/* Get the pokemon's types! */
		    	var type = document.createElement("li");
		    	type.innerHTML = "Type(s): ";
		    	for(var i = 0; i < response.types.length - 1; i++) {
		    		type.innerHTML += response.types[i].type.name + ", ";
		    	}
		    	type.innerHTML += response.types[response.types.length - 1].type.name;
		    	description.appendChild(type);

		    	/* Make a list of all the pokemon's base stats */
		    	var statsList = document.createElement("li");
		    	statsList.innerHTML = "Base Stats: ";
		    	var stats = document.createElement("ul");
		    	statsList.appendChild(stats);
		    	description.appendChild(statsList);
		    	var statsArr = response.stats;
		    	for(var j = 0; j < statsArr.length; j++) {
		    		var nextStat = document.createElement("li");
		    		var name = statsArr[j].stat.name;
		    		var value = statsArr[j].base_stat;

		    		nextStat.innerHTML = name + ": " + value;
		    		stats.appendChild(nextStat);
		    	}

		    	/* Append our list of attributes to our pokedex entry */ 
		 		dexEntry.appendChild(description);

		  	} else {
		  		/* our request failed! Let the user know! */
		    	console.log("Error in network request: " + request.statusText);
		    }});   

		request.send(null);
		event.preventDefault();
	})
		
}