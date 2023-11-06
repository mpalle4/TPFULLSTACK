import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <div className="logo">
            <img
              src="https://www.generaldefranquicias.com/wp-content/uploads/2022/06/mis-personajes-logo.png"
              alt="logo"
            />
          </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Logearse " : "Registrarse"}
      </button>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
  }
  button {
    padding: 0.7rem;
    background-color: blue;
    border: none;
    cursor: pointer;
    color: white;
    border-radius: 0.5rem;
    font-weight: bolder;
    font-size: 2rem;
  }
`;
export default Header;
