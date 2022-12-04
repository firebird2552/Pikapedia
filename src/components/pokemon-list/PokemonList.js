// React imports
import React, { useState, useEffect } from 'react'

//Library imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

// custom imports
import { GetPokemonList } from '../../api/GetPokemon'
import RenderPokemon from './RenderPokemon'

//functional react component
const PokemonList = (props) => {
    const [pokemon, setPokemon] = useState([])
    const [filteredPokemon, setFilteredPokemon] = useState(pokemon)
    const [searchKeyword, setSearchKeyword] = useState("")
    const [displayedPokemon, setDisplayedPokemon] = useState([])
    const [loading, setLoading] = useState(true)
    const [region, setRegion] = useState(1)

    /**
     * When the page loads for the first time -> Load the Kanto region pokemon -> display the pokemon once loaded
     * 
     * Fix search bar
     * change region to dropdown
     * add back in type dropdowns
     */




    const filterByRegion = () => {
        let params = 1
        switch (region) {
            case "Generation One - Kanto":
                params = 2
                break

            case "Generation Two - Johto":
                params = 3
                break

            case "Generation Three - Hoenn":
                params = 4
                break

            case "Generation Four - Sinnoh":
                params = 5
                break

            case "Generation Five - Unova":
                params = 6
                break

            case "Generation Six - Kalos":
                params = 7
                break

            case "Generation Seven - Alola":
                params = 8
                break

            case "Generation Eight - Galar":
                params = 9
                break

            case "All Generations":
                params = 1
                break
            default:
                params = 2
                break
        }
        return params

    }

    const updateRegion = (event) => {
        const selected = event.target.value
        setRegion(selected)

    }

    useEffect(() => {
        setPokemon([])
        setLoading(true)
        let params = filterByRegion()

        const updatePokemon = async () => {
            let tempPokemon = []
            tempPokemon = GetPokemonList(params)
                .then(result => {
                    tempPokemon = result
                    setPokemon(tempPokemon)
                })
            setPokemon(tempPokemon)
        }
        updatePokemon()
    }, [region])

    useEffect(() => {
        if (pokemon.length > 0) {
            setLoading(false)
            updatedDisplayedPokemon()
        }
    }, [pokemon])

    useEffect(() => {
        let generationSelector = document.querySelector('#generationSelect')
        const selected = generationSelector !== null ? generationSelector.value : undefined;
        setRegion(selected)
    }, []);

    useEffect(() => {
        updatedDisplayedPokemon()
    }, [searchKeyword]);

    const updatedDisplayedPokemon = () => {
        setDisplayedPokemon([])

        let display = []
        setFilteredPokemon(searchKeyword.length > 0 ? pokemon.filter(onePokemon => onePokemon.name.includes(searchKeyword.toLowerCase())) : pokemon)
        if (filteredPokemon.length > 0) {
            for (let i = 0; i < filteredPokemon.length; i++) {
                filteredPokemon.displayDetails = false
                display.push(RenderPokemon(filteredPokemon[i]))
            }
        } else {
            display.push(<Col><h3>No Results</h3></Col>)
        }
        setDisplayedPokemon(display)
    }




    return (
        <Container fluid>
            <Row>
                <Col>
                    <Form onSubmit={e => e.preventDefault()}>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label >Search:</Form.Label>
                                <Form.Control type="text" id="searchBox" onChange={event => setSearchKeyword(event.target.value)} />

                            </Form.Group>
                            {props.games === undefined ? <Form.Group as={Col} className="col-12 col-md-3">
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

                            </Form.Group> : null}
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
            <Container>
                <Row>
                    {loading ? <Col>Loading...</Col> : displayedPokemon}
                </Row>
            </Container>
        </Container >

    )
}
export default PokemonList
