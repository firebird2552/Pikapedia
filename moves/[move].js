// React imports
import React from 'react'

import { useRouter } from 'next/router'

//Library imports
import axios from 'axios'

//React-Bootstrap imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import NavLink from 'react-bootstrap/NavLink'

// custom imports
import MainLayout from '../../../../Layout/Layout'
import Layout from '../Layout/Layout'

//functional react component
const Move = ({ details }) => {
    console.log(details)
    const router = useRouter()

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

    details.name = details.name.replace('-', " ")
    return (
        <MainLayout>
            <Layout>
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
            </Layout>
        </MainLayout >

    )
}

Move.getInitialProps = async ({ query }) => {
    const number = query.number
    let details
    if (number) {
        const url = `https://pokeapi.co/api/v2/move/${number}`
        console.log(url)

        await axios.get(url).then(response => {

            details = response.data
        }
            , (error => {
                console.log(error)
            }))
    }
    return { details }
}

export default Move