import React, { useEffect, useState } from "react";

//Library imports
import Card from "react-bootstrap/Card";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { PokemonImage } from "./PokemonImage";

export const PokemonCard = ({ loading, monsterDetails, monster }) => {
  const { id, types } = monsterDetails;
  console.log(id, types)
  const [front_defualt, set_front_default] = useState("");

  useEffect(() => {
    // console.log("Pokemon Card -> useEffect -> monster Details", monsterDetails);
    if (
      monsterDetails.length !== 0 &&
      Object.keys(monsterDetails).length !== 0
    ) {
      set_front_default(
        monsterDetails["sprites"]["other"]["official-artwork"]["front_default"]
      );
    }
  }, [front_defualt, monsterDetails]);

  const colors = {
    // from https://www.epidemicjohto.com/t882-type-colors-hex-colors
    normal: "A8A77A",
    fire: "EE8130",
    water: "6390F0",
    electric: "F7D02C",
    grass: "7AC74C",
    ice: "96D9D6",
    fighting: "C22E28",
    poison: "A33EA1",
    ground: "E2BF65",
    flying: "A98FF3",
    psychic: "F95587",
    bug: "A6B91A",
    rock: "B6A136",
    ghost: "735797",
    dragon: "6F35FC",
    dark: "705746",
    steel: "B7B7CE",
    fairy: "D685AD",
  };

  const cardStyle = () => {
    const types = monsterDetails.types.map((type) => type.type.name);
    let style;
    if (types.length > 1) {
      style = {
        background: `linear-gradient(to right, #${colors[types[0]]}, #${
          colors[types[1]]
        }`,
      };
    } else if (types.length === 1) {
      style = {
        background: `#${colors[types[0]]}`,
      };
    }
    return style;
  };

  if (!loading) {
    return (
      <NavLink
        href={`./pokemon/${monster.name}?number=${id} `}
        style={{ color: "inherit" }}
      >
        <Card key={id}>
          <Card.Header style={cardStyle()}>
            <Card.Title className="text-center text-white">
              #{id} {monster.name.toUpperCase()}
            </Card.Title>
            <Container>
              <Row>
                {monsterDetails.types !== undefined
                  ? types.map(({ type }) => {
                      const { name } = type;
                      return (
                        <Col key={id + name}>
                          <Card.Subtitle className=" text-white text-center">
                            {name}
                          </Card.Subtitle>
                        </Col>
                      );
                    })
                  : null}
              </Row>
            </Container>
          </Card.Header>
          <Card.Body>
            {!loading ? (
              <Container fluid>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <PokemonImage
                      key={front_defualt}
                      url={front_defualt}
                      name={monsterDetails["name"]}
                    />
                  </Col>
                </Row>
              </Container>
            ) : (
              <Card.Text className="text-center">Loading...</Card.Text>
            )}
          </Card.Body>
        </Card>
      </NavLink>
    );
  } else {
    return (
      <NavLink
        href={`./pokemon/${monster.name}?number=${id} `}
        style={{ color: "inherit" }}
      >
        <Card key={id}>
          <Card.Header>
            <Card.Title className="text-center">
              #{id} {monster.name.toUpperCase()}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <div>...Loading</div>
          </Card.Body>
        </Card>
      </NavLink>
    );
  }
};
