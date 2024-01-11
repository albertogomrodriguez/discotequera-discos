import React, { useState, useEffect } from "react";

function DiscosNovedad() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const numberOfAlbumsToShow = 4;

  useEffect(() => {
    const fetchAlbums = async () => {
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

        // Obtener los nuevos lanzamientos de Spotify
        const response = await fetch(
          "https://api.spotify.com/v1/browse/new-releases",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            "Error al obtener los nuevos lanzamientos de Spotify"
          );
        }

        const data = await response.json();
        const albumsData = data?.albums?.items || [];

        // Almacena los detalles de álbumes en el estado sin afectar el localStorage
        setAlbums(
          albumsData.slice(0, numberOfAlbumsToShow).map((album) => ({
            name: album.name,
            url: album.external_urls.spotify,
            imageUrl: album.images[1]?.url,
            artist: album.artists[0]?.name,
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error("Error:", error.message);
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [numberOfAlbumsToShow]);

  const handleAddToLocalStorage = (album) => {
    try {
      // Obtener la lista actual de álbumes favoritos del localStorage
      const savedAlbums = JSON.parse(localStorage.getItem("savedAlbums")) || [];

      // Verificar si el álbum ya está en la lista antes de agregarlo
      if (!savedAlbums.some((savedAlbum) => savedAlbum.url === album.url)) {
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
    <section className="novedades-discos">
      <div>
        <h3>Novedades musicales</h3>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="muestra-discos">
          {albums.map((album, index) => (
            <div key={index}>
              <a href={album.url} target="_blank" rel="noopener noreferrer">
                <img
                  src={album.imageUrl}
                  alt={`caratula ${album.name} disco`}
                />
                <div>
                  <h4>{album.name}</h4>
                  <p>Artista: {album.artist}</p>
                </div>
              </a>
              <div>
                <button onClick={() => handleAddToLocalStorage(album)}>
                  Añadir a favoritos
                </button>
                <button>Comprar</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>
        <a href="/todos-los-discos">Ver todos los álbums</a>
      </div>
    </section>
  );
}

export default DiscosNovedad;
