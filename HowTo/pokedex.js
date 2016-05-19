

document.addEventListener('DOMContentLoaded', bindButton);

function bindButton() {
	document.getElementById('pokedexSubmit').addEventListener('click', function(event){
		var request = new XMLHttpRequest();

		var pokeID = document.getElementById("pokemonId").value;

		/* Step 2: Make the request */
		request.open("GET", "https://pokeapi.co/api/v2/pokemon/" + pokeID , true);

		/* Step 3: Put our info on the page! */
		request.addEventListener("load", function() {
			if(request.status >= 200 && request.status < 400){
		    	var response = JSON.parse(request.responseText);

		    	var dexEntry = document.createElement("div");
		    	document.body.appendChild(dexEntry);

		    	var sprite = document.createElement("img");
		    	sprite.src = response.sprites.front_default;
		    	dexEntry.appendChild(sprite);

		    	var description = document.createElement("ul");

		    	var name = document.createElement("li");
		    	name.innerText = "Name: " + response.name;
		    	description.appendChild(name);

		    	var type = document.createElement("li");
		    	type.innerHTML = "Type(s): ";
		    	for(var i = 0; i < response.types.length - 1; i++) {
		    		type.innerHTML += response.types[i].type.name + ", ";
		    	}
		    	type.innerHTML += response.types[response.types.length - 1].type.name;
		    	description.appendChild(type);

		    	var height = document.createElement("li");
		    	height.innerHTML = "height: " + response.height;
		    	description.appendChild(height);

		    	var weight = document.createElement("li");
		    	weight.innerHTML = "weight: " + response.weight;
		    	description.appendChild(weight);

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


		 		dexEntry.appendChild(description);

		  	} else {
		      console.log("Error in network request: " + request.statusText);
		    }});   

		request.send(null);
		event.preventDefault();
	})
		
}