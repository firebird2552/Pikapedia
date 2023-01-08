// React imports
import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Library imports

// custom imports
import PokemonList from './pokemon-list/PokemonList'
import PokemonDetails from './details/PokemonDetails'
import MoveDetails from './details/moves/MoveDetails'

//functional react component
const Content = () => {
    return (
        <Switch>
            <Route exact path='/' component={PokemonList} />
            <Route path='/Version1'>
                <PokemonList games={["red", "blue"]} />
            </Route>
            <Route exact path="/pokemon/:pokemonName" component={PokemonDetails} />
            <Route exact path="/move/:moveName" component={MoveDetails} />
        </Switch>
    )
}
export default Content