import React from "react";

function ResultadosBusqueda({ albums }) {
  console.log("Resultados en ResultadosBusqueda:", albums);

  return (
    <div className="muestra-discos">
      {albums && albums.length > 0 ? (
        albums.map((album) => (
          <div key={album.url}>
            <a href={album.url} target="_blank" rel="noopener noreferrer">
              <img src={album.imageUrl} alt={`carátula ${album.name} disco`} />
            </a>
            <div>
              <h4>
                <a href={album.url} target="_blank" rel="noopener noreferrer">
                  {album.name}
                </a>
              </h4>
              <h5>
                {album.artists.map((artist) => (
                  <span key={artist.url}>
                    <a
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {artist.name}
                    </a>{" "}
                  </span>
                ))}
              </h5>
            </div>
            <div>
              <button>Añadir</button>
              <button>Comprar</button>
            </div>
          </div>
        ))
      ) : (
        <p>No hay resultados de búsqueda</p>
      )}
    </div>
  );
}

export default ResultadosBusqueda;
