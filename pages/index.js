/** Create a Frontend for an Existing API
One final idea would be to create a nice
interface for an already existing API.
This will help show that you can both interact
with external API’s but also create a decent user interface.

Some fun ones to choose from:

Pokemon API
Harry Potter API
Cryptocurrency API
*/

// React imports
import React, { useState, useEffect } from 'react'
import axios from 'axios'

//Library imports

// custom imports
import Layout from '../Layout/Layout'
import RenderPokemon from '../Components/RenderPokemon'


//functional react component
const FrontendConcept = ({ types, pokemon }) => {
    return (
        <Layout>
            <RenderPokemon types={types} pokemon={pokemon} />
        </Layout>
    )
}


export const getStaticProps = async () => {
    let types = {}
    let pokemon = {}

    const url = 'https://pokeapi.co/api/v2/pokemon/'

    await axios.get(url + `?limit=20`).then(response => {
        pokemon = response.data.results
    }
        , (error => {
            console.log(error)
        }))


    /*await axios('https://pokeapi.co/api/v2/type').then(response => {
        types = response.data.results
    }, (error => {
        console.log("GetTypes: ", error)
    }))*/
    return {
        props: {
            /*types,*/
            pokemon
        }
    }
}
export default FrontendConcept