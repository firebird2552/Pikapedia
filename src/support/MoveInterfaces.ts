import {IFlavorText, ILanguage, IType, IVersionGroup} from './GeneralInterfaces'
import { IGeneration } from './GenerationInterfaces';
interface IDamageClass {
    name: string
    url: string
}
interface IEffectEntry {
    effect: string;
    short_effect: string;
}

interface IMoveAilment {
    name: string;
    url: string;
}
interface IMoveCategory {
    name: string;
    url: string;
}
interface IMoveMeta {
    ailment: IMoveAilment;
    category: IMoveCategory;
    min_hits: number| null,
    max_hits: number |null,
    min_turns: number| null,
    max_turns: number |null,
    drain: number,
    healing: number,
    crit_rate: number,
    ailment_chance: number,
    flinch_chance: number,
    stat_chance: number
}
interface IMoveName {
    name: string;
    language: ILanguage;
}
interface IMoveTarget {
    name: string;
    url: string;
}
interface ILearnedByPokemon {
    name: string;
    url: string;
}

export interface IMoveDetails {
    id?: number;
    name: string;
    url: string;
    accuracy?: number;
    effect_chance?: number | null;
    pp?: number;
    priority?: number;
    power?: number;
    damage_class?: IDamageClass;
    effect_entries?: IEffectEntry[],
    effect_changes?: null;
    generation?: IGeneration;
    meta?: IMoveMeta
    names?: IMoveName[],
    past_values?: number[],
    stat_changes?: number[],
    target?: IMoveTarget
    type?: IType
    learned_by_pokemon?: ILearnedByPokemon[],
    flavor_text_entries?: IFlavorText[]      
}