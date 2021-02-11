// React imports
import React, { useState, useEffect } from 'react'
import NavLink from 'react-bootstrap/NavLink'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


//Library imports
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import DisplayImages from './DisplayImages'
import PokemonDetails from '../details/PokemonDetails'

// custom imports

//functional react component
const RenderMonster = ({ id, monster, details = false }) => {
    const [monsterDetails, setMonsterDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [displayDetails, setDisplayDetails] = useState(details)


    const GetDetails = async () => {
        let details = {}
        await axios.get(monster.url).then(response => {
            details = response.data
            axios.get(details.varieties[0].pokemon.url).then(response => {
                details.varieties[0].pokemon = response.data
                setLoading(false)

                setMonsterDetails(details)
            })
        })

    }

    useEffect(() => {
        GetDetails()
        return () => {
        }
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
        const types = monsterDetails.varieties !== undefined ? monsterDetails.varieties[0].pokemon.types.map(type => type.type.name) : []

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

    const toggleDisplay = (event) => {
        console.log(event)
        setDisplayDetails(!displayDetails)
    }

    const RenderPokemonCard = () => {
        if (!loading) {
            if (displayDetails) {
                return (
                    <div>
                        <NavLink onClick={event => toggleDisplay(event)}>
                            <Card>
                                <Card.Header style={cardStyle()}>
                                    <Card.Title className="text-center text-white">
                                        #{id} {monster.name.toUpperCase()}
                                    </Card.Title>
                                    <Container>
                                        <Row>{monsterDetails.varieties !== undefined ? monsterDetails.varieties[0].pokemon.types !== undefined ? monsterDetails.varieties[0].pokemon.types.map(type => {
                                            return (
                                                <Col>
                                                    <Card.Subtitle className=" text-white text-center">
                                                        {type.type.name}
                                                    </Card.Subtitle>
                                                </Col>)
                                        }) : null : null}
                                        </Row>
                                    </Container>
                                </Card.Header>
                                <Card.Body>
                                    {!loading ?
                                        monsterDetails.varieties !== undefined ?
                                            <DisplayImages monsterDetails={monsterDetails} />
                                            : null
                                        : <Card.Text className="text-center">Loading...</Card.Text>}
                                </Card.Body>
                                <PokemonDetails details={monsterDetails} />

                            </Card>

                        </NavLink>
                    </div>
                )
            } else {
                return (
                    <NavLink onClick={event => toggleDisplay(event)}>
                        <Card>
                            <Card.Header style={cardStyle()}>
                                <Card.Title className="text-center text-white">
                                    #{id} {monster.name.toUpperCase()}
                                </Card.Title>
                                <Container>
                                    <Row>{monsterDetails.varieties !== undefined ? monsterDetails.varieties[0].pokemon.types !== undefined ? monsterDetails.varieties[0].pokemon.types.map(type => {
                                        return (
                                            <Col>
                                                <Card.Subtitle className=" text-white text-center">
                                                    {type.type.name}
                                                </Card.Subtitle>
                                            </Col>)
                                    }) : null : null}
                                    </Row>
                                </Container>
                            </Card.Header>
                            <Card.Body>
                                {!loading ?
                                    monsterDetails.varieties !== undefined ?
                                        <DisplayImages monsterDetails={monsterDetails} />
                                        : null
                                    : <Card.Text className="text-center">Loading...</Card.Text>}
                            </Card.Body>

                        </Card>
                    </NavLink>
                )
            }
        } else {
            return null
        }
    }

    return RenderPokemonCard()
}
export default RenderMonster