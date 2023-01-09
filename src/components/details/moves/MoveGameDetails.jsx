import React, { useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

import { getMoveDetails } from '../../../api/GetData'

export const MoveGameDetails = ({ move,version_group_details}) => {
    useEffect(() => {
        const fetchData = async () => {
            console.log("Fetching Data")

            let data = await getMoveDetails(move.url)
            
        }
        fetchData()
    }, [move.url]);
  return (
    <ListGroup.Item>
      <Row>
        <Col>{<Card.Subtitle className="text-center">Game</Card.Subtitle>}</Col>
        <Col>
          {<Card.Subtitle className="text-center">Method</Card.Subtitle>}
        </Col>
        <Col>
          {<Card.Subtitle className="text-center">Level</Card.Subtitle>}
        </Col>
      </Row>
    </ListGroup.Item>
  );
};
