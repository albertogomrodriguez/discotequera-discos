import React from "react";

import Buscador from "./Buscador/Buscador";
import DiscosNovedad from "./Novedades/Novedades";
import DiscosRecomendacion from "./Recomendaciones/Recomendaciones";

import "./styles.css";

function Home() {
  return (
    <div>
      <Buscador />
      <section className="descricpion">
        <h3>La mejor selección de vinilos y cd’s en internet</h3>
        <p>
          Desde 2020 en el mundo de la música, buscando e importando las últimas
          novedades en vinilo e intentando ampliar y enriquecer nuestro catálogo
          de discos día tras día. En nuestra oferta musical siempre podrás
          encontrar títulos de coleccionismo de estilos como el jazz, el soul,
          oldies, indie, punk o el garage, siempre cuidando secciones como la de
          música country, el southern o lo mejor del rock progresivo. No
          pretendemos tener todos los productos del mercado, sino una selección
          de lo que bajo nuestro punto de vista son las referencias más
          representativas e importantes de cada estilo, eso sí, sin olvidarnos
          nunca de los últimas publicaciones y de muchos sellos que consideramos
          puedan ser interesantes para nuestros clientes. Poner a tu alcance la
          mejor colección discográfica en formato físico es nuestra razón de
          ser.
        </p>
      </section>
      <DiscosNovedad />
      <DiscosRecomendacion />
    </div>
  );
}

export default Home;
