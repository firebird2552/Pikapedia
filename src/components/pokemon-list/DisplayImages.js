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
    console.log(pokemon.varieties[0].pokemon)

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
                {sprites !== undefined ?
                    <Col id="default-img" className="d-flex justify-content-center">
                        <img
                            onLoad={event => ImageLoaded(event)}
                            src={sprites.other['official-artwork'].front_default}
                            className="d-flex"
                            alt={`Default apperance for ${pokemon.name}`} />

                        <Card.Title>Loading...</Card.Title>
                    </Col>
                    : null}
            </Row>
        </Container >
    )
}
export default DisplayImages



