// React imports
import React, { useState, useEffect } from "react";
import {useParams} from 'react-router'

//Library imports
import axios from "axios";

//React-Bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

// custom imports
// import RenderMoves from "./moves/RenderMoves";
// import RenderEvolution from "./evolutions/RenderEvolutions";

import "../../styles/details.css";
import { IPokemon, IPokemonType } from "../../support/PokemonInterfaces";
// import { ISprite, IType } from "../../support/GeneralInterfaces";

//functional react component
const PokemonDetails = () => {
  // const colors = {
  //   // from https://www.epidemicjohto.com/t882-type-colors-hex-colors
  //   normal: "A8A77A",
  //   fire: "EE8130",
  //   water: "6390F0",
  //   electric: "F7D02C",
  //   grass: "7AC74C",
  //   ice: "96D9D6",
  //   fighting: "C22E28",
  //   poison: "A33EA1",
  //   ground: "E2BF65",
  //   flying: "A98FF3",
  //   psychic: "F95587",
  //   bug: "A6B91A",
  //   rock: "B6A136",
  //   ghost: "735797",
  //   dragon: "6F35FC",
  //   dark: "705746",
  //   steel: "B7B7CE",
  //   fairy: "D685AD",
  // };
  const [details, setDetails] = useState<IPokemon | null>(null);
  const number = useParams()
  const getDetails = async (url:string) => {

    let tempDetails:IPokemon = await axios.get(url)
    if (tempDetails?.species === undefined) return 
    tempDetails.species = await axios.get(tempDetails?.species.url)
    setDetails(tempDetails);
  };

  useEffect(() => {
    if (number) {
      const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
      getDetails(url);
    }
  }, [number]);

  // const RenderImages = () => {
  //   let imageNames = [
  //     "front_default",
  //     "back_default",
  //     "front_shiny",
  //     "back_shiny",
  //     "front_female",
  //     "back_female",
  //     "front_shiny_female",
  //     "back_shiny_female",
  //   ];
  //   let images:string[] = [];


  //   imageNames.map((name as keyof ISprite) => {
  //     if (details === null) return;
  //     if (details.sprites === undefined) return;
      
  //       if (details.sprites !== null) {
  //         images.push(
  //           <Col className="col-12 col-md-3">
  //             <Card.Img src={details.sprites[name]} />
  //           </Col>
  //         );
  //       }
  //     return 0;
  //   });

  //   return images;
  // };

  return (
    <Card>
      <Card.Header>
        <Container>
          <Row>
            <Col>
              <Card.Title className="text-center">
                {details?.name !== undefined ? details?.name.toUpperCase() : null}
              </Card.Title>
            </Col>
          </Row>
          <Row>
            {details === null ? null : details?.types !== undefined
              ? details?.types.map(({ type }:IPokemonType) => {
                  return (
                    <Col key={type.name}>
                      <Card.Subtitle className="text-center">
                        {type.name.toUpperCase()}
                      </Card.Subtitle>
                    </Col>
                  );
                })
              : null}
          </Row>
        </Container>
      </Card.Header>
      <Card.Body>
        {/* <Container>
          <Row>{RenderImages()}</Row>
        </Container> */}
        <Container>
          <Row>
            <Col>
              <Card.Subtitle className="text-center title">
                Evolution
              </Card.Subtitle>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
          {/* <Row>
            {details === null ? null : details.species !== undefined ? (
              <Col>
                <RenderEvolution
                  evolutionChain={details.species.evolution_chain}
                />
              </Col>
            ) : (
              <Col>Loading</Col>
            )}
          </Row> */}
          <Row>
            <Col>
              <Card.Subtitle className="text-center title">
                Base Stats
              </Card.Subtitle>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
          <Row>
            <Col>
              <ListGroup variant="flush" className="text-center">
                {details === null ? null : details.stats !== undefined
                  ? details.stats.map((stat) => {
                      return (
                        <ListGroup.Item>
                          <Container>
                            <Row>
                              <Col>{stat.stat.name}</Col>
                              <Col>{stat.base_stat}</Col>
                            </Row>
                          </Container>
                        </ListGroup.Item>
                      );
                    })
                  : null}
              </ListGroup>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <Card.Subtitle className="text-center title">Moves</Card.Subtitle>
            </Col>
          </Row>
          {/* <hr />
          <Row>
            <Col>
              <ListGroup variant="flush">
                <RenderMoves moves={details.moves} />
              </ListGroup>
            </Col>
          </Row> */}
        </Container>
      </Card.Body>
    </Card>
  );
};

// Evolution Chain -> images -> level -> links

// PokemonDetails.getInitialProps = async ({ query }) => {
//   const number = query.number;
//   let details = {};
//   if (number) {
//     const url = "https://pokeapi.co/api/v2/";
//     const pokemon = `pokemon/${number}`;

//     await axios.get(url + pokemon).then(
//       (response) => {
//         details = response.data;
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     await axios.get(details.species.url).then(
//       (response) => {
//         details.species = response.data;
//       },
//       (error) => {
//         console.log(error);
//       }
//     );
//     /**
//      * once evolution chain is loaded
//      * determine if pokemon evolves
//      * if pokemon evolves how many times does it evolve
//      * Make axios call for each evolution
//      */
//   }

//   return { details };
// };

export default PokemonDetails;
