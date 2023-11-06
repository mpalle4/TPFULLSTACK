import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const email = useRef("");
  const password = useRef("");

  const loginData = {
    email: email.current.value,
    password: password.current.value,
  };

  const getMyCharacters = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/users/${email.current.value}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json", // Cambiado a "application/json" en lugar de "Application/json"
            "Content-Type": "application/json", // Cambiado a "application/json" en lugar de "Application/json"
          },
        }
      );

      console.log(response.status);

      if (response.status !== 401 && response.status !== 500) {
        const data = await response.json(); // Esperar la resolución de la promesa
        console.log("data");
        console.log(data);
        window.localStorage.setItem(
          "lastId",
          JSON.stringify(data.myCharacters)
        );
        window.localStorage.setItem("userId", JSON.stringify(data.id));
      }
    } catch (err) {
      console.log("Error al obtener el usuario", err);
      alert("Error al obtener el usuario " + err);
    }
  };

  const handleLogin = async () => {
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },

      body: JSON.stringify(loginData),
    })
      .then((response) => {
        console.log(response.status);
        if (response.status !== 401 && response.status !== 500) {
          response.json();
          alert("Login correcto");
          getMyCharacters();
          navigate("/");
          window.localStorage.setItem(
            "loggedUser",
            JSON.stringify(email.current.value)
          );
        } else {
          console.log("Error al logearse");
          alert("Error al logearse ");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al logearse", err);
        alert("Error al logearse " + err);
      });
  };

  // onAuthStateChanged(firebaseAuth, (currentUser) => {
  //   if (currentUser) navigate("/");
  // }); //redirije si ya esta ingresado el usuario
  return (
    <Wrapper>
      <div className="img-hero">
          <img
            className="background-image"
            src="https://images.unsplash.com/photo-1619768470847-f7db55f5d72e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero"
          />
        </div>
      <div className="loginContent">
        <Header />
        <div className="form-wrapper">
          <div className="form">
            <div className="title">
              <h1>Login</h1>
            </div>
            <div className="container">
              <input
                type="email"
                placeholder="email"
                name="email"
                value={formValues.email}
                ref={email}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                value={formValues.password}
                ref={password}
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    [e.target.name]: e.target.value,
                  })
                }
              />
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .loginContent {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
  }
  .form-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    height: 85vh;
  }
  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background-color: white;
    height: 70vh;
    padding: 2rem;
    color: black;
    border-radius: 0.4rem;
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input {
      border-radius: 0.4rem;
      padding: 0.5rem;
      width: 25rem;
      height: 2.4rem;
      outline: none;
    }
    button {
      padding: 1rem;
      background-color: blue;
      border: none;
      cursor: pointer;
      border-radius: 0.4rem;
      height: 3.4rem;
      color: white;
      font-weight: border;
      font-size: 1.05rem;
    }
  }
`;
export default LoginPage;
