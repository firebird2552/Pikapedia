//Library imports
import axios from 'axios'

// custom imports

//functional react component
export const GetPokemonList = async (generation) => {
    let pokemonList = {}
    if (typeof (generation) === Array) {

    } else if (typeof (generation) === "number") {
        console.error(generation)
        let generationPromise = axios.get(`https://pokeapi.co/api/v2/pokedex/${generation}/`)
        // .then(response => {
        //     pokemonList = response.data.pokemon_entries
        // }
        //     , (error => {
        //         console.log(error)
        //     }))
        let generationDetails = await generationPromise
        pokemonList = generationDetails.data.pokemon_entries

    }

    return pokemonList
}

export const GetPokemonDetails = async (pokemon) => {
    try {

        let pokemonPromise = axios.get(pokemon.url)
        let pokemonDetails = await pokemonPromise
        pokemon = pokemonDetails.data

        pokemonPromise = axios.get(pokemon.varieties[0].pokemon.url)
        // .then(response => {
        //     pokemon.varieties[0].pokemon = response.data
        // }
        //     , (error => {
        //         console.log(error)
        //     }))

        pokemonDetails = await pokemonPromise
        pokemon.varieties[0].pokemon = pokemonDetails.data

        // console.log(`pikapedia.net -> GetPokemonDetails -> pokemon: ${JSON.stringify(pokemon)} \n`)
    } catch (err) {
        console.log(err)
    } finally {
        return pokemon

    }
}