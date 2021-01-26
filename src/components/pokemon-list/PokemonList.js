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
            case "Generation One - Kanto":
                params.limit = 151
                params.offset = 0
                break

            case "Generation Two - Johto":
                params.limit = 100
                params.offset = 151
                break

            case "Generation Three - Hoenn":
                params.limit = 134
                params.offset = 251
                break

            case "Generation Four - Sinnoh":
                params.limit = 107
                params.offset = 386
                break

            case "Generation Five - Unova":
                params.limit = 155
                params.offset = 493
                break

            case "Generation Six - Kalos":
                params.limit = 71
                params.offset = 649
                break

            case "Generation Seven - Alola":
                params.limit = 87
                params.offset = 721
                break

            case "Generation Eight - Galar":
                params.limit = 89
                params.offset = 809
                break

            case "All Generations":
                params.limit = 898
                params.offset = 0
                break
            default:
                params.limit = 151
                params.offset = 0
                break
        }
        return params

    }

    const updateRegion = (event) => {
        const selected = event.target.value
        setRegion(selected)

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
        const selected = document.querySelector('#generationSelect').value;
        setRegion(selected)
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
                            <Form.Group as={Col} className="col-12 col-md-3">
                                <Form.Label>Select a generation/region</Form.Label>
                                <Form.Control onChange={event => updateRegion(event)} as="select" name="generations" id="generationSelect" defaultValue="Generation One - Kanto">
                                    <option>Generation One - Kanto</option>
                                    <option>Generation Two - Johto</option>
                                    <option>Generation Three - Hoenn</option>
                                    <option>Generation Four - Sinnoh</option>
                                    <option>Generation Five - Unova</option>
                                    <option>Generation Six - Kalos</option>
                                    <option>Generation Seven - Alola</option>
                                    <option>Generation Eight - Galar</option>
                                    <option>All Generations</option>
                                </Form.Control>

                            </Form.Group>
                        </Form.Row>
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