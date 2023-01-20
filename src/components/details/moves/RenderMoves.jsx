//react imports
import React, { useEffect, useState } from "react";

// bootstrap imports
import Col from "react-bootstrap/Col";
import { getVersions } from "../../../api/GetData";
import { RenderMove } from "./RenderMove";

const RenderMoves = ({ moves }) => {
  const [loading, setLoading] = useState(null);
  const [versionGroups, setVersionGroups] = useState([]);

  useEffect(() => {
    if (versionGroups.length > 0) {
      setLoading(false);
    } else {
      if (!loading) {
        setLoading(true);
        const fetchData = async () => {
          const data = await getVersions();
          setVersionGroups(data);
        };
        fetchData().catch(console.error);
      }
    }
    return () => {};
  }, [versionGroups]);

  let moveElements = [];

  if (!loading) {
    moves != null ? (
      moves.map(({ version_group_details, move }) => {
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
          // moveDetails.push(
          //   <ListGroup.Item>
          //     <Container fluid>
          //       <Row>
          //         <Col className="text-center">
          //           <Container>
          //             <Row>{gameLinks}</Row>
          //           </Container>
          //         </Col>
          //         <Col className="text-center">
          //           {item.move_learn_method.name}
          //         </Col>
          //         <Col className="text-center">{item.level_learned_at}</Col>
          //       </Row>
          //     </Container>
          //   </ListGroup.Item>
          // );
          return 0;
        });
        // moveElements.push(
        // <ListGroup.Item>
        //   <Accordion>
        //     <Card>
        //       <Card.Header>
        //         <Container>
        //           <<Row>
        //             <Col className="col-11 text-center">
        //               <NavLink href={`/move/${move.name}?number=${number}`}>
        //                 <Card.Title>{move.name.replace('-',' ')}</Card.Title>
        //               </NavLink>
        //             </Col>
        //             <Col className="col-1">
        //               <Accordion.Toggle as={Button} eventKey={moveNumber}>
        //                 <FontAwesomeIcon icon={faCaretSquareDown} />
        //               </Accordion.Toggle>{" "}
        //             </Col>
        //           </Row>>
        //         </Container>
        //       </Card.Header>
        //       <Accordion.Collapse eventKey={moveNumber}>
        //         <Card.Body>
        //           <ListGroup variant="flush">{moveDetails}</ListGroup>
        //         </Card.Body>
        //       </Accordion.Collapse>
        //     </Card>
        //   </Accordion>
        // </ListGroup.Item>
        // );
        return 0;
      })
    ) : (
      <div>Loading...</div>
    );
  } else {
    moveElements.push();
  }

  let displayedMoves = loading ? (
    <div>Loading...</div>
  ) : moves != null ? (
    moves.map(({ version_group_details, move }) => (
      <RenderMove
        key={move.name}
        move={move}
        version_group_details={version_group_details}
      />
    ))
  ) : (
    <div>Loading...</div>
  );
  return displayedMoves;
};

export default RenderMoves;
