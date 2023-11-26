import axios from 'axios'
import { IMoveDetails } from '../support/MoveInterfaces'

export const getDetails = async (url:string) => {
    let detailsPromise = axios.get(url)
    //     .then(response => {

    //     setDetails(response.data)
    // }
    //     , (error => {
    //         console.log(error)
    //     }))
    let details = await detailsPromise
    return details
}

export const getVersions = async () => {
    let versionsPromise = await axios.get("https://pokeapi.co/api/v2/version-group/")
    let versions = await versionsPromise.data.results

    for (let i = 0; i < versions.length; i++) {
        let versionPromise = await axios.get(versions[i].url)
        let version = await versionPromise.data
        // console.log(`GetData.js -> getVersions -> inside for -> version: ${JSON.stringify(version) }`)
        versions[i] = version
    }

    return versions;
};

export const getMoveDetails = async (moveURL:string) => {
    
    
    let movePromise = await axios.get(moveURL)

    let moveDetails: IMoveDetails = movePromise.data
    // let vgPromise = axios.get(moveDetails?.flavor_text_entries?[moveDetails.flavor_text_entries.length - 3].version_group.url)
    // let version_group = await vgPromise
    // version_group = version_group.data
    // moveDetails = { ...moveDetails, version_group }
    // for (const [key, value] of Object.entries(moveDetails)) {
    //     console.log(`Move Details -> \n Key: ${key}\n Value: ${value}`)
    // }
    return moveDetails
}

// export const getVersionGroups = async (versionGroupUrl) => {

// }