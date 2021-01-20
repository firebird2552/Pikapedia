// React imports
import React, { useState } from 'react'

//Library imports
import axios from 'axios'

// custom imports

//functional react component
const GetPokemon = async (setPokemon, region) => {
    const params = filterByRegion(region)
    await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${params.offset}&limit=${params.limit}`).then(response => {
        setPokemon(response.data.results)
    }
        , (error => {
            console.log(error)
        }))
}

const filterByRegion = region => {
    let params = {
        "limit": 151,
        "offset": 0
    }
    switch (region) {
        case "Kanto":
            params.limit = 151
            params.offset = 0
            break

        case "Johto":
            params.limit = 100
            params.offset = 151
            break

        case "Hoenn":
            params.limit = 134
            params.offset = 252
            break

        case "Sinnoh":
            params.limit = 107
            params.offset = 386
            break

        case "Unova":
            params.limit = 155
            params.offset = 493
            break

        case "Kalos":
            params.limit = 71
            params.offset = 649
            break

        case "Alola":
            params.limit = 87
            params.offset = 721
            break

        case "Galar":
            params.limit = 89
            params.offset = 809
            break

        case "All":
            params.limit = 898
            params.offset = 0
            break
    }
    return params
}
export default GetPokemon