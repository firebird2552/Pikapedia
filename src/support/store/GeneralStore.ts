import {create} from 'zustand'
import {persist, devtools} from 'zustand/middleware'

interface IGeneralStore {
    searchTerm: string;
    setSearchTerm: (search_term: string) => void;
}

export const useGeneralStore = create<IGeneralStore>()(
    devtools(persist(
    (set) => ({
        searchTerm: '',
        setSearchTerm: (search_term: string) => set({searchTerm: search_term}),
    }), 
    {name:"general-store"})
))
