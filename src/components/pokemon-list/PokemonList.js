// React imports
import React, { useState, useEffect, useCallback, useMemo } from 'react'

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
    const [searchKeyword, setSearchKeyword] = useState("")
    const [displayedPokemon, setDisplayedPokemon] = useState(pokemon)
    const [loading, setLoading] = useState(true)
    const [region, setRegion] = useState(2)

    /**
     * When the page loads for the first time -> Load the Kanto region pokemon -> display the pokemon once loaded
     * 
     * Fix search bar
     * change region to dropdown
     * add back in type dropdowns
     */

    const updatedDisplayedPokemon = useMemo(() => {
        let display = []
        let filteredPokemon = searchKeyword.length !== 0 ? pokemon.filter(onePokemon => onePokemon.pokemon_species.name.includes(searchKeyword.toLowerCase())) : pokemon
        if (filteredPokemon.length > 0) {
            for (let i = 0; i < filteredPokemon.length; i++) {
                filteredPokemon.displayDetails = false
                display.push(RenderPokemon(filteredPokemon[i]))
            }
        } else {
            display.push(<Col><h3>No Results</h3></Col>)
        }
        return display
    }, [searchKeyword, pokemon])

    const filterByRegion = regionName => {
        console.log(`filter by region -> region name: ${regionName}`)
        switch (regionName) {
            case "Generation One - Kanto":
                setRegion(2)
                break

            case "Generation Two - Johto":

                setRegion(3)
                break

            case "Generation Three - Hoenn":

                setRegion(4)
                break

            case "Generation Four - Sinnoh":
                setRegion(5)
                break

            case "Generation Five - Unova":
                setRegion(6)
                break

            case "Generation Six - Kalos":
                setRegion(7)
                break

            case "Generation Seven - Alola":
                setRegion(8)
                break

            case "Generation Eight - Galar":
                setRegion(9)
                break

            case "All Generations":
                setRegion(1)
                break
            default:
                setRegion(2)
                break
        }
    }

    const updatePokemon = useCallback(async () => {
        console.log('updatePokemon')
        let pokemonPromise = GetPokemonList(region)
        let pokemonList = await pokemonPromise
        setPokemon(pokemonList)
    }, [region])


    useEffect(() => {
        setLoading(true)
        updatePokemon()
    }, [updatePokemon])

    useEffect(() => {

        if (pokemon.length > 0) {
            setLoading(false)
            setDisplayedPokemon(updatedDisplayedPokemon)
        }
    }, [pokemon, updatedDisplayedPokemon])






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
                                <Form.Control onChange={event => filterByRegion(event.target.value)} as="select" name="generations" id="generationSelect" defaultValue="Generation One - Kanto">
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
