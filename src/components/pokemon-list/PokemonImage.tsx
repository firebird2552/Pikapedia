import {useQuery} from 'react-query'
import axios from 'axios'


interface IPokemonImageProps {
  url:string
name: string}
export const PokemonImage = ({url,name }:IPokemonImageProps) => {
  const LoadPokemonImage = useQuery(['imgLoad', name, url], async () => await axios.get(url), {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })

  return (
    <div>
      {LoadPokemonImage.isLoading? <div>Loading...</div> : 
      <img src={url} alt={name} />
  }
    </div>
  );
};
