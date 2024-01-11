import React, { useState, useEffect } from "react";

function DiscosRecomendados() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const numberOfAlbumsToShow = 4;

  useEffect(() => {
    const fetchRecommendedAlbums = async () => {
      try {
        const clientId = "603135e3304a47d1933ce7e43c29416c";
        const clientSecret = "d8e949e9d8ed485e9d16654335845319";
        const tokenEndpoint = "https://accounts.spotify.com/api/token";

        // Obtener token de acceso de Spotify
        const tokenResponse = await fetch(tokenEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
          },
          body: "grant_type=client_credentials",
        });

        if (!tokenResponse.ok) {
          throw new Error("Error al obtener el token de acceso de Spotify");
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Obtener recomendaciones de Spotify
        const response = await fetch(
          "https://api.spotify.com/v1/recommendations?market=ES&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=french,indie,indie-pop&seed_tracks=0c6xIDDpzE81m2q797ordA",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al obtener recomendaciones de Spotify");
        }

        const data = await response.json();
        const recommendedAlbums =
          data?.tracks.map((track) => track.album) || [];
        setAlbums(recommendedAlbums.slice(0, numberOfAlbumsToShow));
        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
      }
    };

    fetchRecommendedAlbums();
  }, [numberOfAlbumsToShow]);

  const handleAddToLocalStorage = (album) => {
    try {
      // Obtener la lista actual de álbumes favoritos del localStorage
      const savedAlbums = JSON.parse(localStorage.getItem("savedAlbums")) || [];

      // Verificar si el álbum ya está en la lista antes de agregarlo
      if (!savedAlbums.some((savedAlbum) => savedAlbum.id === album.id)) {
        // Agregar el nuevo álbum a la lista
        savedAlbums.push(album);

        // Actualizar el localStorage
        localStorage.setItem("savedAlbums", JSON.stringify(savedAlbums));
      }
    } catch (error) {
      console.error(
        "Error al agregar el álbum al localStorage:",
        error.message
      );
    }
  };

  return (
    <section className="recomendaciones-discos">
      <div>
        <h3>Selección de golpes por Discotequera Discos</h3>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="muestra-discos">
          {albums.map((album) => (
            <div key={album.id}>
              <a
                href={album.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={album.images[1]?.url}
                  alt={`caratula ${album.name} disco`}
                />
              </a>
              <div>
                <h4>
                  <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {album.name}
                  </a>
                </h4>
                <h5>
                  <a
                    href={album.artists[0]?.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {album.artists[0]?.name}
                  </a>
                </h5>
              </div>
              <div>
                <button onClick={() => handleAddToLocalStorage(album)}>
                  Añadir
                </button>
                <button>Comprar</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <a href="/todos-los-discos">Ver todos los álbums recomendados</a>
      </div>
    </section>
  );
}

export default DiscosRecomendados;
