import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
  });

  const email = useRef("");
  const name = useRef("");
  const lastname = useRef("");
  const password = useRef("");

  const userData = {
    email: email.current.value,
    name: name.current.value,
    lastname: lastname.current.value,
    isActive: true,
    roles: "user",
    password: password.current.value,
    myCharacters: 0,
  };

  const navigate = useNavigate();

  const handleSignIn = async () => {
    fetch("http://localhost:3000/users/create", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },

      body: JSON.stringify(userData),
    })
      .then((response) => {
        response.json();
        //alert("Usuario creado correctamente");
        console.log(JSON.stringify(userData));
        //window.open("login.html");
        navigate("/login");
        //this.close();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al crear usuario", err);
        //alert("Error al crear el usuario " + err);
      });
  };

  return (
    <Container>
      <div className="img-hero">
          <img
            className="background-image"
            src="https://images.unsplash.com/photo-1619768470847-f7db55f5d72e?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="hero"
          />
        </div>
      <div className="content">
        <Header login />
        <div className="body">
          <div className="text">
            <h1>Crea tu usuario</h1>
          </div>
          <div className="form">
            <input
              type="email"
              placeholder="Email"
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
              type="name"
              placeholder="Nombre"
              name="name"
              value={formValues.name}
              ref={name}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="lastname"
              placeholder="Apellido"
              name="lastname"
              value={formValues.lastname}
              ref={lastname}
              onChange={(e) =>
                setFormValues({
                  ...formValues,
                  [e.target.name]: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="Contraseña"
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

            <button onClick={handleSignIn}>Registrarse</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  .img-hero {
    position: relative;
    min-height: 100vh; 
  }
  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
  }
  .body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .text {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 2rem;
    color: white;
    h1 {
      padding: 0rem 20rem;
    }
    h4 {
      margin-top: 1.5rem;
    }
    h6 {
      margin-top: 1.5rem;
    }
  }
  .form {
    display: grid;
    width: 60%;
    margin-top: 1.5rem;
    grid-template-columns: "1fr 1fr";
  }
  input {
    color: blue;
    padding: 1.5rem;
    font-size: 1.2rem;
    width: 45rem;
    &:focus {
      outline: none;
    }
  }


  button {
    padding: 0.5rem 1rem;
    background-color: blue;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.05rem;
    width: 20rem;
  }
`;

export default SignUpPage;
