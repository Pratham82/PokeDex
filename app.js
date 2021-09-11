const pokeContainer = document.querySelector(".pokemon-container");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input[type=text]");

console.log(inputEl);

formEl.addEventListener("submit", (e) => {
	e.preventDefault();
	pokeContainer.innerHTML = "";
	getPokemon(inputEl.value.toLowerCase());
});

const colors = {
	fire: "#FDDFDF",
	grass: "#DEFDE0",
	electric: "#FCF7DE",
	water: "#DEF3FD",
	ground: "#f4e7da",
	rock: "#d5d5d4",
	fairy: "#fceaff",
	poison: "#98d7a5",
	bug: "#f8d5a3",
	dragon: "#97b3e6",
	psychic: "#eaeda1",
	flying: "#F5F5F5",
	fighting: "#E6E0D4",
	normal: "#F5F5F5",
};

const main_types = Object.keys(colors);

async function getPokemon(name = "charizard") {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
	const pokemon = await res.json();

	console.log(pokemon);
	const pokeEl = document.createElement("div");
	pokeEl.classList.add("pokemon");
	const poke_types = pokemon.types.map((type) => type.type.name);
	const type = main_types.find((type) => poke_types.indexOf(type) > -1);
	const name1 = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];

	pokeContainer.style.backgroundColor = color;

	pokeEl.innerHTML = `
    <div class="info">
      <img src=`${pokemon.sprites.front_default}` width="200">
<h2>${pokemon.name}</h2>
    </div>

    <div class="stats">
      ${pokemon.stats
			.map((stat) => {
				return `<p>${stat.stat.name.toUpperCase()}: ${
					stat.base_stat
				}</p>`;
			})
			.join("")}
	</div>
	<div class="type">
	${pokemon.types
		.map((type) => {
			return `<p> Type: ${type.type.name} </p>`;
		})
		.join("")}
		
	</div>
  `;
	// pokeContainer.style.backgroundColor = ;
	pokeContainer.appendChild(pokeEl);
}

getPokemon();
console.log(pokeContainer);

removePokemon = (pokeEl) => {
	pokeContainer.remove(pokeEl);
};
