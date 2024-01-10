import React, { useState, useEffect } from "react";

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
    return albums;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}

function Buscador() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);

        const accessToken = "tu_token_de_acceso"; // Reemplazar con tu propio token de acceso

        if (searchQuery.trim() !== "") {
          const results = await searchSpotify(searchQuery, accessToken);
          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <section className="buscador">
      <div>
        <h3>Buscador CDs</h3>
      </div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Buscar CDs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && <p>Cargando...</p>}

      <div className="muestra-discos">
        {searchResults.map((album) => (
          <div key={album.id}>
            <a
              href={album.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={album.images[1]?.url}
                alt={`carátula ${album.name} disco`}
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
                {album.artists.map((artist) => (
                  <span key={artist.id}>
                    <a
                      href={artist.external_urls.spotify}
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
