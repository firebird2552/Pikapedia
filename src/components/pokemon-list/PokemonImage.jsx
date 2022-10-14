import React, { useEffect, useState } from "react";

export const PokemonImage = (props) => {
  const [imgLoaded, setImageLoaded] = useState(false);
  const [url, setUrl] = useState(props.url);


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
