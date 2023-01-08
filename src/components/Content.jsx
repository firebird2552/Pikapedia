// React imports
import React from 'react'
import { Switch, Route } from 'react-router-dom'

//Library imports

// custom imports
import PokemonList from './pokemon-list/PokemonList'
import PokemonDetails from './details/PokemonDetails'
import MoveDetails from './details/moves/MoveDetails'
import { AdComponent } from './AdComponent'
import { Footer } from './Footer'

//style imports
import '../styles/style.css'
import { legal } from './legal'

//functional react component
const Content = () => {
    return (
        <div>
            <div className="content">
                <Switch>
                    <Route exact path='/' component={PokemonList} />
                    <Route exact path="/pokemon/:pokemonName" component={PokemonDetails} />
                    <Route exact path="/move/:moveName" component={MoveDetails} />
                    <Route exact path="/legal" component={legal} />
                </Switch>
                <AdComponent />
            </div>
            <Footer />
        </div>
    )
}
export default Content