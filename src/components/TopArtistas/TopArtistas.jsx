import React, { useState, useEffect } from "react";

function TopArtistas() {
  const [artists, setArtists] = useState([]);
  const numberOfArtistsToShow = 4

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const apiKey = "263aec0d9a7d89aa317ddb7cd7268328";
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${apiKey}&format=json`
        );

        if (!response.ok) {
          throw new Error("Error fetching data from Last.fm API");
        }

        const data = await response.json();
        const topArtists = data?.artists?.artist || [];
        setArtists(topArtists.slice(0, numberOfArtistsToShow));
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    fetchTopArtists();
  }, [numberOfArtistsToShow]);

  return (
    <section className="top-artistas">
      <div>
        <h3>Los golpes musicales de Discotequera Discos</h3>
      </div>
      <div className="muestra-discos">
        {artists.map((artist) => (
          <div key={artist.name}>
            <img
              src={artist.image[2]["#text"]}
              alt={`caratula ${artist.name} disco`}
            />
            <h4>{artist.name}</h4>
            <p>{artist.listeners} oyentes</p>
            <p>Número de álbums: {artist.playcount}</p>
            <div>
              <button>Mas información</button>
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

export default TopArtistas;
