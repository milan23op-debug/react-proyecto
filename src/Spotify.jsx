import React, { useState, useEffect, useRef } from "react";
import { 
  InterfazAutenticacion, 
  BarraLateral, 
  MenuUsuarioDesplegable, 
  Carrusel, 
  PanelAlbum, 
  BarraReproductor 
} from './SpotifyUI';
import "./Spotify.css";

export default function Spotify() {
  // Estados simples
  const [canciones, setCanciones] = useState([]);
  const [cancionesAlbum, setCancionesAlbum] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);
  const [estaSonando, setEstaSonando] = useState(false);
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [mostrarPanelAlbum, setMostrarPanelAlbum] = useState(false);
  const [mostrarMenuUsuario, setMostrarMenuUsuario] = useState(false);
  const [albumActual, setAlbumActual] = useState(null);
  const [datosLogin, setDatosLogin] = useState({ email: '', contraseña: '' });
  const [datosRegistro, setDatosRegistro] = useState({ nombre: '', email: '', contraseña: '', confirmarContraseña: '' });
  const [mostrarLogin, setMostrarLogin] = useState(true);

  const referenciaMenuDesplegable = useRef(null);
  const referenciaCanciones = useRef(null);

  // Función simple para llamar al API
  const llamadaAPI = async (accion, datos = null) => {
    try {
      let url = `http://localhost/spotify/conexion.php?accion=${accion}`;
      
      // Si es para obtener canciones de álbum, agregar parámetro
      if (datos && accion === 'obtener_canciones_album') {
        url += `&album_id=${datos.album_id}`;
      }

      // Configurar opciones para POST si es login o registro
      let opciones = {};
      if (datos && (accion === 'login' || accion === 'registro')) {
        opciones = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(datos)
        };
      }

      const respuesta = await fetch(url, opciones);
      return await respuesta.json();
    } catch (error) {
      console.error('Error en API:', error);
      return null;
    }
  };

  // Login simple
  const manejarLogin = async (e) => {
    e.preventDefault();
    const resultado = await llamadaAPI('login', datosLogin);
    
    if (resultado && resultado.success) {
      setEstaLogueado(true);
      // Cargar canciones después del login
      const resultadoCanciones = await llamadaAPI('listar_canciones');
      setCanciones(resultadoCanciones || []);
    } else {
      alert(resultado?.message || 'Error en login');
    }
  };

  // Registro simple
  const manejarRegistro = async (e) => {
    e.preventDefault();
    
    // Verificar que las contraseñas coincidan
    if (datosRegistro.contraseña !== datosRegistro.confirmarContraseña) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const resultado = await llamadaAPI('registro', datosRegistro);
    
    if (resultado && resultado.success) {
      alert("Registro exitoso");
      setMostrarLogin(true);
      // Limpiar formulario
      setDatosRegistro({ nombre: '', email: '', contraseña: '', confirmarContraseña: '' });
    } else {
      alert(resultado?.message || 'Error en registro');
    }
  };

  // Cerrar sesión
  const manejarCerrarSesion = () => {
    setEstaLogueado(false);
    setMostrarMenuUsuario(false);
    setCancionesAlbum([]);
    setCancionActual(null);
  };

  // Mover carrusel
  const desplazarCarrusel = (direccion) => {
    if (referenciaCanciones.current) {
      const cantidad = direccion === 'derecha' ? 300 : -300;
      referenciaCanciones.current.scrollBy({ left: cantidad, behavior: 'smooth' });
    }
  };

  // Play/Pause
  const alternarReproduccion = () => {
    setEstaSonando(!estaSonando);
  };

  // Reproducir canción
  const reproducirCancion = async (cancion) => {
    setCancionActual(cancion);
    setEstaSonando(true);
    
    // Si la canción tiene álbum, cargar sus canciones
    if (cancion.album_id) {
      const cancionesDelAlbum = await llamadaAPI('obtener_canciones_album', { 
        album_id: cancion.album_id 
      });
      
      setCancionesAlbum(cancionesDelAlbum || []);
      setAlbumActual({
        nombre: cancion.album,
        artista: cancion.artista,
        portada: cancion.portada_url
      });
      setMostrarPanelAlbum(true);
    }
  };

  // Reproducir canción del álbum
  const reproducirCancionAlbum = (cancion) => {
    setCancionActual(cancion);
    setEstaSonando(true);
  };

  // Cerrar menús al hacer clic fuera
  useEffect(() => {
    const cerrarMenuAlClicExterno = (evento) => {
      if (referenciaMenuDesplegable.current && !referenciaMenuDesplegable.current.contains(evento.target)) {
        setMostrarMenuUsuario(false);
      }
    };

    document.addEventListener("mousedown", cerrarMenuAlClicExterno);
    
    return () => {
      document.removeEventListener("mousedown", cerrarMenuAlClicExterno);
    };
  }, []);

  // Si no está logueado, mostrar pantalla de auth
  if (!estaLogueado) {
    return (
      <InterfazAutenticacion
        mostrarLogin={mostrarLogin}
        setMostrarLogin={setMostrarLogin}
        datosLogin={datosLogin}
        setDatosLogin={setDatosLogin}
        datosRegistro={datosRegistro}
        setDatosRegistro={setDatosRegistro}
        manejarLogin={manejarLogin}
        manejarRegistro={manejarRegistro}
      />
    );
  }

  // Interfaz principal cuando está logueado
  return (
    <div className="spotify-app">
      <BarraLateral />
      
      <div className="main-content">
        <div className="top-bar">
          <MenuUsuarioDesplegable
            mostrarMenuUsuario={mostrarMenuUsuario}
            setMostrarMenuUsuario={setMostrarMenuUsuario}
            referenciaMenuDesplegable={referenciaMenuDesplegable}
            manejarCerrarSesion={manejarCerrarSesion}
          />
        </div>

        <div className="content-area">
          <section className="content-section">
            <div className="section-header">
              <h2 className="section-title">Escuchado recientemente</h2>
              <span className="see-all">Ver todo</span>
            </div>
            
            <Carrusel
              canciones={canciones}
              referenciaCanciones={referenciaCanciones}
              desplazarCarrusel={desplazarCarrusel}
              reproducirCancion={reproducirCancion}
            />
          </section>
        </div>
      </div>

      <PanelAlbum
        mostrarPanelAlbum={mostrarPanelAlbum}
        albumActual={albumActual}
        cancionesAlbum={cancionesAlbum}
        cancionActual={cancionActual}
        setMostrarPanelAlbum={setMostrarPanelAlbum}
        reproducirCancionAlbum={reproducirCancionAlbum}
      />

      <BarraReproductor
        cancionActual={cancionActual}
        estaSonando={estaSonando}
        alternarReproduccion={alternarReproduccion}
      />
    </div>
  );
}