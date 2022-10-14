// React imports
import React, { useEffect, useState } from 'react'

//Library imports
import axios from 'axios'

//React-Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

// custom imports

//functional react component
const MoveDetails = (props) => {

    console.log(props)
    const [details, setDetails] = useState({})

    const getDetails = async (url) => {
        await axios.get(url).then(response => {

            setDetails(response.data)
        }
            , (error => {
                console.log(error)
            }))
    }


    useEffect(() => {
        const number = props.location.search.slice(8)
        if (number) {
            const url = `https://pokeapi.co/api/v2/move/${number}`
            console.log(url)
            getDetails(url)
        }

    }, []);

    const RenderDescriptions = () => {
        let descriptions = []

        details.flavor_text_entries.map(({ flavor_text, language, version_group }) => {
            if (language.name === "en") {
                descriptions.push(
                    <ListGroup.Item key={details.version_group}>
                        <Container>
                            <Row>
                                <Col className="col-12 col-md-4">{version_group.name}</Col>
                                <Col className="col-12 col-md-8">{flavor_text}</Col>
                            </Row>
                        </Container>
                    </ListGroup.Item>
                )
            }

        })

        return descriptions
    }

    if (details.name !== undefined) {
        details.name = details.name !== undefined ? details.name.replace('-', " ") : undefined
        return (
            <Card>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col>
                                <Card.Title className="text-center text-uppercase">
                                    {details.name}
                                </Card.Title>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Header className="text-center">
                    <Row>
                        <Col>
                            Damage Type
                        </Col>
                        <Col>
                            Power
                        </Col>
                        <Col>PP</Col>
                        <Col>Accuracy</Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>
                            {details.damage_class.name} - {details.type.name}
                        </Col>
                        <Col>
                            {details.power}
                        </Col>
                        <Col>
                            {details.pp}
                        </Col>
                        <Col>
                            {details.accuracy}
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <Container>
                                <Row>
                                    <Col className="col-12 col-md-4"><Card.Subtitle>Game</Card.Subtitle></Col>
                                    <Col className="col-12 col-md-8"><Card.Subtitle>Description</Card.Subtitle></Col>
                                </Row>
                            </Container>
                        </ListGroup.Item>
                        {RenderDescriptions()}
                    </ListGroup>
                </Card.Body>
            </Card>

        )
    } else {
        return <Col><Card.Title>Loading...</Card.Title></Col>
    }
}

export default MoveDetails