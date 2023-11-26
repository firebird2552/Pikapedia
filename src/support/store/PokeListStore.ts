import {create} from 'zustand'
import {persist, devtools} from 'zustand/middleware'

interface IPokeListStore {
    quantity: number;
    setQuantity: (quantity: number) => void;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
    url: string;
    setUrl: (url: string) => void;
    totalPages: number;
    setTotalPages: (totalPages: number) => void;
    
}
export const PokeListStore =  create<IPokeListStore>()(
    devtools(persist(
    (set) => ({
        quantity: 20,
        setQuantity: (quantity: number) => set({quantity}),
        currentPage: 1,
        setCurrentPage: (currentPage: number) => set({currentPage}),
        url: 'https://pokeapi.co/api/v2/pokemon/',
        setUrl: (url: string) => set({url}),
        totalPages: 1,
        setTotalPages: (totalPages: number) => set({totalPages}),
    }), {name:"poke-list-store"})
))