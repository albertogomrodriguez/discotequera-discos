import React, { useState } from "react";
import "./styles.css";

function Perfil() {
  // Obtener los detalles de álbumes favoritos desde localStorage
  const [savedAlbums, setSavedAlbums] = useState(
    JSON.parse(localStorage.getItem("savedAlbums")) || []
  );
  const usernameSaved = localStorage.getItem("username") || "";

  const handleEliminarLocalStorage = (albumUrl) => {
    // Filtrar los álbumes para mantener solo aquellos que no coinciden con la URL proporcionada
    const updatedAlbums = savedAlbums.filter((album) => album.url !== albumUrl);

    // Actualizar el estado y el localStorage con la nueva lista de álbumes
    setSavedAlbums(updatedAlbums);
    localStorage.setItem("savedAlbums", JSON.stringify(updatedAlbums));
  };

  return (
    <section className="perfil-discos">
      <h3>Mi perfil</h3>
      <div>
        <h5>Nombre de usuario: {usernameSaved}</h5>
        {savedAlbums.length > 0 ? (
          <>
            <p>Discos favoritos:</p>
            <div className="muestra-discos">
              {savedAlbums.map((album) => (
                <div key={album.id}>
                  {" "}
                  {/* Usar una propiedad única como la ID del álbum */}
                  <a
                    href={album.url || album.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={album.imageUrl || album.images[1]?.url || ""}
                      alt={`carátula ${album.name} disco`}
                    />
                    <div>
                      <h4>{album.name}</h4>
                      <p>{album.artist || album.artists[0]?.name}</p>
                    </div>
                  </a>
                  <div>
                    <button>Comprar</button>
                    <button
                      onClick={() => handleEliminarLocalStorage(album.url)}
                    >
                      Eliminar de favoritos
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>Aún no tienes ningún álbum en favoritos.</p>
        )}
      </div>
    </section>
  );
}

export default Perfil;
