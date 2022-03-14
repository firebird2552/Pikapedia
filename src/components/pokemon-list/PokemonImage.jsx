import React, { useEffect, useState } from "react";

import { getImages } from "../../data/RetrievePokemon";

export const PokemonImage = (props) => {
  const [imgLoaded, setImageLoaded] = useState(false);
  const [url, setUrl] = useState(props.url);
  const [image, setImage] = useState(null);
  let img = document.getElementById(url);


  useEffect(() => {
    setUrl(props.url);
  }, [props]);

  return (
    <div>
      <div>
        <img
          id={url}
          onLoad={(event) => {
            setImageLoaded(true);
          }}
          srcSet={url}
          className={imgLoaded ? "" : "d-none"}
          alt={`Default apperance for ${props.name}`}
        />
        <div className={imgLoaded ? "d-none" : ""}>Loading...</div>
      </div>
    </div>
  );
};
