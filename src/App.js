import React, { useState } from "react";
import Pokedex from "./Pokedex";
import Spotify from "./Spotify";

export default function App() {
  const [pantalla, setPantalla] = useState("spotify");

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        <button onClick={() => setPantalla("spotify")}>Spotify</button>
        <button onClick={() => setPantalla("pokedex")}>Pokédex</button>
      </nav>

      {pantalla === "spotify" && <Spotify />}
      {pantalla === "pokedex" && <Pokedex />}
    </div>
  );
}
