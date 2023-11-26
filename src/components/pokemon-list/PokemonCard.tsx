
//Library imports
import NavLink from "react-bootstrap/NavLink";

import { PokemonImage } from "./PokemonImage";
import { IPokemon, IPokemonType } from "../../support/PokemonInterfaces";

import '../../styles/PokemonCard.scss';

interface IPokemonCardProps {
  monster: IPokemon;

}
export const PokemonCard = ({monster }:IPokemonCardProps) => {
  const id: number = monster.id ? monster.id : 0;
  const types: IPokemonType[] = monster.types? monster.types : [];

  const colors = {
    // from https://www.epidemicjohto.com/t882-type-colors-hex-colors
    "normal": "A8A77A",
    "fire": "EE8130",
    "water": "6390F0",
    "electric": "F7D02C",
    "grass": "7AC74C",
    "ice": "96D9D6",
    "fighting": "C22E28",
    "poison": "A33EA1",
    "ground": "E2BF65",
    "flying": "A98FF3",
    "psychic": "F95587",
    "bug": "A6B91A",
    "rock": "B6A136",
    "ghost": "735797",
    "dragon": "6F35FC",
    "dark": "705746",
    "steel": "B7B7CE",
    "fairy": "D685AD",
  };

  const cardStyle = () => {
    type ColorKey = keyof typeof colors
    let style = {
      background: 'none'
    };
    if (monster.types=== undefined) return style
    const types: IPokemonType[] | null = monster.types ? monster.types : null;

    if (types === undefined || types === null ) return style
    if (types.length > 1) {
      const keyOne = types ? types[0].type.name : "normal";
      const keyTwo = types ? types[1].type.name : "normal";
      style = {
        background: `linear-gradient(to right, #${colors[keyOne as ColorKey]}, #${
          colors[keyTwo as ColorKey]
        }`,
      };
    } else if (types.length === 1) {
      const colorIndex = types ? types[0].type.name: "normal";

      style = {
        background: `#${colors[colorIndex as ColorKey]}`,
      };
    }
    return style;
  };

    return (
      <NavLink
        href={`./pokemon/${monster.name}?number=${monster.id}`}
        style={{ color: "inherit" }}
      >
        <div className="pokemon_card" style={cardStyle()}>
          
          <div className="card_header">
            <h3>
              {id !== undefined ? `#${id}`: null } {monster.name.toUpperCase()}
            </h3>
            <div className="type_box">
                  {types.map(({type}: IPokemonType) => (
                  <p key={type.name}>
                            {type.name}
                          </p>
                      ))}
            </div>
          </div>
          <div className="card_body">
                    {!monster ? null : 
                     !monster.sprites ? null                :
                     !monster.sprites.other ? null :
                     !monster.sprites.other['official-artwork'] ? null :
                     !monster.sprites.other['official-artwork'].front_default ? null :

                    <PokemonImage
                      key={monster.sprites.other['official-artwork'].front_default}
                      url={monster.sprites.other['official-artwork'].front_default}
                      name={monster["name"]}
                    />
                  }
                  <div className="card_stats">
                    {monster.stats?.map((stat_item) => <div key={id + stat_item.stat.name + stat_item.base_stat} className="stat">
                      <p className="stat_name">{stat_item.stat.name}</p>
                      <p className="stat_value">{stat_item.base_stat}</p>
                      </div>)}
                  </div>
          </div>
        </div>
      </NavLink>
    );
};
