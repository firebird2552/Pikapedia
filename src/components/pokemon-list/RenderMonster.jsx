// React imports
import React, { useState, useEffect } from "react";

// custom imports
import { getImages, getPokemonData } from "../../data/RetrievePokemon";

// style imports
import "../../styles/PokemonCard.css";
import { PokemonCard } from "./PokemonCard";

//functional react component
export const RenderMonster = (props) => {
  const { id, monster } = props;
  const [monsterDetails, setMonsterDetails] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetDetails = async () => {
      getPokemonData(monster["url"]).then((response) => {
        setMonsterDetails(response);
        setLoading(false);
      });
    };
    GetDetails();
  }, []);

  return (
    <PokemonCard
      loading={loading}
      monsterDetails={monsterDetails}
      monster={monster}
    />
  );
};
