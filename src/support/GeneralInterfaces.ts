import { IGeneration } from "./GenerationInterfaces";
import { IPokemon } from "./PokemonInterfaces";

export interface IVersionGroup {
    name: string;
    url: string;
}

export interface IFlavorText {
    flavor_text: string;
    version_group: IVersionGroup;
}

export interface ILanguage {
    name: string;
    url: string;
}

export interface IType {
    name: string;
    url: string;
}

export interface IColor {
    name: string;
    url: string;
}

export interface IName {
    name: string;
    language: ILanguage;
}

export interface IArea {
    name: string;
    url: string;
}

interface IPokemonEntries {
    entry_number: number;
    pokemonSpecies: IPokemon;
}
export interface IPokedex {
    name: string;
    url: string;
    id?: number;
    descriptions?: any[];
    names?: IName[];
    is_main_series?: boolean;
    pokemon_entries?: IPokemonEntries[];
}

export interface IRegion {
    name: string;
    url: string;
    id?: number;
    main_generation?: IGeneration;
    names?: IName[];
    pokedexes?: IPokedex[];
    version_groups?: IVersionGroup[];

}

export interface IAbility {
    name: string;
    url: string;
}

interface IOtherSprites {
    dream_world: ISprite;
    home: ISprite;
    'official-artwork': ISprite;
}

export interface ISprite {
    front_default: string | null;
    front_female?: string | null;
    front_shiny?: string | null;
    front_shiny_female: string | null;

    back_default?: string | null;
    back_female?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;
    other?: IOtherSprites;
    versions?: any;
}
