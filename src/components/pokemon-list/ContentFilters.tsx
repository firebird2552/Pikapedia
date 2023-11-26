import { useState , ChangeEvent} from 'react'
import { GetRegions } from '../../support/hooks/Region';
import {NativeSelect} from '@mui/material'
import {TextField} from '@mui/material'
import { PokeListStore, RegionStore, useGeneralStore } from '../../support/store';
import {GetPokedex} from '../../support/hooks/Pokemon';

export const ContentFilters = () => {
  return (<div className="content_filters">
    <PokemonSearch />
  <RegionFilter />
  </div>
  )
}

const PokemonSearch = () => {
    const setSearchTerm = useGeneralStore((state) => state.setSearchTerm);
    const searchTerm = useGeneralStore((state) => state.searchTerm);


return <div className="pokemon_search">
    <h3 className="label">
  Search:
  </h3>
  <div className="search_container">

  <TextField variant="standard" name="pokemon_search" id="pokemon_search" 
  value={searchTerm} 
  onChange={(event) => {
      setSearchTerm(event.target.value);
  }} />
  <button onClick={() => {setSearchTerm("")}}>Clear</button>
    </div>

</div>
}

const RegionFilter = () => {
    const setRegion = RegionStore((state) => state.setRegion);
    const [getRegionsEnabled, setGetRegionsEnabled] = useState(true)
    const getRegions = GetRegions(getRegionsEnabled, setGetRegionsEnabled);
    const limit = PokeListStore((state) => state.quantity);
    const pokedex = RegionStore((state) => state.pokedex);
    // const getPokedex = GetPokedex()



    const HandleRegionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
      if (getRegions.data !== undefined) {
        
        const selectedRegion = getRegions.data.find((region) => event.target.value === region.name ? region : null)
        console.log("Selected Region", selectedRegion)
        if (selectedRegion) {
          if(pokedex !== null) {
            if(pokedex.pokemon_entries) {
            const newTotalPages = Math.ceil(pokedex.pokemon_entries.length / limit)
            console.log("New Total Pages:", newTotalPages)
            }
          }
      setRegion(selectedRegion)}
    }
      }
    
    return (
        <div className="region_filters">
          {getRegions.isLoading ? <p>Loading...</p> : getRegions.data !== undefined ?
            <>
            <h3 className="label">Select a generation/region</h3>
            <NativeSelect
                onChange={(event) => HandleRegionSelect(event)}
                id="generationSelect"
                defaultValue="Kanto"
                >
                
                {
                  getRegions.data?.map((region, index) => {
                    return <option key={index} value={region.name}>{region.name} {region.main_generation !== undefined && region.main_generation !== null ? `- ${region.main_generation.name}` : null}</option>
                  })

                }
            </NativeSelect>
              </>: null
          }
        </div>
    )
}
