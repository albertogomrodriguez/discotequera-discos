import React, { useState, useEffect } from "react";

function DiscosNovedad() {
  const [albums, setAlbums] = useState([]);
  const numberOfAlbumsToShow = 4;

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const apiKey = "263aec0d9a7d89aa317ddb7cd7268328";
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=${apiKey}&format=json`
        );

        if (!response.ok) {
          throw new Error("Error fetching data from Last.fm API");
        }

        const data = await response.json();
        const albums = data?.albums?.album || [];
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
          <div key={album.name}>
            <img
              src={album.image[2]["#text"]}
              alt={`caratula ${album.name} disco`}
            />
            <h4>{album.name}</h4>
            <p>Tipo de formato</p>
            <p>Precio</p>
            <div>
              <button>Añadir</button>
              <button>Comprar</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h3>Ver todos los discos disponibles</h3>
      </div>
    </section>
  );
}

export default DiscosNovedad;
