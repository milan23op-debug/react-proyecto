import React, { useState } from "react";
import Pokedex from "./Pokedex";
import Spotify from "./Spotify";

export default function App() {
  const [pantalla, setPantalla] = useState("spotify"); // por si quieres ampliar a otras pantallas después

  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        
        {/* aquí podrías agregar más botones para otras secciones */}
      </nav>

      {pantalla === "spotify" && <Spotify />}
    </div>
  );
}
