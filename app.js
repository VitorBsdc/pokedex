//get da url da api
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

//array responsável por armazenar os 150 pokemons
const generatePokemonPromises = () => Array(150).fill().map((_, index) => 
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

//código formador do html
const generateHTML = pokemons => pokemons.reduce((accumulator, { name, id, types }) => {
    const elementTypes = types.map(typeInfo => typeInfo.type.name)

    accumulator += `
        <li class="card ${elementTypes[0]}">
        <img class="card-image" alt="${name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg"/>
            <h2 class="card-title">${id}. ${name}</h2>
            <p class="card-subtitle">${elementTypes.join(' | ')}</p>
        </li>
    `
    return accumulator
}, '')

//responsável por exibir no front
const insertPokemonsIntoPage = pokemons => {
    const ul = document.querySelector('[data-js="pokedex"]')
    ul.innerHTML = pokemons
}

//Todas as const anteriores sendo usadas na seguinte promise
const pokemonPromises = generatePokemonPromises()

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
