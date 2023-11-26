import {useQuery} from 'react-query'
import axios from 'axios'
import {IRegion } from '../GeneralInterfaces';


export const GetRegions = (enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>>) => {
    const getRegions = useQuery("Get Regions" , async ()=> await axios.get('https://pokeapi.co/api/v2/region').then(async ({data}) => {
        const regions:IRegion[] = data.results;
        for (let i = 0; i < regions.length; i++) {
            await axios.get(regions[i].url).then(({data}) => {
                let name = data.name
                name = name.charAt(0).toUpperCase() + name.slice(1)
                data.name = name
                if (data.main_generation !== null) {
                    let gen_name = data.main_generation.name;
                    gen_name = gen_name.charAt(0).toUpperCase() + gen_name.slice(1)
                    gen_name = gen_name.split('-')
                    gen_name[1] = gen_name[1].toUpperCase()
                    gen_name = gen_name.join(' ')
                    data.main_generation.name = gen_name
                }

            regions[i] = {...regions[i], ...data }
            
            })

        }
        return regions
    } ),
     {enabled: enabled,
            onSuccess: () => setEnabled(false),
        onError: (err) => {
            console.log(err)
        }})
    return getRegions
}
export const GetRegionData = (
    url: string,
    // enabled: boolean = false,
    // setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
        /**
         * Gets initial data for the region
         * @param {string} region the region to get data for
         * @param {boolean} enabled enables or disables the query
         * @param {React.Dispatch<React.SetStateAction<boolean>>} setEnabled sets the enabled state of the query
         * @returns A query that returns the Kanto data
         */

    const GetRegion = useQuery(['GetRegionData', url], async () => await axios.get(url),
    {
        // enabled,
        // onSuccess: () => setEnabled(false),
        onError: (err) => {
            console.log(err)
        },
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
    return GetRegion
}
export const useGetAllPokemon = (
    limit: number = 20,
    offset: number = 0,
    enabled: boolean = false,
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const GetPokemon = useQuery(['GetPokemon', offset], async () => await axios.get(`https://pokeapi.co/api/v2/pokemon`, {params: {
        limit,
        offset
    }}),
    {
        enabled,
        onSuccess: () => setEnabled(false),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
    return GetPokemon
}

export const useGetGenerationDetails = (
    generation_name:string, 
    url:string,
    enabled:boolean, 
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>)     => {
    const GetGenerationDetails = useQuery(
        ['GetGenerationDetails', generation_name, url], async () => await axios.get(url),
    {
        enabled,
        onSuccess: () => setEnabled(false),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    })
    return GetGenerationDetails
    }

export const useGetGeneration = (enabled: boolean, setEnabled: React.Dispatch<React.SetStateAction<boolean>>) => {
    const GetGenerationDetails = (url:string) => {
        const GenerationDetails = useQuery('GetGeneration', async () => await axios.get(url))
        return GenerationDetails
    }

    const GetGeneration = useQuery('GetGeneration', async () => await axios.get(`https://pokeapi.co/api/v2/generation/`).then((response => {   
        let generations = response.data 
        for (let i = 0; i < generations.length; i++) {
            const GetDetails = GetGenerationDetails(generations[i].url)
            generations[i] = {...generations[i], ...GetDetails.data }
        }
    })),
    {
        enabled,
        
        onSuccess: () => setEnabled(false),
        refetchOnWindowFocus: false,
        refetchOnMount: false
    }
    )
    return GetGeneration
}