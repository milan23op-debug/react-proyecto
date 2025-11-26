import React, { useState, useEffect, useRef } from "react";
import "./Pokedex.css"; 

export default function Pokedex() {
  const [pokemones, setPokemones] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [theme, setTheme] = useState("default");
  const [fontStyle, setFontStyle] = useState("default");
  const [buttonStyle, setButtonStyle] = useState("default");
  const carouselRef = useRef(null);
  const autoScrollRef = useRef(null);
  const dropdownRef = useRef(null);
  const styleDropdownRef = useRef(null);

  const listarPokemones = async () => {
    const res = await fetch("http://localhost/pokedex/conexion.php?accion=listar");
    const data = await res.json();
    setPokemones(data);
  };

  const verPokemon = async (id) => {
    const res = await fetch(`http://localhost/pokedex/conexion.php?accion=obtener&id_pokemon=${id}`);
    const data = await res.json();
    setPokemon(data);
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const startAutoScroll = () => {
    if (!carouselRef.current || isPaused) return;

    const carousel = carouselRef.current;
    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth;
    

    if (carousel.scrollLeft >= maxScrollLeft - 10) {
      carousel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carousel.scrollBy({ left: 160, behavior: 'smooth' });
    }
  };

  // Función para cambiar el tema
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    setShowThemeDropdown(false);
    localStorage.setItem('pokedexTheme', newTheme);
  };

  // Función para cambiar tipografía
  const changeFontStyle = (newFont) => {
    setFontStyle(newFont);
    setShowStyleDropdown(false);
    localStorage.setItem('pokedexFont', newFont);
  };

  // Función para cambiar forma de botones
  const changeButtonStyle = (newButtonStyle) => {
    setButtonStyle(newButtonStyle);
    setShowStyleDropdown(false);
    localStorage.setItem('pokedexButtonStyle', newButtonStyle);
  };

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowThemeDropdown(false);
      }
      if (styleDropdownRef.current && !styleDropdownRef.current.contains(event.target)) {
        setShowStyleDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('pokedexTheme');
    const savedFont = localStorage.getItem('pokedexFont');
    const savedButtonStyle = localStorage.getItem('pokedexButtonStyle');
    
    if (savedTheme) setTheme(savedTheme);
    if (savedFont) setFontStyle(savedFont);
    if (savedButtonStyle) setButtonStyle(savedButtonStyle);
  }, []);

  useEffect(() => {
    listarPokemones();
  }, []);

  useEffect(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    if (!isPaused) {
      autoScrollRef.current = setInterval(startAutoScroll, 2000);
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isPaused, pokemones]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <div className={`pokedex pokedex-${theme} font-${fontStyle}`}>
      <div className="barra-sup">
        <div className="dropdown-container" ref={styleDropdownRef}>
          <button 
            className="config-Pok" 
            onClick={() => setShowStyleDropdown(!showStyleDropdown)}
          >
            Estilos
          </button>
          {showStyleDropdown && (
            <div className="theme-dropdown">
              <div className="dropdown-section">
                <div className="section-title">Tipografías</div>
                <button onClick={() => changeFontStyle("default")}>Normal</button>
                <button onClick={() => changeFontStyle("modern")}>Moderna</button>
                <button onClick={() => changeFontStyle("retro")}>Retro</button>
                <button onClick={() => changeFontStyle("elegant")}>Elegante</button>
                <button onClick={() => changeFontStyle("comic")}>Cómic</button>
              </div>
              <div className="dropdown-section">
                <div className="section-title">Forma Botones</div>
                <button onClick={() => changeButtonStyle("default")}>Redondeados</button>
                <button onClick={() => changeButtonStyle("circle")}>Círculos</button>
                <button onClick={() => changeButtonStyle("pixel")}>Pixelados</button>
                <button onClick={() => changeButtonStyle("capsule")}>Cápsulas</button>
                <button onClick={() => changeButtonStyle("hexagon")}>Hexágonos</button>
              </div>
            </div>
          )}
        </div>

        <div className="dropdown-container" ref={dropdownRef}>
          <button 
            className="config-Pok" 
            onClick={() => setShowThemeDropdown(!showThemeDropdown)}
          >
            Temas
          </button>
          {showThemeDropdown && (
            <div className="theme-dropdown">
              <button onClick={() => changeTheme("default")}>Default</button>
              <button onClick={() => changeTheme("dark")}>Modo oscuro</button>
              <button onClick={() => changeTheme("fire")}> Fuego</button>
              <button onClick={() => changeTheme("water")}> Agua</button>
              <button onClick={() => changeTheme("grass")}> Planta</button>
              <button onClick={() => changeTheme("electric")}> Eléctrico</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="pokedex-header">POKÉDEX</div>

      <div className="pokemon-container">
        <div>
          <div className="pokemon-title">
            {pokemon ? pokemon.nombre.toUpperCase() : "SELECCIONA UN POKÉMON"}
          </div>
          <img
            className="pokemon-img"
            src={
              pokemon
                ? pokemon.imagen_url
                : "https://images.wikidexcdn.net/mwuploads/wikidex/3/38/latest/20200505160654/Cara_del_sustituto_Switch.png"
            }
            alt="pokemon"
          />
        </div>

        <div className="pokemon-info">
          {pokemon ? (
            <>
              <p><b>No.</b> {pokemon.numero}</p>
              <p><b>Nivel:</b> {pokemon.nivel}</p>
              <p><b>Tipo:</b> {pokemon.tipo}</p>
              <p><b>Habilidad:</b> {pokemon.habilidad}</p>
              <p><b>Altura:</b> {pokemon.altura} m</p>
              <p><b>Peso:</b> {pokemon.peso} kg</p>
            </>
          ) : (
            <p>Selecciona un Pokémon de la lista inferior para ver sus detalles.</p>
          )}
        </div>
      </div>

      <footer 
        className={`carousel-container ${isPaused ? 'paused' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="arrow left" onClick={scrollLeft}>&#10094;</button>
        
        <div className="carousel" ref={carouselRef}>
          {pokemones.map((p) => (
            <button
              key={p.id_pokemon}
              onClick={() => verPokemon(p.id_pokemon)}
              className={`other-btn ${buttonStyle}`}
            >
              <img className="pokemon_c" src={p.imagen_url} alt={p.nombre} />
            </button>
          ))}
        </div>
        
        <button className="arrow right" onClick={scrollRight}>&#10095;</button>
      </footer>
    </div>
  );
}