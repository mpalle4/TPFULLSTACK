import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";

import TopNav from "../components/TopNav";
//import { fetchMovies, getGenres } from "../store/index";
import SliderContainer from "../components/SliderContainer";

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  //const movies = useSelector((state) => state.netflix.movies);
  //const genresLoaded = useSelector((state) => state.netflix.generesLoaded);

  //const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(getGenres());
  }, []);

  const getCharacters = () => {};

  //   useEffect(() => {
  //     //if (genresLoaded) {
  //       //dispatch(fetchMovies({ type: "all" }));
  //     }
  //   });

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
            src="https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg"
            alt="hero"
          />
        </div>
        <div className="container">
          <div className="title">
            <h1>My Characters</h1>
          </div>
        </div>
      </div>
      {/* <SliderContainer movies={movies} /> */}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  .hero {
    position: relative;
    .background-image {
      filter: brightness(40%);
    }
    .img-hero {
      height: 100%;
      width: 100%;
    }
    .container {
      position: absolute;
      bottom: 1rem;
      .title {
        h1 {
          margin-left: 5rem;
          text-transform: uppercase;
          font-size: 73px;
          background: -webkit-linear-gradient(#eee, rgb(128, 13, 13));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        p {
          margin-bottom: -50px;
          width: 640px;
          margin-left: 5rem;
          font-family: "lexend Deca", sans-serif;
          color: white;
        }
      }
      .buttons {
        display: flex;
        margin: 5rem;
        gap: 2rem;
      }
      .playBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: red;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: none;
        cursor: pointer;
      }
      .moreBtn {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: black;
        border-radius: 1rem;
        font-size: 1.4rem;
        gap: 1rem;
        padding: 0.9rem;
        padding-left: 2rem;
        padding-right: 2.4rem;
        border: 0.1rem solid white;
        cursor: pointer;
      }
    }
  }
`;

export default HomePage;
