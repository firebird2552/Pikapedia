
import { setup } from 'axios-cache-adapter'
/*
 * Structure of local file
Pokemon = {
    Kanto = []
    Johto = []
    Hoenn = []
    Sinnoh = []
    Unova = []
    Kalos = []
    Alola = []
    Galar = []
}
*/

const generation = ["Kanto", "Jhoto", "Hoenn", "Sinnoh", "Unova", "Kalos", "Alola", "Galar"]
const api = setup({
    cache: {
        maxAge: 15 * 60 * 1000
    }
})

const pokemonGenerations = {
    "Kanto": {
        "limit": 151,
        "offset": 0
    },
    "Johto": {

        "limit": 100,
        "offset": 151
    },

    "Hoenn": {
        "limit": 134,
        "offset": 251
    },

    "Sinnoh": {
        "limit": 107,
        "offset": 386
    },

    "Unova": {
        "limit": 155,
        "offset": 493
    },

    "Kalos": {
        "limit": 71,
        "offset": 649
    },

    "Alola": {
        "limit": 87,
        "offset": 721
    },

    "Galar": {
        "limit": 89,
        "offset": 809
    }
}


export const getImages = async (imageURL) => {
    return await api.get(imageURL)
}

const preLoadImages = (imageURL) => {
    api.get(imageURL)

}

export const getPokemonData = async (pokemonURL) => {
    let pokemonData = {}
    const response = await api.get(pokemonURL)
    if (response.status !== 200) {
        throw new TypeError(`Bad response ${response.statusText}`)
    }
    pokemonData = response.data
    preLoadImages(response.data["sprites"]["other"]["official-artwork"]["front_default"])

    return pokemonData
}

const fetchAPI = async (pokemonGeneration) => {
    let pokemon = []
    let response = await api.get(`https://pokeapi.co/api/v2/pokemon/?offset=${pokemonGenerations[pokemonGeneration].offset}&limit=${pokemonGenerations[pokemonGeneration].limit}`)
    pokemon = response.data.results
    return pokemon
}

const getKanto = async () => {
    let pokemon = "Kanto"
    return fetchAPI(pokemon)
}

const getJhoto = async () => {
    let pokemon = "Johto"
    return fetchAPI(pokemon)
}

const getHoenn = async () => {
    let pokemon = "Hoenn"
    return fetchAPI(pokemon)
}

const getSinnoh = async () => {
    let pokemon = "Sinnoh"
    return fetchAPI(pokemon)
}

const getUnova = async () => {
    let pokemon = "Unova"
    return fetchAPI(pokemon)
}

const getKalos = async () => {
    let pokemon = "Kalos"
    return fetchAPI(pokemon)
}

const getAlola = async () => {
    let pokemon = "Alola"
    return fetchAPI(pokemon)
}

const getGalar = async () => {
    let pokemon = "Galar"
    return fetchAPI(pokemon)
}

const getAllPokemon = async () => {
    let pokemon = {}

    pokemon[generation[0]] = await getKanto()
    pokemon[generation[1]] = await getJhoto()
    pokemon[generation[2]] = await getHoenn()
    pokemon[generation[3]] = await getSinnoh()
    pokemon[generation[4]] = await getUnova()
    pokemon[generation[5]] = await getKalos()
    pokemon[generation[6]] = await getAlola()
    pokemon[generation[7]] = await getGalar()
    console.log(pokemon)
    return pokemon
}

export const getPokemon = async () => {
    const pokemon = await getAllPokemon()
    return pokemon
}