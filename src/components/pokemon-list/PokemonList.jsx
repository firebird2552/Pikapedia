// React imports
import React, { useState, useEffect } from "react";

//Library imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

// custom imports
import { RenderMonster } from "./RenderMonster";
import { getPokemon, getPokemonData } from "../../data/RetrievePokemon";

//functional react component
const PokemonList = () => {
  const [pokemon, setPokemon] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("Kanto");

  const updatedDisplayedPokemon = () => {
    if (searchKeyword.length !== 0) {
      let temp = null;
      for (let item in pokemon) {
        //console.log("item", item)
        let found = pokemon[item].filter((monster) =>
          monster["name"].includes(searchKeyword.toLowerCase())
        );
        //console.log("found", found)
        if (temp === null) {
          temp = found;
        } else {
          temp.concat(found);
        }
      }
      //console.log("temp", temp)
      setDisplayedPokemon(temp);
    } else if (region !== "All Regions") {
      const selectedRegion = region.split(": ")[0];
      setDisplayedPokemon(pokemon[selectedRegion]);
    } else {
      setDisplayedPokemon(pokemon);
    }
  };

  useEffect(() => {
    getPokemon().then(async (response) => {
      setPokemon(response);
      let localPokemon = pokemon["Kanto"];
      for (let index in localPokemon) {
        localPokemon[index] = await getPokemonData(localPokemon[index]["url"]);
        pokemon["Kanto"] = localPokemon;

        // console.log("pokemon:", localPokemon)
      }
    }, []);
  }, [pokemon]);

  const updateRegion = (event) => {
    const selected = event.target.value;
    setRegion(selected);
  };

  useEffect(() => {
    if (Object.keys(pokemon).length !== 0) {
      updatedDisplayedPokemon();
      setLoading(false);
    } else {
      console.log(
        `Pokemon not loaded\n pokemon length ${Object.keys(pokemon).length}`
      );
    }
  }, [pokemon]);

  useEffect(() => {
    const selected = document.querySelector("#generationSelect").value;
    setRegion(selected);
  }, []);

  useEffect(() => {
    updatedDisplayedPokemon();
  }, [searchKeyword, region]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Search:</Form.Label>
                <Form.Control
                  type="text"
                  id="searchBox"
                  onChange={(event) => {
                    setSearchKeyword(event.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} className="col-12 col-md-3">
                <Form.Label>Select a generation/region</Form.Label>
                <Form.Control
                  onChange={(event) => updateRegion(event)}
                  as="select"
                  name="generations"
                  id="generationSelect"
                  defaultValue="Kanto: Generation One"
                >
                  <option>Kanto: Generation One</option>
                  <option>Johto: Generation Two</option>
                  <option>Hoenn: Generation Three</option>
                  <option>Sinnoh: Generation Four</option>
                  <option>Unova: Generation Five</option>
                  <option>Kalos: Generation Six </option>
                  <option>Alola: Generation Seven</option>
                  <option>Galar: Generation Eight</option>
                  <option>All Generations</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <div className="pokemonList">
        {/* <RenderOnePokemon pokemon={{ name: "Fordorth" }} /> */}
        {loading ? (
          <Col>Loading...</Col>
        ) : (
          displayedPokemon.map((pokemon, index) => {
            //console.log(index)
            return <RenderMonster key={index} monster={pokemon} />;
          })
        )}
      </div>
    </Container>
  );
};

export default PokemonList;
