import React from "react";
import "./styles.css";

function Home() {
  return (
    <div>
      <section>
        <h3>Buscador cds</h3>
        <div className="search-box">
        <input
          type="text"
          placeholder="Buscar CDs..."
        />
        <button>Buscar</button>
      </div>
      </section>
      <section>
        <div>
          <h3>Novedades musicales</h3>
        </div>
        <div>
          <img src="" alt="caratula disco"></img>
          <h4>Título disco</h4>
          <p>Tipo de formato</p>
          <p>Precio</p>
          <div>
            <button>Añadir</button>
            <button>Comprar</button>
          </div>
        </div>
        <div>
          <img src="" alt="caratula disco"></img>
          <h4>Título disco</h4>
          <p>Tipo de formato</p>
          <p>Precio</p>
          <div>
            <button>Añadir</button>
            <button>Comprar</button>
          </div>
        </div>
        <div>
          <img src="" alt="caratula disco"></img>
          <h4>Título disco</h4>
          <p>Tipo de formato</p>
          <p>Precio</p>
          <div>
            <button>Añadir</button>
            <button>Comprar</button>
          </div>
        </div>
        <div>
          <h3>Ver todos los discos disponibles</h3>
        </div>
      </section>
      <section></section>
    </div>
  );
}

export default Home;
