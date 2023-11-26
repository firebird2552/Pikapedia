// React imports
import React, { useState, useEffect } from "react";

// custom imports
import { RenderMonster } from "../components/pokemon-list/RenderMonster";
import {GetPokemon} from "../support/hooks/Pokemon"

import "../styles/PokemonList.scss";
import { IPokemon } from "../support/PokemonInterfaces";
import { RegionStore, PokeListStore } from "../support/store";
import { ContentFilters } from "../components/pokemon-list/ContentFilters";
import { GetPokemonByRegion } from "../support/hooks/Pokemon";
import { ListPage } from "./ListPage";

//functional react component
const PokemonList = () => {
  // const [pokemon, setPokemon] = useState<IPokemon[] | null>(null);
  // const [searchKeyword, setSearchKeyword] = useState("");
  const [displayedPokemon, setDisplayedPokemon] = useState<IPokemon[] | null>(null);
  const region = RegionStore((state) => state.region);
  const limit = PokeListStore((state) => state.quantity);
  const currentPage = PokeListStore((state) => state.currentPage);

  let offset = (currentPage - 1) * limit;
  
  const [enabled, setEnabled] = useState(true)

  const getPokemon = GetPokemon(limit, offset);
  if (region) {

    const getPokemonByRegion = GetPokemonByRegion(region)
    if (getPokemonByRegion){

      console.log("Display: ", getPokemonByRegion)
    }
  }


  useEffect(() => {
    if (getPokemon.isLoading) return;
    if (getPokemon.isSuccess) {
    setDisplayedPokemon(getPokemon.data.results);}

  }, [getPokemon.isLoading, getPokemon.isSuccess, getPokemon.data]);

  return (
    <div className="pokemon_list_container">
      <ContentFilters />
      <div className="pokemon_list">
        <ListPage>
        {getPokemon.isLoading ? (
          <div>Loading...</div>
        ) : (
          displayedPokemon?.map((pokemon, index) => {
            //console.log(index)
            return <RenderMonster key={index} pokemon={pokemon} />;
          })
        )}
          
        </ListPage></div>
      </div>
  );
};

export default PokemonList;
