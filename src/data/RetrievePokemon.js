
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

export const getPokemonData = async (pokemonURL) => {

    let pokemonData = {}
    const response = await api.get(pokemonURL)
    //console.log("Response:", response)
    if (response.status !== 200) {
        throw new TypeError(`Bad response ${response.statusText}`)
    }
    pokemonData = response.data

    return pokemonData
}

const getKanto = async () => {
    let pokemon = ["Kanto"]
    let response = await api.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
    // let localPokemon = response.data.results
    // for (const index in localPokemon) {
    //     const pokemonURL = localPokemon[index]['url']
    //     localPokemon[index] = await getPokemonData(pokemonURL)
    // }
    pokemon = response.data.results
    return pokemon
}

const getJhoto = async () => {
    let pokemon = ["Jhoto"]
    return pokemon
}

const getHoenn = async () => {
    let pokemon = ["Hoenn"]
    return pokemon
}

const getSinnoh = async () => {
    let pokemon = ["Sinnoh"]
    return pokemon
}

const getUnova = async () => {
    let pokemon = ["Unova"]
    return pokemon
}

const getKalos = async () => {
    let pokemon = ["Kalos"]
    return pokemon
}

const getAlola = async () => {
    let pokemon = ["Alola"]
    return pokemon
}

const getGalar = async () => {
    let pokemon = ["Galar"]
    return pokemon
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
    // const pokemonLocalStore = (JSON.stringify(pokemon))
    //localStorage.setItem('Pokemon', pokemonLocalStore)
    return pokemon
}

const checkLocalStorage = async () => {
    const localPokemon = await localStorage.getItem('Pokemon')
    if (localPokemon === null) {
        let pokemon = await getAllPokemon()
        return pokemon
    }
    if (localPokemon != null) {
        // console.log(localPokemon)
        const pokemon = JSON.parse(localPokemon)
        if (pokemon["Kanto"] === undefined) { await getKanto() }
        if (pokemon["Jhoto"] === undefined) { await getJhoto() }
        if (pokemon["Hoenn"] === undefined) { await getHoenn() }
        if (pokemon["Sinnoh"] === undefined) { await getSinnoh() }
        if (pokemon["Unova"] === undefined) { await getUnova() }
        if (pokemon["Kalos"] === undefined) { await getKalos() }
        if (pokemon["Alola"] === undefined) { await getAlola() }
        if (pokemon["Galar"] === undefined) { await getGalar() }
        return pokemon

    }
}

export const getPokemon = async () => {
    localStorage.removeItem("Pokemon")
    let pokemon = null
    pokemon = await checkLocalStorage()

    return pokemon
}