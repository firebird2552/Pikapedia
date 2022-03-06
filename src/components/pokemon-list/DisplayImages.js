// React imports
import React from 'react'

//Library imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

// custom imports

//functional react component
const DisplayImages = ({ pokemon }) => {
    let sprites = undefined

    if (pokemon.varieties !== undefined) {
        sprites = pokemon.varieties[0].pokemon.sprites
    }

    const ImageLoaded = (event) => {
        event.target.classList.remove("d-none")
        event.target.parentNode.children[1].classList.add("d-none")
    }


    return (
        <Container fluid>
            <Row>
                <Col className="d-flex justify-content-center">
                    <Card.Subtitle>Standard</Card.Subtitle>
                </Col>

                {pokemon.length !== 0 ?
                    sprites !== undefined ?
                        sprites.front_shiny !== null ?


                            <Col className="d-flex justify-content-center">
                                <Card.Subtitle>
                                    Shiny
                            </Card.Subtitle>
                            </Col> : null
                        : null
                    : null}
            </Row>
            <Row>
                {sprites !== undefined ?
                    <Col id="default-img" className="d-flex justify-content-center">
                        <img
                            onLoad={event => ImageLoaded(event)}
                            src={sprites.front_default}
                            className="d-none"
                            alt={`Default apperance for ${pokemon.name}`} />

                        <Card.Title>Loading...</Card.Title>
                    </Col> : null}
                {sprites !== undefined ?
                    sprites.front_shiny !== null ?
                        <Col className="d-flex justify-content-center">
                            <img
                                onLoad={event => ImageLoaded(event)}
                                src={sprites.front_shiny}
                                className={"d-none"}
                                alt={`The shiny apperance for ${pokemon.name}`} />
                            <Card.Title>Loading...</Card.Title>
                        </Col>
                        : null
                    : null}
            </Row>
        </Container >
    )
}
export default DisplayImages



