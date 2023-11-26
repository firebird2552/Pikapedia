import {create} from 'zustand'
import {persist, devtools} from 'zustand/middleware'

import { IPokedex, IRegion } from '../GeneralInterfaces';

interface IRegionStore {
    region: IRegion | null;
    setRegion: (region: IRegion) => void;
    pokedex: IPokedex | null;
    setPokedex: (pokedex: IPokedex) => void;
}
export const RegionStore = create<IRegionStore>()(
    devtools(
        persist(
            (set) => ({
        region: null,
        setRegion: (region: IRegion) => set({region}),
        pokedex: null,
        setPokedex: (pokedex: IPokedex) => set({pokedex}),

    }), {name:"region-store"})))