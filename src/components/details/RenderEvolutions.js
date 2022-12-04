// React imports
import React, { useState, useEffect } from 'react'

//Library imports
import axios from 'axios'

//React-Bootstrap imports
import Card from 'react-bootstrap/Card'

const RenderEvolution = ({ evolutionChain }) => {
    const [loading, setLoading] = useState(true)
    const [evolutionList, setEvolutionList] = useState({})

    const GetEvolutions = async () => {
        await axios.get(evolutionChain.url).then(response => {
            evolutionChain = { ...response.data }
        })
        await axios.get(evolutionChain.chain.species.url).then(response => {
            evolutionChain.chain.species = { ...response.data }
        })
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolutionChain.chain.species.id}`)
            .then(response => {
                evolutionChain.chain.species = { ...response.data }
            })
        for (let i = 0; i < evolutionChain.chain.evolves_to.length; i++) {

            let evolves_to = evolutionChain.chain.evolves_to[i]
            await axios.get(evolves_to.species.url).then(response => {
                evolves_to.species = { ...response.data }
            })
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolves_to.species.id}`)
                .then(response => {
                    evolves_to.species = { ...response.data }
                })
            for (let secondEvo = 0; secondEvo < evolves_to.evolves_to.length; secondEvo++) {

                await axios.get(evolves_to.evolves_to[secondEvo].species.url).then(response => {
                    evolves_to.evolves_to[secondEvo].species = { ...response.data }
                })
                await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolves_to.evolves_to[secondEvo].species.id}`)
                    .then(response => {
                        evolves_to.evolves_to[secondEvo].species = { ...response.data }
                    })
            }

            // Load all version groups then all versions
        }

        setEvolutionList(Object.assign(evolutionChain.chain, { isUpdated: true }))
    }

    useEffect(() => {
        if (loading) {
            GetEvolutions()
        }
        if (evolutionList.isUpdated) {
            setLoading(false)
        }
    }, [evolutionList]);

    let evolutions = []

    if (!loading) {
        let evolutionItems = () => {
            let firstEvo = (
                <Card>
                    <Card.Header>
                        <Card.Subtitle className="text-center text-uppercase">
                            {evolutionList.species.name}
                        </Card.Subtitle>
                    </Card.Header>
                    <Card.Img src={evolutionList.species.sprites.front_default} />
                    <Card.Body>
                        <Card.Text className="text-center">
                            Level
                        </Card.Text>
                        <Card.Text className="text-center">
                            {evolutionList.evolves_to[0].evolution_details[0].min_level}
                        </Card.Text>
                    </Card.Body>
                </Card>)

            let secondEvo = []
            let thirdEvo = []
            for (let evo = 0; evo < evolutionList.evolves_to.length; evo++) {

                const evolvesTo = evolutionList.evolves_to[evo]
                console.log(evolvesTo)
                secondEvo.push(
                    <Card>
                        <Card.Header>
                            <Card.Subtitle className="text-center text-uppercase">
                                {evolvesTo.species.name}
                            </Card.Subtitle>
                        </Card.Header>
                        <Card.Img src={evolvesTo.species.sprites.front_default} />
                        <Card.Body>
                            <Card.Text className="text-center">
                                Level
                            </Card.Text>
                            <Card.Text className="text-center">
                                {evolvesTo.evolves_to[0].evolution_details[0].min_level}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
                for (let evoTwo = 0; evoTwo < evolvesTo.evolves_to.length; evoTwo++) {
                    thirdEvo.push(
                        <Card>
                            <Card.Header>
                                <Card.Subtitle className="text-center text-uppercase">
                                    {evolvesTo.evolves_to[evoTwo].species.name}
                                </Card.Subtitle>
                            </Card.Header>
                            <Card.Img src={evolvesTo.evolves_to[evoTwo].species.sprites.front_default} />
                            <Card.Body>
                            </Card.Body>
                        </Card>
                    )
                }
            }
            let evoList = []
            evoList.push(firstEvo)
            evoList.push(secondEvo)
            evoList.push(thirdEvo)


            return evoList
        }

        evolutions = evolutionItems()
    } else { evolutions = <Card.Title className="text-center">Loading...</Card.Title> }

    return evolutions

}

export default RenderEvolution