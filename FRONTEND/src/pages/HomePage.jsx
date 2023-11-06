import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TopNav from "../components/TopNav";
import SliderContainer from "../components/SliderContainer";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const getCharacters = () => {};

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true); //si no scrolleo
    return () => (window.onscroll = null);
  };

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
          <div className="title">
            <h1>Mis personajes</h1>
          </div>
        </div>
      </div>
      {/* <SliderContainer movies={movies} */ }
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
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
