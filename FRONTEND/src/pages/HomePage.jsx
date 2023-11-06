import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import SliderContainer from "../components/SliderContainer";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [characters, setCharacters] = useState([]);

  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true); //si no scrolleo
    return () => (window.onscroll = null);
  };

  const getCharacters = async () => {
    try {
      const response = await fetch("http://localhost:3000/characters", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(response.status);

      if (response.status !== 401 && response.status !== 500) {
        const data = await response.json();
        console.log("data");
        console.log(data);
        setCharacters(data);
      }
    } catch (err) {
      console.log("Error al obtener el usuario", err);
      //alert("Error al obtener el usuario " + err);
    }
  };

  useEffect(() => {
    getCharacters();
  });

  return (
    <HomeContainer>
      <div className="hero">
        <TopNav isScrolled={isScrolled} />
        <div className="img-hero">
          <img
            className="background-image"
            src="https://images.unsplash.com/photo-1619768470847-f7db55f5d72e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero"
          />
        </div>
        <div className="container">
          <div className="charactersMap">
            <ul className="character-list">
              {characters.map((character) => (
                <div className="character-item" key={character.id}>
                  <li className="characterName">{character.name}</li>
                  <li>
                    <img
                      className="body-parts"
                      src={character.faceImage}
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      className="body-parts"
                      src={character.upperBody}
                      alt=""
                    />
                  </li>
                  <li>
                    <img
                      className="body-parts"
                      src={character.lowerBody}
                      alt=""
                    />
                  </li>
                  <li>
                    <img className="body-parts" src={character.shoes} alt="" />
                  </li>
                </div>
              ))}
            </ul>
          </div>
          </div>
      </div>
      {/* <SliderContainer movies={movies} */ }
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
.characterName {
  color: white;
  margin-bottom: 10px;
}
.charactersMap {
  display: flex;
  flex-wrap: wrap; /* Para permitir que los elementos se envuelvan en columnas */
  gap: 20px; /* Espacio entre elementos */
}

.character-list {
  list-style: none; /* Quita los puntos de la lista */
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap; /* Para permitir que los elementos se envuelvan en columnas */
  gap: 20px; /* Espacio entre elementos */
}

.character-item {
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 20px;
  width: calc(50% - 20px); /* Ancho del 25% con espacio entre elementos */
  box-sizing: border-box;
}

.body-parts {
  margin-right: 70px;
  max-width: 100px;
  height: auto;
}

  .hero {
    position: relative;
  }

  .img-hero {
    position: relative;
    min-height: 100vh; /* Cambia la altura de la imagen del héroe según tus necesidades */
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title h1 {
    font-size: 48px; /* Tamaño de fuente más grande */
    color: white; /* Color azul (#0074cc) */
    text-shadow: 2px 2px 4px rgba(1, 1, 1, 3); /* Sombra de texto */
  }

`;


export default HomePage;
