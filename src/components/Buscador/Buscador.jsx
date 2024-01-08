import React from "react";

function Buscador() {
  return (
    <section className="buscador">
    <h3>Buscador cds</h3>
    <div className="search-box">
      <input type="text" placeholder="Buscar CDs..." />
      <button>Buscar</button>
    </div>
  </section>
  );
}

export default Buscador;