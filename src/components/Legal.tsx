import React from "react";
import Container from "react-bootstrap/Container";

export const Legal = () => {
  return (
    <Container>
      <div>
        <a href="https://pokeapi.co">pokeapi.co</a>
      </div>
      <div>
        This site is not affiliated with Nintendo&trade;, The Pokemon
        Company&trade;, or GameFreak&trade;
      </div>
      <div>
        <a href="https://www.pokemon.com/us/legal/">
          Pokemon, Pokemon character names are trademarks of Nintendo. &amp;
          &copy; 2022 Pokémon. &copy; 1995–2022
        </a>
      </div>
    </Container>
  );
};
