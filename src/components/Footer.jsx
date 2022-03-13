import React from "react";

// style imports
import "../styles/Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="wrapper">
        <div>Site: &copy; 2019 - 2022 Fordorth Labs</div>
        <div>
          API: &copy; <a href="https://pokeapi.co">pokeapi.co</a>
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
      </div>
    </div>
  );
};
