// React imports
import React, { useState, useEffect } from 'react'

//Library imports
import axios from 'axios'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

// custom imports
import RenderMonster from './RenderMonster'

//functional react component
const PokemonList = (props) => {


    const [pokemon, setPokemon] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("")
    const [displayedPokemon, setDisplayedPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [region, setRegion] = useState("")

    /**
     * When the page loads for the first time -> Load the Kanto region pokemon -> display the pokemon once loaded
     * 
     * Fix search bar
     * change region to dropdown
     * add back in type dropdowns
     */




    /* const filterPokemon = (pokemonList) => {

        let tempPokemon = pokemonList.filter(monster => {
            if (monster.name.includes(searchKeyword.toLowerCase()))
                return monster
        })
        return tempPokemon
    } */

    const filterByRegion = () => {
        let params = {
            "limit": 151,
            "offset": 0
        }
        switch (region) {
            case "Kanto":
                params.limit = 151
                params.offset = 0
                break

            case "Johto":
                params.limit = 100
                params.offset = 151
                break

            case "Hoenn":
                params.limit = 134
                params.offset = 251
                break

            case "Sinnoh":
                params.limit = 107
                params.offset = 386
                break

            case "Unova":
                params.limit = 155
                params.offset = 493
                break

            case "Kalos":
                params.limit = 71
                params.offset = 649
                break

            case "Alola":
                params.limit = 87
                params.offset = 721
                break

            case "Galar":
                params.limit = 89
                params.offset = 809
                break

            case "All":
                params.limit = 898
                params.offset = 0
                break
            default:
                params.limit = 898
                params.offset = 0
                break
        }
        return params

    }

    const updateRegion = (event) => {
        setRegion(event.target.id)

    }

    /*const filterByType = (event) => {
        console.log("filterByType -> event -> target ->value: ", event.target.value)
    }*/



    useEffect(() => {
        setPokemon([])
        setLoading(true)
        let params = filterByRegion()
        const updatePokemon = async () => {
            let tempPokemon = []

            await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${params.offset}&limit=${params.limit}`).then(response => {
                tempPokemon = response.data.results
                setPokemon(tempPokemon)

            }
                , (error => {
                    console.log(error)
                }))
            // for (let i = 0; i < tempPokemon.length; i++) {

            //     await axios.get(tempPokemon[i].url).then(response => {

            //         tempPokemon[i] = response.data
            //     })
            //     console.log("Pass Number: " + i, "Pokemon: ", tempPokemon)
            // }

            setPokemon(tempPokemon)
        }
        updatePokemon()
    }, [region])

    useEffect(() => {
        if (pokemon.length > 0) {
            setLoading(false)
        }
        updatedDisplayedPokemon()
    }, [pokemon])

    useEffect(() => {
        const checked = document.querySelector('input[type=radio]:checked');
        console.log(checked.id)
        setRegion(checked.id)
    }, []);

    useEffect(() => {
        updatedDisplayedPokemon()



    }, [searchKeyword]);

    const updatedDisplayedPokemon = () => {
        setDisplayedPokemon([])

        let tempPokemon = pokemon
        if (searchKeyword.length > 0) {
            tempPokemon = tempPokemon.filter(onePokemon => onePokemon.name.includes(searchKeyword))
        }

        let display = []

        for (let i = 0; i < tempPokemon.length; i++) {
            let url = tempPokemon[i].url.split('/')
            let id = url[6]
            display.push(<RenderMonster id={id} monster={tempPokemon[i]} />)
        }
        if (display.length === 0) {
            display.push(<Col><h3>No Results</h3></Col>)
        }
        setDisplayedPokemon(display)
    }

    return (

        <Container fluid>
            <Row>
                <Col>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label >Search:</Form.Label>
                                <Form.Control type="text" id="searchBox" onChange={event => setSearchKeyword(event.target.value)} />

                            </Form.Group>
                            {/*types.length !== 0 ?
                                <Container fluid className="col-12 col-md-6">
                                    <Row>
                                        <Form.Group as={Col}>
                                            <Form.Label>Type One:</Form.Label>
                                            <Form.Control onChange={event => filterByType(event)} as="select" id="typeOneSelect">
                                                <option>Any</option>
                                                {types.map(type => <option>{type.name}</option>)}
                                            </Form.Control >
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label>Type Two:</Form.Label>
                                            <Form.Control onChange={event => filterByType(event)} as="select" id="typeTwoSelect">
                                                <option>Any</option>
                                                {types.map(type => <option>{type.name}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                    </Row>
                            </Container> : null*/}
                        </Form.Row>
                        <Form.Group>
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Kanto" type="radio" defaultChecked="true" label="Generation One - Kanto" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Johto" type="radio" label="Generation Two - Johto" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Hoenn" type="radio" label="Generation Three - Hoenn" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Sinnoh" type="radio" label="Generation Four - Sinnoh" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Unova" type="radio" label="Generation Five - Unova" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Kalos" type="radio" label="Generation Six - Kalos" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Alola" type="radio" label="Generation Seven - Alola" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="Galar" type="radio" label="Generation Eight - Galar" inline />
                            <Form.Check onChange={event => updateRegion(event)} name="regioSelectionRadios" id="All" type="radio" label="All Generations" inline />
                        </Form.Group>
                        <Form.Group>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <Row>
                {loading ? <Col>Loading...</Col> : displayedPokemon}
            </Row>
        </Container >

    )
}
export default PokemonList