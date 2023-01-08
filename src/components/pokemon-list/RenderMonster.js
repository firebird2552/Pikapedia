// React imports
import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


//Library imports
import Card from 'react-bootstrap/Card'
import DisplayImages from './DisplayImages'
import { GetPokemonDetails } from '../../api/GetPokemon'

// custom imports

//functional react component
const RenderMonster = ({ id, monster, details = false }) => {
    const [pokemon, setPokemon] = useState(monster)
    const [loading, setLoading] = useState(true)



    const GetDetails = async () => {
        await GetPokemonDetails(pokemon).then(result => {
            setPokemon(result)
            setLoading(false)

        })

    }

    useEffect(() => {
        GetDetails()
    }, [])

    const colors = {
        // from https://www.epidemicjohto.com/t882-type-colors-hex-colors
        "normal": "A8A77A",
        "fire": "EE8130",
        "water": "6390F0",
        "electric": "F7D02C",
        "grass": "7AC74C",
        "ice": "96D9D6",
        "fighting": "C22E28",
        "poison": "A33EA1",
        "ground": "E2BF65",
        "flying": "A98FF3",
        "psychic": "F95587",
        "bug": "A6B91A",
        "rock": "B6A136",
        "ghost": "735797",
        "dragon": "6F35FC",
        "dark": "705746",
        "steel": "B7B7CE",
        "fairy": "D685AD",
    }

    const cardStyle = () => {
        const types = pokemon.varieties !== undefined ? pokemon.varieties[0].pokemon.types.map(type => (type.type.name)) : []

        let style
        if (types.length > 1) {
            style = { background: `linear-gradient(to right, #${colors[types[0]]}, #${colors[types[1]]}` }
        }
        else if (types.length === 1) {
            style = {
                background: `#${colors[types[0]]}`
            }
        }
        return style
    }

    const RenderPokemonCard = () => {
        if (!loading) {
            return (
<<<<<<< HEAD
                <Col>
                    <Card>
                        <Card.Header style={cardStyle()}>
                            <Card.Title className="text-center text-white">
                                #{id} {monster.name.toUpperCase()}
                            </Card.Title>
                            <Container>
                                <Row>{pokemon.varieties !== undefined ? pokemon.varieties[0].pokemon.types !== undefined ? pokemon.varieties[0].pokemon.types.map(type => {
                                    return (
                                        <Col key={type.type.name}>
                                            <Card.Subtitle className="text-white text-center">
                                                {type.type.name}
                                            </Card.Subtitle>
                                        </Col>)
                                }) : null : null}
                                </Row>
                            </Container>
                        </Card.Header>
                        <Card.Body>
                            {!loading ?
                                    <DisplayImages pokemon={pokemon} />
                                : <Card.Text className="text-center">Loading...</Card.Text>}
                        </Card.Body>

                    </Card>
                </Col>
            )
||||||| 1122ae3
                <Col className="col-12 col-md-6 col-lg-4">
                    <NavLink href={`./pokemon/${monster.name}?number=${id} `} style={{ color: 'inherit' }}>
                        <Card key={id} >
                            <Card.Header style={cardStyle()}>
                                <Card.Title className="text-center text-white">
                                    #{id} {monster.name.toUpperCase()}
                                </Card.Title>
                                <Container>
                                    <Row>{monsterDetails.types !== undefined ? monsterDetails.types.map(type => {
                                        return (
                                            <Col>
                                                <Card.Subtitle className=" text-white text-center">
                                                    {type.type.name}
                                                </Card.Subtitle>
                                            </Col>)
                                    }) : null}
                                    </Row>
                                </Container>
                            </Card.Header>
                            <Card.Body>
                                {!loading ? <Container fluid>
                                    <Row>
                                        <Col className="d-flex justify-content-center">
                                            <Card.Subtitle>Standard</Card.Subtitle>
                                        </Col>

                                        {monsterDetails.sprites.front_shiny !== null ?
                                            <Col className="d-flex justify-content-center"><Card.Subtitle>Shiny</Card.Subtitle></Col> : null}
                                    </Row>
                                    <Row>
                                        <Col className="d-flex justify-content-center">
                                            <img onLoad={() => {
                                                let tempImageLoaded = imgLoaded
                                                imgLoaded.default.front = true
                                                setImgLoaded(tempImageLoaded)
                                            }}
                                                src={monsterDetails.sprites.front_default}
                                                className={imgLoaded.default.front ? "" : "d-none"} alt={`Default apperance for ${monsterDetails.name}`} /> <Card.Title className={imgLoaded.default.front ? "d-none" : ""}>Loading...</Card.Title>
                                        </Col>
                                        {monsterDetails.sprites.front_shiny !== null ? <Col className="d-flex justify-content-center">
                                            <img onLoad={() => {
                                                let tempImageLoaded = imgLoaded
                                                imgLoaded.shiny.front = true
                                                setImgLoaded(tempImageLoaded)
                                            }} src={monsterDetails.sprites.front_shiny} className={imgLoaded.shiny.front ? "" : "d-none"} alt={`Shiny apperance for ${monsterDetails.name}`} /> <Card.Title className={imgLoaded.shiny.front ? "d-none" : ""}>Loading...</Card.Title>
                                        </Col> : null}
                                    </Row>
                                </Container>
                                    : <Card.Text className="text-center">Loading...</Card.Text>}
                            </Card.Body>

                        </Card>
                    </NavLink>
                </Col >)
=======
                <Col className="col-12 col-md-6 col-lg-4">
                    <NavLink href={`./pokemon/${monster.name}?number=${id} `} style={{ color: 'inherit' }}>
                        <Card key={id} >
                            <Card.Header style={cardStyle()}>
                                <Card.Title className="text-center text-white">
                                    #{id} {monster.name.toUpperCase()}
                                </Card.Title>
                                <Container>
                                    <Row>{monsterDetails.types !== undefined ? monsterDetails.types.map(type => {
                                        return (
                                            <Col key={monster.name + type.type.name}>
                                                <Card.Subtitle className=" text-white text-center">
                                                    {type.type.name}
                                                </Card.Subtitle>
                                            </Col>)
                                    }) : null}
                                    </Row>
                                </Container>
                            </Card.Header>
                            <Card.Body>
                                {!loading ? <Container fluid>
                                    {/* <Row>
                                        <Col className="d-flex justify-content-center">
                                            <Card.Subtitle>Standard</Card.Subtitle>
                                        </Col>

                                        {monsterDetails.sprites.front_shiny !== null ?
                                            <Col className="d-flex justify-content-center"><Card.Subtitle>Shiny</Card.Subtitle></Col> : null}
                                    </Row> */}
                                    <Row>
                                        <Col className="d-flex justify-content-center">
                                            <img width="100%" onLoad={() => {
                                                let tempImageLoaded = imgLoaded
                                                imgLoaded.default.front = true
                                                setImgLoaded(tempImageLoaded)
                                            }}

                                                src={monsterDetails.sprites.other["official-artwork"].front_default}
                                                className={imgLoaded.default.front ? "" : "d-none"} alt={`Default apperance for ${monsterDetails.name}`} /> <Card.Title className={imgLoaded.default.front ? "d-none" : ""}>Loading...</Card.Title>
                                        </Col>
                                        {/* <Col className="d-flex justify-content-center">
                                            <img onLoad={() => {
                                                let tempImageLoaded = imgLoaded
                                                imgLoaded.default.front = true
                                                setImgLoaded(tempImageLoaded)
                                            }}

                                                src={monsterDetails.sprites.front_default}
                                                className={imgLoaded.default.front ? "" : "d-none"} alt={`Default apperance for ${monsterDetails.name}`} /> <Card.Title className={imgLoaded.default.front ? "d-none" : ""}>Loading...</Card.Title>
                                        </Col>
                                        {monsterDetails.sprites.front_shiny !== null ? <Col className="d-flex justify-content-center">
                                            <img onLoad={() => {
                                                let tempImageLoaded = imgLoaded
                                                imgLoaded.shiny.front = true
                                                setImgLoaded(tempImageLoaded)
                                            }} src={monsterDetails.sprites.front_shiny} className={imgLoaded.shiny.front ? "" : "d-none"} alt={`Shiny apperance for ${monsterDetails.name}`} /> <Card.Title className={imgLoaded.shiny.front ? "d-none" : ""}>Loading...</Card.Title>
                                        </Col> }
                                        : null}*/}
                                    </Row>
                                </Container>
                                    : <Card.Text className="text-center">Loading...</Card.Text>}
                            </Card.Body>

                        </Card>
                    </NavLink>
                </Col >)
>>>>>>> rewrite
        } else {
            return null
        }
    }

    return RenderPokemonCard()
}

export const RenderDetails = () => {

    return (<p>How much wood could a wood chuck norris chuck if a wood chuck norris could chuck your moms wood</p>)

}
export default RenderMonster