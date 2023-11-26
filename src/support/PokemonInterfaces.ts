import { IArea, IColor, IFlavorText, ILanguage, IName, IPokedex, ISprite, IType } from "./GeneralInterfaces";
import { IGeneration } from "./GenerationInterfaces";


interface IEggGroup {
    name: string;
    url: string;
}

export interface IEvolutionChain {
    url: string;
}

interface IFormDescription {
    name: string;
    url: string;
}

interface IGenus {
    genus: string;
    language: ILanguage;
}

interface IGrowthRate {
    name: string;
    url: string;
}

interface IHabitat {
    name: string;
    url: string;
}

interface IPalParkEncounter {
    area: IArea;
    base_score: number;
    rate: number;
}

interface IPokedexNumber {
    entry_number: number;
    pokedex: IPokedex;
}

interface IShape {
    name: string;
    url: string;
}

interface IVariety {
    is_default: boolean;
    pokemon: IPokemon;
}

interface ISpecies {
    name: string;
    url: string;
    evolution_chain?: IEvolutionChain;
}

interface IStat {
    name: string;
    url: string;
}

interface IStatDetail {
    base_stat: number;
    effort: number;
    stat: IStat;
}
export interface IPokemonType {
    slot: number,
    type: IType
}
export interface IPokemon {
    name:string;
    url:string; 
    color?: IColor;
    egg_groups?: IEggGroup[];
    evolution_chain?: IEvolutionChain;
    evolves_from_species?: null;
    flavor_text_entries?: IFlavorText[];
    form_descriptions?: IFormDescription[];
    genera?: IGenus[];
    generation?: IGeneration;
    growth_rate?: IGrowthRate;
    habitat?: IHabitat;
    has_gender_differences?: boolean;
    hatch_counter?: number;
    id?: number;
    is_baby?: boolean;
    is_legendary?: boolean;
    is_mythical?: boolean;
    names?: IName[];
    order?: number;
    pal_park_encounters?: IPalParkEncounter[];
    pokedex_numbers?: IPokedexNumber[];
    shape?: IShape;
    varieties?: IVariety[];
    sprites?: ISprite;
    species?: ISpecies;
    types?: IPokemonType[];
    stats: IStatDetail[];
}