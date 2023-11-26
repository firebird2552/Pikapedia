// React imports
import React, { useState, useEffect } from "react";

// style imports
import "../../styles/PokemonCard.scss";
import { PokemonCard } from "./PokemonCard";
import { IPokemon } from "../../support/PokemonInterfaces";
import { GetPokemonDetails } from "../../support/hooks/Pokemon";


interface IRenderMonsterProps {
  pokemon: IPokemon;
}
//functional react component
export const RenderMonster = ({pokemon}:IRenderMonsterProps) => {

  const [enabled, setEnabled] = useState(true)
  const [pokemonDetails, setPokemonDetails] = useState<IPokemon | null>(null)
  const getPokemonDetails = GetPokemonDetails(pokemon.name, pokemon.url, enabled, setEnabled);
  
  useEffect(() => {
    if (getPokemonDetails.isLoading) return;
    if (getPokemonDetails.isSuccess) {
      setPokemonDetails(getPokemonDetails.data.data)
    }
  }, [getPokemonDetails.isLoading, getPokemonDetails.isSuccess, getPokemonDetails.data]);

  // useEffect(() => {
  //   const GetDetails = async () => {
  //     getPokemonData(pokemon["url"]).then((response) => {
  //       setMonsterDetails(response);
  //       setLoading(false);
  //     });
  //   };
  //   GetDetails();
  // }, [pokemon]);

  return (
    <div>
      {getPokemonDetails.isLoading ? 
      <div>Loading...</div> : 
      pokemonDetails === null? null :
      <PokemonCard monster={pokemonDetails} />
    }
    </div>
    );
};
