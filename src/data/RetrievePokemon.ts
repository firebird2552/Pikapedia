
import { setup } from 'axios-cache-adapter'
import { IGeneration } from '../support/GenerationInterfaces'
/*
 * Structure of local file
 * Pokemon = {
 *    Kanto = []
 *    Johto = []
 *    Hoenn = []
 *    Sinnoh = []
 *    Unova = []
 *    Kalos = []
 *    Alola = []
 *    Galar = []
 *  }
*/

const generation = ["Kanto", "Johto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar", "Paldea"]
const api = setup({
    cache: {
        maxAge: 15 * 60 * 1000
    }
})


const pokemonGenerations = {
    "Kanto": {
        url: "https://pokeapi.co/api/v2/generation/1/",
        name: "Kanto"
    },
    "Johto": {
        url: "https://pokeapi.co/api/v2/generation/2/",
        name: "Johto"
    },

    "Hoenn": {
        url: "https://pokeapi.co/api/v2/generation/3/",
        name: "Hoenn"
    },

    "Sinnoh": {
        url: "https://pokeapi.co/api/v2/generation/4/",
        name: "Sinnoh"
    },

    "Unova": {
        url: "https://pokeapi.co/api/v2/generation/5/",
        name: "Unova"
    },

    "Kalos": {
        url: "https://pokeapi.co/api/v2/generation/6/",
        name: "Kalos"
    },

    "Alola": {
        url: "https://pokeapi.co/api/v2/generation/7/",
        name: "Alola"
    },

    "Galar": {
        url: "https://pokeapi.co/api/v2/generation/8/",
        name: "Galar"
    },
    "Paldea": {
        url: "https://pokeapi.co/api/v2/generation/9/",
        name: "Paldea"
    }
}

const preLoadImages = async (imageURL:string) => {
    const image = new Image();
    image.src = imageURL
}

export const getPokemonData = async (pokemonURL:string) => {
    let pokemonData = {}
    const response = await api.get(pokemonURL)
    if (response.status !== 200) {
        throw new TypeError(`Bad response ${response.statusText}`)
    }
    pokemonData = response.data
    preLoadImages(response.data["sprites"]["other"]["official-artwork"]["front_default"])

    return pokemonData
}

// const fetchAPI = async (pokemonGeneration:IGeneration) => {
//     let pokemon = []
//     let response = await api.get(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonGenerations[pokemonGeneration.name].offset}&limit=${pokemonGenerations[pokemonGeneration].limit}`)
//     pokemon = response.data.results
//     return pokemon
// }

// const getKanto = async () => {
//     let region = "Kanto"
//     return fetchAPI(pokemon)
// }

// const getJhoto = async () => {
//     let region = "Johto"
//     return fetchAPI(pokemon)
// }

// const getHoenn = async () => {
//     let pokemon = "Hoenn"
//     return fetchAPI(pokemon)
// }

// const getSinnoh = async () => {
//     let pokemon = "Sinnoh"
//     return fetchAPI(pokemon)
// }

// const getUnova = async () => {
//     let pokemon = "Unova"
//     return fetchAPI(pokemon)
// }

// const getKalos = async () => {
//     let pokemon = "Kalos"
//     return fetchAPI(pokemon)
// }

// const getAlola = async () => {
//     let pokemon = "Alola"
//     return fetchAPI(pokemon)
// }

// const getGalar = async () => {
//     let pokemon = "Galar"
//     return fetchAPI(pokemon)
// }

// const getAllPokemon = async () => {
//     let pokemon = {}

//     pokemon[generation[0]] = await getKanto()
//     pokemon[generation[1]] = await getJhoto()
//     pokemon[generation[2]] = await getHoenn()
//     pokemon[generation[3]] = await getSinnoh()
//     pokemon[generation[4]] = await getUnova()
//     pokemon[generation[5]] = await getKalos()
//     pokemon[generation[6]] = await getAlola()
//     pokemon[generation[7]] = await getGalar()
//     return pokemon
// }

// export const getPokemon = async () => {
//     const pokemon = await getAllPokemon()
//     return pokemon
// }