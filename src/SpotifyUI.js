import React from "react";

//componenteeeees
/**
 * Componente para manejar login y registro de usuarios
 * - mostrarLogin: boolean para cambiar entre login/registro
 * - setMostrarLogin: funcion para cambiar el estado
 * - datosLogin: estado con email y contraseña para login
 * - setDatosLogin: actualizar estado de login
 * - datosRegistro: estado con datos de registro
 * - setDatosRegistro: actualizar estado de registro
 * - manejarLogin: funcion para procesar login
 * - manejarRegistro: funcion para procesar registro
 */
export const InterfazAutenticacion = ({ 
  mostrarLogin, 
  setMostrarLogin, 
  datosLogin, 
  setDatosLogin, 
  datosRegistro, 
  setDatosRegistro, 
  manejarLogin, 
  manejarRegistro 
}) => (
  <div className="auth-container">
    <div className="auth-card">
      {/* logo de la aplicacion */}
      <div className="auth-logo">
        <i className="fab fa-spotify"></i>
        <h1>Spotify</h1>
      </div>
      
      {/* pestañas para cambiar entre login y registro */}
      <div className="auth-tabs">
        <button className={`auth-tab ${mostrarLogin ? 'active' : ''}`} onClick={() => setMostrarLogin(true)}>
          Iniciar Sesión
        </button>
        <button className={`auth-tab ${!mostrarLogin ? 'active' : ''}`} onClick={() => setMostrarLogin(false)}>
          Registrarse
        </button>
      </div>

      {/* formulario dinamico que cambia entre login y registro */}
      <form className="auth-form" onSubmit={mostrarLogin ? manejarLogin : manejarRegistro}>
        {/* campo de nombre solo visible en registro */}
        {!mostrarLogin && (
          <div className="form-group">
            <input
              type="text"
              placeholder="Nombre completo"
              value={datosRegistro.nombre}
              onChange={(e) => setDatosRegistro({...datosRegistro, nombre: e.target.value})}
              required
            />
          </div>
        )}
        
        {/* campo de email (comun para login y registro) */}
        <div className="form-group">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={mostrarLogin ? datosLogin.email : datosRegistro.email}
            onChange={(e) => mostrarLogin 
              ? setDatosLogin({...datosLogin, email: e.target.value})
              : setDatosRegistro({...datosRegistro, email: e.target.value})
            }
            required
          />
        </div>
        
        {/* campo de contraseña (comun para login y registro) */}
        <div className="form-group">
          <input
            type="password"
            placeholder="Contraseña"
            value={mostrarLogin ? datosLogin.contraseña : datosRegistro.contraseña}
            onChange={(e) => mostrarLogin
              ? setDatosLogin({...datosLogin, contraseña: e.target.value})
              : setDatosRegistro({...datosRegistro, contraseña: e.target.value})
            }
            required
          />
        </div>
        
        {/* campo de confirmacion de contraseña (solo registro) */}
        {!mostrarLogin && (
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={datosRegistro.confirmarContraseña}
              onChange={(e) => setDatosRegistro({...datosRegistro, confirmarContraseña: e.target.value})}
              required
            />
          </div>
        )}
        
        {/* boton de envio del formulario */}
        <button type="submit" className="auth-button">
          {mostrarLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>
    </div>
  </div>
);


/**
 * Componente de barra lateral con menu de navegacion
 *  es estatico
 */
export const BarraLateral = () => (
  <div className="sidebar">
    {/* logo de la aplicacion */}
    <div className="logo">
      <i className="fab fa-spotify"></i>
      <span>Spotify</span>
    </div>
    
    {/* menu principal de navegacion */}
    <nav className="nav-menu">
      <div className="nav-item active">
        <i className="fas fa-home"></i>
        <span>Inicio</span>
      </div>
      <div className="nav-item">
        <i className="fas fa-search"></i>
        <span>Buscar</span>
      </div>
      <div className="nav-item">
        <i className="fas fa-book"></i>
        <span>Tu biblioteca</span>
      </div>
    </nav>

    {/* acciones relacionadas con playlists */}
    <div className="playlist-actions">
      <div className="create-playlist">
        <i className="fas fa-plus-square"></i>
        <span>Crear playlist</span>
      </div>
      <div className="liked-songs">
        <i className="fas fa-heart"></i>
        <span>Tus me gusta</span>
      </div>
    </div>
  </div>
);

// El menu desplegable
/**
 * Componente para el menu desplegable del usuario

 * - mostrarMenuUsuario: boolean para controlar visibilidad
 * - setMostrarMenuUsuario: funcion para mostrar/ocultar
 * - referenciaMenuDesplegable: ref para cerrar al hacer clic fuera
 * - manejarCerrarSesion: funcion para logout
 */
export const MenuUsuarioDesplegable = ({ 
  mostrarMenuUsuario, 
  setMostrarMenuUsuario, 
  referenciaMenuDesplegable, 
  manejarCerrarSesion 
}) => (
  <div className="user-menu-container" ref={referenciaMenuDesplegable}>
    {/* boton para abrir/cerrar el menu */}
    <div className="user-menu" onClick={() => setMostrarMenuUsuario(!mostrarMenuUsuario)}>
      <div className="user-avatar">
        <i className="fas fa-user"></i>
      </div>
      <span className="user-name">Usuario</span>
      {/* icono que cambia segun el estado */}
      <i className={`fas fa-chevron-${mostrarMenuUsuario ? 'up' : 'down'}`}></i>
    </div>

    {/* menu desplegable - solo visible cuando mostrarMenuUsuario es true */}
    {mostrarMenuUsuario && (
      <div className="user-dropdown">
        <div className="dropdown-item" onClick={manejarCerrarSesion}>
          <i className="fas fa-sign-out-alt"></i>
          <span>Cerrar sesión</span>
        </div>
      </div>
    )}
  </div>
);

// carrucel
/**
 * Componente de carrusel para mostrar canciones

 * - canciones: array de canciones a mostrar
 * - referenciaCanciones: ref para controlar el scroll
 * - desplazarCarrusel: funcion para mover el carrusel
 * - reproducirCancion: funcion para reproducir cancion al hacer clic
 */
export const Carrusel = ({ 
  canciones, 
  referenciaCanciones, 
  desplazarCarrusel, 
  reproducirCancion 
}) => (
  <div className="carousel-container">
    {/* flecha izquierda para desplazar */}
    <button className="carousel-arrow left" onClick={() => desplazarCarrusel('izquierda')}>
      <i className="fas fa-chevron-left"></i>
    </button>
    
    {/* contenedor del carrusel con scroll horizontal */}
    <div className="carousel" ref={referenciaCanciones}>
      {canciones.map(cancion => (
        <div key={cancion.id} className="track-card" onClick={() => reproducirCancion(cancion)}>
          {/* imagen de portada de la cancion */}
          <div className="track-image" style={{backgroundImage: `url(${cancion.portada_url})`}} />
          {/* informacion de la cancion */}
          <div className="track-card-info">
            <h4>{cancion.titulo}</h4>
            <p>{cancion.artista}</p>
          </div>
        </div>
      ))}
    </div>
    
    {/* flecha derecha para desplazar */}
    <button className="carousel-arrow right" onClick={() => desplazarCarrusel('derecha')}>
      <i className="fas fa-chevron-right"></i>
    </button>
  </div>
);

// desplegable de album
/**
 *  panel lateral para mostrar detalles del album

 * - mostrarPanelAlbum: boolean para controlar visibilidad
 * - albumActual: objeto con datos del album
 * - cancionesAlbum: array de canciones del album
 * - cancionActual: cancion que se esta reproduciendo
 * - setMostrarPanelAlbum: funcion para cerrar panel
 * - reproducirCancionAlbum: funcion para reproducir cancion del album
 */
export const PanelAlbum = ({ 
  mostrarPanelAlbum, 
  albumActual, 
  cancionesAlbum, 
  cancionActual, 
  setMostrarPanelAlbum, 
  reproducirCancionAlbum 
}) => (
  <>
    {/* panel lateral que se desliza desde la derecha */}
    <div className={`album-panel ${mostrarPanelAlbum ? 'open' : ''}`}>
      {/* encabezado del panel con boton de cerrar */}
      <div className="album-panel-header">
        <button className="close-panel-btn" onClick={() => setMostrarPanelAlbum(false)}>
          <i className="fas fa-times"></i>
        </button>
        <h3>Lista de reproducción</h3>
      </div>

      {/* informacion del album (solo si hay album seleccionado) */}
      {albumActual && (
        <div className="album-info">
          <div className="album-cover" style={{backgroundImage: `url(${albumActual.portada})`}} />
          <div className="album-details">
            <h2>{albumActual.nombre}</h2>
            <p>{albumActual.artista}</p>
            <p>{cancionesAlbum.length} canciones</p>
          </div>
        </div>
      )}

      {/* lista de canciones del album */}
      <div className="tracks-list">
        {cancionesAlbum.map((cancion, indice) => (
          <div 
            key={cancion.id} 
            className={`track-item ${cancionActual?.id === cancion.id ? 'playing' : ''}`} 
            onClick={() => reproducirCancionAlbum(cancion)}
          >
            {/* numero de cancion o icono de volumen si esta sonando */}
            <div className="track-number">
              {cancionActual?.id === cancion.id ? <i className="fas fa-volume-up"></i> : indice + 1}
            </div>
            {/* informacion de la cancion */}
            <div className="track-info-panel">
              <div className="track-title">{cancion.titulo}</div>
              <div className="track-artist-panel">{cancion.artista}</div>
            </div>
            {/* duracion de la cancion */}
            <div className="track-duration">{cancion.duracion || '0:00'}</div>
          </div>
        ))}
      </div>
    </div>

    {/* overlay para cerrar panel al hacer clic fuera */}
    {mostrarPanelAlbum && <div className="panel-overlay" onClick={() => setMostrarPanelAlbum(false)}></div>}
  </>
);

// 
/**
 * barra de reproductor en la parte inferior

 * - cancionActual: cancion que se esta reproduciendo
 * - estaSonando: boolean para estado de play/pause
 * - alternarReproduccion: funcion para play/pause
 */
export const BarraReproductor = ({ 
  cancionActual, 
  estaSonando, 
  alternarReproduccion 
}) => (
  <div className="player-bar">
    {/* informacion de la cancion actual */}
    <div className="player-track-info">
      <div className="track-cover" style={{backgroundImage: `url(${cancionActual?.portada_url})`}} />
      <div className="track-details">
        <div className="track-name">{cancionActual?.titulo || "Selecciona una canción"}</div>
        <div className="track-artist">{cancionActual?.artista || "Artista"}</div>
      </div>
      {/* boton para marcar como favorito */}
      <button className="like-btn"><i className="far fa-heart"></i></button>
    </div>

    {/* controles principales de reproduccion */}
    <div className="player-controls">
      <div className="control-buttons">
        <button className="control-btn"><i className="fas fa-random"></i></button>
        <button className="control-btn"><i className="fas fa-step-backward"></i></button>
        {/* boton principal de play/pause */}
        <button className="play-pause-btn" onClick={alternarReproduccion}>
          <i className={`fas ${estaSonando ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <button className="control-btn"><i className="fas fa-step-forward"></i></button>
        <button className="control-btn"><i className="fas fa-redo"></i></button>
      </div>

      {/* barra de progreso de la cancion */}
      <div className="progress-container">
        <span className="time-current">1:30</span>
        <input type="range" min="0" max="100" value="30" className="progress-slider" />
        <span className="time-total">3:45</span>
      </div>
    </div>

    {/* controles de volumen */}
    <div className="volume-controls">
      <button className="control-btn"><i className="fas fa-volume-up"></i></button>
      <input type="range" min="0" max="100" value="70" className="volume-slider-input" />
    </div>
  </div>
);