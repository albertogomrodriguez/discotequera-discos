import React, { useState } from "react";

async function searchSpotify(query, accessToken) {
  try {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=album`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al realizar la búsqueda en Spotify");
    }

    const data = await response.json();
    const albums = data?.albums?.items || [];
    return albums.map((album) => ({
      name: album.name,
      url: album.external_urls.spotify,
      imageUrl: album.images[1]?.url,
      artists: album.artists.map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
      })),
    }));
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

function Buscador() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSearchTag, setShowSearchTag] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const clientId = "603135e3304a47d1933ce7e43c29416c"; // Reemplazar con tu propio cliente ID de Spotify
      const clientSecret = "d8e949e9d8ed485e9d16654335845319"; // Reemplazar con tu propio cliente secreto de Spotify
      const tokenEndpoint = "https://accounts.spotify.com/api/token";

      // Obtener token de acceso de Spotify de manera similar a DiscosNovedad
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

      // Realizar búsqueda en Spotify
      if (searchQuery.trim() !== "") {
        const results = await searchSpotify(searchQuery, accessToken);
        const limitedResults = results.slice(0, 4); // Obtener solo los primeros 4 resultados
        setSearchResults(limitedResults);
        setShowSearchTag(true);
      } else {
        setSearchResults([]);
        setShowSearchTag(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchTag(false);
  };

  return (
    <section className="buscador">
      <div>
        <h3>Buscador CDs</h3>
      </div>
      <div className="search-box">
        <div className="search-input-container">
          <input
            type="text"
            placeholder="Buscar CDs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
        </div>
        {showSearchTag && (
          <div className="search-tag">
            {searchQuery}
            <button onClick={handleClearSearch}>&times;</button>
          </div>
        )}
      </div>

      {loading && <p>Cargando...</p>}

      <div className="muestra-discos">
        {searchResults.map((album) => (
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
            {/* Puedes agregar más detalles del álbum según sea necesario */}
            <div>
              <button>Añadir</button>
              <button>Comprar</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* Enlace para ver todos los resultados */}
        <a href="/todos-los-cds">Ver todos los CDs</a>
      </div>
    </section>
  );
}

export default Buscador;
