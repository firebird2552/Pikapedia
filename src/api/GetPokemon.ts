//Library imports
import axios from 'axios'
import { IPokemon } from '../support/PokemonInterfaces'
import { IGeneration } from '../support/GenerationInterfaces'

// custom imports

//functional react component
// export const GetPokemonList = async (generation:IGeneration) => {
//     let pokemonList = {}
//     if (typeof (generation) === Array) {

//     } else if (typeof (generation) === "number") {
//         console.error(generation)
//         let generationPromise = axios.get(`https://pokeapi.co/api/v2/pokedex/${generation}/`)
//         // .then(response => {
//         //     pokemonList = response.data.pokemon_entries
//         // }
//         //     , (error => {
//         //         console.log(error)
//         //     }))
//         let generationDetails = await generationPromise
//         // console.log(`api -> GetPokemonList -> Generation: ${generation} - Generation Details: ${JSON.stringify(generationDetails)}`)
//         pokemonList = generationDetails.data.pokemon_entries

//     }

//     return pokemonList
// }
const getPokemonImage = async (imageURL:string) => {
    let imagePromise = axios.get(imageURL, { responseType: 'arraybuffer' })
    let localImage = await imagePromise
    let imageString = Buffer.from(localImage.data, 'binary').toString('base64')
    return imageString
    
}

// export const GetPokemonDetails = async (pokemon: IPokemon) => {
//     try {

//         let pokemonPromise = axios.get(pokemon)
//         let pokemonDetails = await pokemonPromise
//         pokemon = pokemonDetails.data

//         pokemonPromise = axios.get(pokemon.varieties[0].pokemon.url)
//         // .then(response => {
//         //     pokemon.varieties[0].pokemon = response.data
//         // }
//         //     , (error => {
//         //         console.log(error)
//         //     }))

//         pokemonDetails = await pokemonPromise
//         let imageURL = pokemonDetails.data.sprites.other['official-artwork'].front_default

//         pokemonDetails.data.sprites.other['official-artwork'].front_default = getPokemonImage(imageURL)
//         pokemon.varieties[0].pokemon = pokemonDetails.data

//         // console.log(`pikapedia.net -> GetPokemonDetails -> pokemon: ${JSON.stringify(pokemon)} \n`)
//     } catch (err) {
//         console.log(err)
//     } finally {
//         return pokemon

//     }
// }