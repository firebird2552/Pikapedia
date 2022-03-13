// React imports
import React, { useState, useEffect } from 'react'
import NavLink from 'react-bootstrap/NavLink'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


//Library imports
import Card from 'react-bootstrap/Card'

// custom imports
import { getPokemonData } from '../../data/RetrievePokemon'
import '../../styles/PokemonCard.css'

//functional react component
const RenderMonster = (props) => {
    // console.log(props)
    const { id, monster } = props
    const [monsterDetails, setMonsterDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [imgLoaded, setImgLoaded] = useState({
        default: {
            front: false,
            back: false,
        },
        shiny: {
            front: false,
            back: false
        },
        female: {

            front: false,
            back: false
        },
        shinyFemale: {

            front: false,
            back: false
        }

    })



    const GetDetails = async () => {

        setMonsterDetails(await getPokemonData(monster["url"]))
        console.log("Monster Detials: ", monsterDetails)
        setLoading(false)
        // })
    }
    useEffect(() => {
        console.log("Monster:", monster)
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
        const types = monsterDetails.types.map(type => type.type.name)
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
                                    {/* <Row>
                                        <Col className="d-flex justify-content-center">
                                            <Card.Subtitle>Standard</Card.Subtitle>
                                        </Col>

                                        {monsterDetails["sprites"].front_shiny !== null ?
                                            <Col className="d-flex justify-content-center"><Card.Subtitle>Shiny</Card.Subtitle></Col> : null}
                                    </Row> */}
                                    <Row>
                                        <Col className="d-flex justify-content-center">
                                            <img onLoad={() => {
                                                let tempImageLoaded = imgLoaded
                                                imgLoaded.default.front = true
                                                setImgLoaded(tempImageLoaded)
                                            }}
                                                src={monsterDetails["sprites"]["other"]["official-artwork"]["front_default"]}
                                                className={imgLoaded.default.front ? "" : "d-none"} alt={`Default apperance for ${monsterDetails.name}`} /> <Card.Title className={imgLoaded.default.front ? "d-none" : ""}>Loading...</Card.Title>
                                        </Col>
                                        {/* {monsterDetails.sprites.front_shiny !== null ? <Col className="d-flex justify-content-center">
                                            <img onLoad={() => {
                                                let tempImageLoaded = imgLoaded
                                                imgLoaded.shiny.front = true
                                                setImgLoaded(tempImageLoaded)
                                            }} src={monsterDetails.sprites.front_shiny} className={imgLoaded.shiny.front ? "" : "d-none"} alt={`Shiny apperance for ${monsterDetails.name}`} /> <Card.Title className={imgLoaded.shiny.front ? "d-none" : ""}>Loading...</Card.Title>
                                        </Col> : null} */}
                                    </Row>
                                </Container>
                                    : <Card.Text className="text-center">Loading...</Card.Text>}
                            </Card.Body>

                        </Card>
                    </NavLink>
                </Col >)
        } else {
            return (
                <Col className="col-12 col-md-6 col-lg-4">
                    <NavLink href={`./pokemon/${monster.name}?number=${id} `} style={{ color: 'inherit' }}>
                        <Card key={id} >
                            <Card.Header>
                                <Card.Title className="text-center">
                                    #{id} {monster.name.toUpperCase()}
                                </Card.Title>
                            </Card.Header>
                            <Card.Body><div>...Loading</div></Card.Body>

                        </Card>
                    </NavLink>
                </Col >)
        }
    }

    return RenderPokemonCard()
}
export default RenderMonster