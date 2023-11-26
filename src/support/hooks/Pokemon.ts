import { useQuery } from "react-query";
import axios from "axios";

import {type IPokemon} from "../PokemonInterfaces";
import { IRegion } from "../GeneralInterfaces";

import { RegionStore } from "../store";

export const GetPokemonDetails = (pokemon_name: string, url:string , enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>>) => {
    const GetPokemonDetails = useQuery(['GetPokemonDetails', pokemon_name], async () => await axios.get(url), {
        enabled, onSuccess: () => setEnabled(false), refetchOnWindowFocus: false
    })
    return GetPokemonDetails
}

export const GetPokedex = (url: string) => {
    const Pokedex = useQuery('GetPokedex', async () => await axios.get(url).then(({data}) => {
        return data}))
    return Pokedex
}

export const GetPokemonByRegion = (region: IRegion) => {
    let Pokemon: IPokemon[] | null = null

    if (region.pokedexes) {

        const getPokedex = GetPokedex(region.pokedexes[0].url)
        console.log(getPokedex.data)
        if (getPokedex.data)
        {

        Pokemon = getPokedex.data.pokemon_entries
        }
    }

    return Pokemon
}

export const GetPokemon = (limit:number, offset:number) => {
    const Pokemon = useQuery(['GetPokemon', limit, offset], async () => await axios.get(`https://pokeapi.co/api/v2/pokemon`, {params: {
        limit,
        offset
    }}).then(({data}) => {
        return data}))
    return Pokemon
}