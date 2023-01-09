import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { MoveGameDetails } from "./MoveGameDetails";
import {getMoveDetails} from '../../../api/GetData'

export const MoveDetails = ({ move }) => {
    useEffect(() => {
        const fetchData = async (move) => {
            await getMoveDetails
        }
        fetchData()
    }, []);
  return (
    <div>
      MoveDetails
      <ListGroup.Item>
        <Container>
          <Row>
            <Col>
              {<Card.Subtitle className="text-center">Game</Card.Subtitle>}
            </Col>
            <Col>
              {<Card.Subtitle className="text-center">Method</Card.Subtitle>}
            </Col>
            <Col>
              {<Card.Subtitle className="text-center">Level</Card.Subtitle>}
            </Col>
          </Row>
        </Container>
          </ListGroup.Item>
          <MoveGameDetails />
    </div>
  );
};
