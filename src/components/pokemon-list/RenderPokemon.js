
// library imports
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import NavLink from 'react-bootstrap/NavLink'


import RenderMonster from './RenderMonster'
// import { RenderDetails } from './RenderMonster'


const toggleDisplay = (pokemon) => {
    // Assign the current displayDetails to a temp variable
    pokemon.displayDetails = !pokemon.displayDetails
}

/** Render a pokemon without their detail box */
const RenderOnePokemon = ({ pokemon, id }) => {
    return (
        <Col key={pokemon.pokemon_species.name} className="col-12 col-md-6 col-lg-4">
            <NavLink onClick={() => {
                toggleDisplay(pokemon)
            }}>
                <RenderMonster id={pokemon.entry_number} monster={pokemon.pokemon_species} />
            </NavLink>
        </Col>
    )
}

/** Render a pokemon with their detail box */
const RenderOnePokemonWithDetails = ({ pokemon, id }) => {
    return (
        <Container>
            <Row>
                <RenderOnePokemon pokemon={pokemon} id={id} />
                <Col className="col-12 col-md-6 col-lg-8">
                    {/* <RenderDetails /> */}
                </Col>
            </Row>
        </Container>
    )

}
/**  
 * Iterates through all pokemon in the pokemon list 
 * creates a jsx element for each one 
 * depending on if it is displaying its details or not
 */

const RenderPokemon = (pokemon, id) => {
    let renderedPokemon
    if (pokemon.displayDetails) {
        // console.log("Pikapedia.net -> RenderPokemon -> with details")
        renderedPokemon = <RenderOnePokemonWithDetails pokemon={pokemon} id={id} />
    } else {
        renderedPokemon = <RenderOnePokemon key={pokemon.pokemon_species.name} pokemon={pokemon} id={id} />
    }

    return renderedPokemon
}

export default RenderPokemon