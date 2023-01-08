// React imports
import React, { useState, useMemo, useEffect, useCallback } from 'react'

//Library imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
// custom imports

//functional react component
const DisplayImages = ({ pokemon }) => {
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(pokemon.varieties[0].pokemon.sprites.other['official-artwork'].front_default)

    const loadImage = async () => {
        setImage(await image)
        setLoading(false)
    }
    useEffect(() => {
        loadImage()
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col id="default-img" className="d-flex justify-content-center">
                    {!loading ?
                        <img
                            src={`data:image/png;base64, ${image}`}
                            alt={`Default apperance for ${pokemon.name}`} />
                        : <Card.Title>Loading...</Card.Title>}
                </Col>
            </Row>
        </Container >
    )
}
export default DisplayImages



