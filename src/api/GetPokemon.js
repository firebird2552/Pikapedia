//Library imports
import axios from 'axios'

// custom imports

//functional react component
export const GetPokemonList = async (generation) => {
    let pokemonList = {}
    if (typeof (generation) === Array) {

    } else if (typeof (generation) === "number") {
        await axios.get(`https://pokeapi.co/api/v2/pokedex/${generation}/`)
            .then(response => {
                pokemonList = response.data.pokemon_entries
            }
                , (error => {
                    console.log(error)
                }))

    }

    return pokemonList
}

export const GetPokemonDetails = async (pokemon) => {
    await axios.get(pokemon.url).then(response => {
        pokemon = response.data

    })
    await axios.get(pokemon.varieties[0].pokemon.url)
        .then(response => {
            pokemon.varieties[0].pokemon = response.data
        }
            , (error => {
                console.log(error)
            }))
    return pokemon

}