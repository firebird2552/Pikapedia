import React from "react";
import NavLink from "react-bootstrap/NavLink";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretSquareDown } from "@fortawesome/free-regular-svg-icons";
import { MoveGameDetails } from "./MoveGameDetails";

export const RenderMove = ({ move, version_group_details }) => {
  const moveUrl = move.url.split("/");
  const moveNumber = moveUrl[6];
  let moveDetails = [1, 2, 3, 4];
  return (
    <ListGroup>
      <ListGroup.Item>
        <Accordion>
          <Card>
            <Card.Header>
              <Container>
                <Row>
                  <Col className="col-11 text-center">
                    <NavLink href={`/move/${move.name}?number=${moveNumber}`}>
                      <Card.Title>{move.name.replace("-", " ")}</Card.Title>
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
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        {
                          <Card.Subtitle className="text-center">
                            Game
                          </Card.Subtitle>
                        }
                      </Col>
                      <Col>
                        {
                          <Card.Subtitle className="text-center">
                            Method
                          </Card.Subtitle>
                        }
                      </Col>
                      <Col>
                        {
                          <Card.Subtitle className="text-center">
                            Level
                          </Card.Subtitle>
                        }
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {moveDetails.map(() => (
                    <MoveGameDetails
                      move={move}
                      version_group_details={version_group_details}
                    />
                  ))}
                </ListGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </ListGroup.Item>
      <ListGroup.Item></ListGroup.Item>
    </ListGroup>
  );
};
