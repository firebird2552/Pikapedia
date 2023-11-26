import { IAbility, IRegion, IType, IVersionGroup } from "./GeneralInterfaces";
import { IMoveDetails } from "./MoveInterfaces";
import { IPokemon } from "./PokemonInterfaces";

export interface IGeneration {
    name: string;
    url: string;
    id?:number
    abilities?: IAbility[];
    pokemon_species?: IPokemon[];
    moves?: IMoveDetails[];
    types?: IType[];
    version_groups?: IVersionGroup[];
    main_region?: IRegion;
}