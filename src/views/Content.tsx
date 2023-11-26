// React imports
import { Routes, Route } from "react-router-dom";

//Library imports

// custom imports
import PokemonList from "./PokemonList";
import PokemonDetails from "../components/details/PokemonDetails";
// import { MoveDetails } from "../components/details/moves/MoveDetails";

//style imports
import "../styles/style.css";
import { Legal } from "../components/Legal";

//functional react component
const Content = () => {
  return (
    <div>
      <div className="content">
        <Routes>
          <Route
            path="/pokemon/:pokemonName"
            element={<PokemonDetails />}
          />
          {/* <Route path="/move/:moveName" element={<MoveDetails />}/> */}
          <Route path="/legal" element={<Legal />} />
          <Route path="/" element={<PokemonList />} />
        </Routes>
      </div>
    </div>
  );
};
export default Content;
