import React, { useState, useEffect } from "react";

function DiscosNovedad() {
  const [albums, setAlbums] = useState([]);
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
        const albums = data?.albums?.items || [];
        setAlbums(albums.slice(0, numberOfAlbumsToShow));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchAlbums();
  }, [numberOfAlbumsToShow]);

  return (
    <section className="novedades-discos">
      <div>
        <h3>Novedades musicales</h3>
      </div>
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
              <h4>{album.name}</h4>
              <h5>{album.artists[0]?.name}</h5>
            </a>
            {/* Puedes agregar más detalles del álbum según sea necesario */}
            <div>
              <button>Añadir</button>
              <button>Comprar</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Enlace para ver todos los álbums */}
        <a href="/todos-los-discos">Ver todos los álbums</a>
      </div>
    </section>
  );
}

export default DiscosNovedad;
