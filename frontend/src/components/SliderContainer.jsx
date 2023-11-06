import React from "react";
import styled from "styled-components";
import MovieSlider from "./MovieSlider";

const SliderContainer = ({ movies }) => {
  const getMoviesBetween = (start, end) => {
    return movies.slice(start, end);
  };
  return (
    <SliderWrapper>
      <MovieSlider movies={getMoviesBetween(0, 10)} title="Only on Netflix" />
      <MovieSlider movies={getMoviesBetween(10, 20)} title="Trending now" />
      <MovieSlider
        movies={getMoviesBetween(20, 30)}
        title="Popular on Netflix"
      />
      <MovieSlider movies={getMoviesBetween(30, 40)} title="Action Movies" />
      <MovieSlider movies={getMoviesBetween(40, 50)} title="Romantic Movies" />
      <MovieSlider movies={getMoviesBetween(50, 60)} title="Epic" />
      <MovieSlider movies={getMoviesBetween(60, 70)} title="New Releases" />
      <MovieSlider movies={getMoviesBetween(70, 80)} title="Fantasy Movies" />
    </SliderWrapper>
  );
};

const SliderWrapper = styled.div``;

export default SliderContainer;
