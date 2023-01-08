//react imports
import React, { useEffect, useState } from "react";

import axios from "axios";

// bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import NavLink from "react-bootstrap/NavLink";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";

const RenderMoves = ({ moves }) => {
  const [loading, setLoading] = useState(true);
  const [versionGroups, setVersionGroups] = useState([]);

  const getVersions = async () => {
    let Versions = [];
    let versionDetails = [];
    await axios
      .get("https://pokeapi.co/api/v2/version-group/")
      .then((response) => {
        const result = response.data.results;
        Versions = result;
      });

    for (let i = 0; i < Versions.length; i++) {
      await axios
        .get(`https://pokeapi.co/api/v2/version-group/${i + 1}/`)
        .then((response) => {
          Versions[i] = response.data;
        });
    }

    versionDetails = Versions;
    setVersionGroups(versionDetails);
  };

  useEffect(() => {
    getVersions();
    if (versionGroups.length > 0) {
      setLoading(false);
    }
    return () => {};
  }, [versionGroups]);

  let moveElements = [];

  if (!loading) {
    moves != null ? (
      moves.map(({ version_group_details, move }) => {
        const moveUrl = move.url.split("/");
        const moveNumber = moveUrl[6];
        let moveDetails = [];
        moveDetails.push(
          <ListGroup.Item key={moveNumber}>
            <Container>
              <Row>
                <Col>
                  {<Card.Subtitle className="text-center">Game</Card.Subtitle>}
                </Col>
                <Col>
                  {
                    <Card.Subtitle className="text-center">
                      Method
                    </Card.Subtitle>
                  }
                </Col>
                <Col>
                  {<Card.Subtitle className="text-center">Level</Card.Subtitle>}
                </Col>
              </Row>
            </Container>
          </ListGroup.Item>
        );
        version_group_details.map((item) => {
          const name = item.version_group.name;

          // check if the version group name matches the name in the
          const version = versionGroups.find((version) =>
            version.name === name ? version : null
          );
          const gameLinks = version.versions.map((game) => {
            /*const gameUrl = game.url.split('/')
                    //const gameNumber = gameUrl[6]*/

            let items = [];
            items.push(<Col>{game.name}</Col>);

            return items;
          });
          moveDetails.push(
            <ListGroup.Item>
              <Container fluid>
                <Row>
                  <Col className="text-center">
                    <Container>
                      <Row>{gameLinks}</Row>
                    </Container>
                  </Col>
                  <Col className="text-center">
                    {item.move_learn_method.name}
                  </Col>
                  <Col className="text-center">{item.level_learned_at}</Col>
                </Row>
              </Container>
            </ListGroup.Item>
          );
          return 0;
        });
        let tempArray = move.url.split("/");
        let number = tempArray[6];
        moveElements.push(
          <ListGroup.Item key={moveNumber}>
            <Accordion>
              <Card>
                <Card.Header>
                  <Container>
                    <Row>
                      <Col className="col-11 text-center">
                        <NavLink href={`/move/${move.name}?number=${number}`}>
                          <Card.Title>{move.name}</Card.Title>
                        </NavLink>
                      </Col>
                      <Col className="col-1">
                        <Accordion.Toggle as={Button} eventKey={moveNumber}>
                          <FontAwesomeIcon icon={faCaretSquareDown} />
                        </Accordion.Toggle>{" "}
                      </Col>
                    </Row>
                  </Container>
                </Card.Header>
                <Accordion.Collapse eventKey={moveNumber}>
                  <Card.Body>
                    <ListGroup variant="flush">{moveDetails}</ListGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          </ListGroup.Item>
        );
        return 0;
      })
    ) : (
      <div>Loading...</div>
    );
  } else {
    moveElements.push(<Card.Title>Loading...</Card.Title>);
  }

  return moveElements;
};

export default RenderMoves;
