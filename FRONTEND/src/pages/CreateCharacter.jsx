import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../components/TopNav";

const CreateCharacter = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    faceImage: "",
    upperBody: "",
    lowerBody: "",
    shoes: "",
    createdBy: "",
  });

  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId1 = window.localStorage.getItem("userId");
    if (userId1 !== null) {
      const userId = userId1.replace(/['"]+/g, "");
      setUserId(userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const [isScrolled, setIsScrolled] = useState(false);
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const characterData = {
    characterId: parseInt(window.localStorage.getItem("lastId")) + 1,
    name: formValues.name,
    faceImage: formValues.faceImage,
    upperBody: formValues.upperBody,
    lowerBody: formValues.lowerBody,
    shoes: formValues.shoes,
    createdBy: window.localStorage.getItem("loggedUser").replace(/['"]+/g, ""),
  };

  const handleCreation = async () => {
    console.log(JSON.stringify(characterData));
    fetch("http://localhost:3000/characters/create", {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },

      body: JSON.stringify(characterData),
    })
      .then((response) => {
        console.log(response.status);
        if (
          response.status !== 401 &&
          response.status !== 500 &&
          response.status !== 409 &&
          response.status !== 404
        ) {
          response.json();
          updateMyCharacters();
          console.log(characterData.characterId);
          navigate("/");
        } else {
          console.log("Error al crearse el personaje");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al crear personaje", err);
        alert("Error al crear el personaje " + err);
      });
  };

  const updateMyCharacters = async () => {
    fetch("http://localhost:3000/users/" + userId + "/edit", {
      method: "PUT",
      headers: {
        Accept: "Application/json",
        "Content-type": "Application/json",
      },
      body: JSON.stringify({
        myCharacters: characterData.characterId,
      }),
    })
      .then((response) => {
        console.log(response.status);
        if (
          response.status !== 401 &&
          response.status !== 500 &&
          response.status !== 409 &&
          response.status !== 404
        ) {
          response.json();
          console.log(userId.replace(/['"]+/g, ""));
          console.log("Personaje editado correctamente");
        } else {
          console.log("Error al editar el personaje");
          alert("Error al editar el personaje ");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log("Error al crear personaje", err);
        alert("Error al crear el personaje " + err);
      });
  };

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <TopNav isScrolled={isScrolled} />
      <div className="content">
        <div className="body">
          <div className="text">
            <h2>Crear nuevo personaje</h2>
          </div>
          <div className="form">
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <div className="options">
              <h3>Cara:</h3>
              <label htmlFor="faceImage" className="faceImage">
                <input
                  type="radio"
                  name="faceImage"
                  value="https://png.pngtree.com/png-clipart/20230916/original/pngtree-santa-clause-cartoon-character-face-vector-illustration-illustr-3-clipart-png-image_12249150.png"
                  checked={
                    formValues.faceImage ===
                    "https://png.pngtree.com/png-clipart/20230916/original/pngtree-santa-clause-cartoon-character-face-vector-illustration-illustr-3-clipart-png-image_12249150.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://png.pngtree.com/png-clipart/20230916/original/pngtree-santa-clause-cartoon-character-face-vector-illustration-illustr-3-clipart-png-image_12249150.png"
                  alt="Face 1"
                />
              </label>
              <label htmlFor="faceImage" className="faceImage">
                <input
                  type="radio"
                  name="faceImage"
                  value="https://images.vexels.com/media/users/3/132727/isolated/lists/d30d8aa7ae9084c7b110493c3effa568-personaje-de-cabeza-de-dibujos-animados-de-mujer.png"
                  checked={
                    formValues.faceImage ===
                    "https://images.vexels.com/media/users/3/132727/isolated/lists/d30d8aa7ae9084c7b110493c3effa568-personaje-de-cabeza-de-dibujos-animados-de-mujer.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://images.vexels.com/media/users/3/132727/isolated/lists/d30d8aa7ae9084c7b110493c3effa568-personaje-de-cabeza-de-dibujos-animados-de-mujer.png"
                  alt="Face 2"
                />
              </label>
              <label htmlFor="faceImage" className="faceImage">
                <input
                  type="radio"
                  name="faceImage"
                  value="https://static.vecteezy.com/system/resources/previews/028/209/596/non_2x/happy-student-boy-character-face-3d-illustration-icon-free-png.png"
                  checked={
                    formValues.faceImage ===
                    "https://static.vecteezy.com/system/resources/previews/028/209/596/non_2x/happy-student-boy-character-face-3d-illustration-icon-free-png.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://static.vecteezy.com/system/resources/previews/028/209/596/non_2x/happy-student-boy-character-face-3d-illustration-icon-free-png.png"
                  alt="Face 3"
                />
              </label>
            </div>
            <div className="options">
              <h3>Torso:</h3>
              <label htmlFor="upperBody" className="upperBody">
                <input
                  type="radio"
                  name="upperBody"
                  value="https://images.vexels.com/media/users/3/210392/isolated/preview/4b717e6330a35159c58df4a566682900-camiseta-argentina-numero-10-dibujada-a-mano.png"
                  checked={
                    formValues.upperBody ===
                    "https://images.vexels.com/media/users/3/210392/isolated/preview/4b717e6330a35159c58df4a566682900-camiseta-argentina-numero-10-dibujada-a-mano.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://images.vexels.com/media/users/3/210392/isolated/preview/4b717e6330a35159c58df4a566682900-camiseta-argentina-numero-10-dibujada-a-mano.png"
                  alt="Upper body 1"
                />
              </label>
              <label htmlFor="upperBody" className="upperBody">
                <input
                  type="radio"
                  name="upperBody"
                  value="https://png.pngtree.com/png-clipart/20220801/ourmid/pngtree-cartoon-black-t-shirt-png-image_6094390.png"
                  checked={
                    formValues.upperBody ===
                    "https://png.pngtree.com/png-clipart/20220801/ourmid/pngtree-cartoon-black-t-shirt-png-image_6094390.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://png.pngtree.com/png-clipart/20220801/ourmid/pngtree-cartoon-black-t-shirt-png-image_6094390.png"
                  alt="Upper body 2"
                />
              </label>
              <label htmlFor="upperBody" className="upperBody">
                <input
                  type="radio"
                  name="upperBody"
                  value="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58252/running-shirt-emoji-clipart-md.png"
                  checked={
                    formValues.upperBody ===
                    "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58252/running-shirt-emoji-clipart-md.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/58252/running-shirt-emoji-clipart-md.png"
                  alt="Upper body 3"
                />
              </label>
            </div>
            <div className="options">
              <h3>Pantalones:</h3>
              <label htmlFor="lowerBody" className="lowerBody">
                <input
                  type="radio"
                  name="lowerBody"
                  value="https://cdn-icons-png.flaticon.com/512/26/26711.png"
                  checked={
                    formValues.lowerBody ===
                    "https://cdn-icons-png.flaticon.com/512/26/26711.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/26/26711.png"
                  alt="Lower body 1"
                />
              </label>
              <label htmlFor="lowerBody" className="lowerBody">
                <input
                  type="radio"
                  name="lowerBody"
                  value="https://cdn-icons-png.flaticon.com/512/2151/2151350.png"
                  checked={
                    formValues.lowerBody ===
                    "https://cdn-icons-png.flaticon.com/512/2151/2151350.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2151/2151350.png"
                  alt="Lower body 2"
                />
              </label>
              <label htmlFor="lowerBody" className="lowerBody">
                <input
                  type="radio"
                  name="lowerBody"
                  value="https://cdn-icons-png.flaticon.com/512/3531/3531826.png"
                  checked={
                    formValues.lowerBody ===
                    "https://cdn-icons-png.flaticon.com/512/3531/3531826.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3531/3531826.png"
                  alt="Lower body 3"
                />
              </label>
            </div>
            <div className="options">
              <h3>Zapatillas:</h3>
              <label htmlFor="shoes" className="shoes">
                <input
                  type="radio"
                  name="shoes"
                  value="https://images.vexels.com/media/users/3/319649/isolated/preview/ef5558225bf35079e30feb7b327ff2ba-blue-and-purple-soccer-cleats-botines-de-futbol-azules-y-morados-chuteiras-de-futebol-azuis-e-roxas-blaue-und-lila-fuballschuhe.png"
                  checked={
                    formValues.shoes ===
                    "https://images.vexels.com/media/users/3/319649/isolated/preview/ef5558225bf35079e30feb7b327ff2ba-blue-and-purple-soccer-cleats-botines-de-futbol-azules-y-morados-chuteiras-de-futebol-azuis-e-roxas-blaue-und-lila-fuballschuhe.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://images.vexels.com/media/users/3/319649/isolated/preview/ef5558225bf35079e30feb7b327ff2ba-blue-and-purple-soccer-cleats-botines-de-futbol-azules-y-morados-chuteiras-de-futebol-azuis-e-roxas-blaue-und-lila-fuballschuhe.png"
                  alt="Shoes 1"
                />
              </label>
              <label htmlFor="shoes" className="shoes">
                <input
                  type="radio"
                  name="shoes"
                  value="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/57668/ballet-shoes-emoji-clipart-md.png"
                  checked={
                    formValues.shoes ===
                    "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/57668/ballet-shoes-emoji-clipart-md.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://creazilla-store.fra1.digitaloceanspaces.com/emojis/57668/ballet-shoes-emoji-clipart-md.png"
                  alt="Shoes 2"
                />
              </label>
              <label htmlFor="shoes" className="shoes">
                <input
                  type="radio"
                  name="shoes"
                  value="https://png.pngtree.com/png-clipart/20230819/original/pngtree-cartoon-modern-sneakers-accessory-activity-picture-image_8042649.png"
                  checked={
                    formValues.shoes ===
                    "https://png.pngtree.com/png-clipart/20230819/original/pngtree-cartoon-modern-sneakers-accessory-activity-picture-image_8042649.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://png.pngtree.com/png-clipart/20230819/original/pngtree-cartoon-modern-sneakers-accessory-activity-picture-image_8042649.png"
                  alt="Shoes 3"
                />
              </label>
            </div>
            <button onClick={handleCreation}>Crear nuevo personaje</button>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
  }
  h2 {
    margin-top: 80px;
  }
  h3 {
    margin-bottom: 30px;
    margin-right: 40px;
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
    text-align: right;
    font-size: 2rem;
    color: black;
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
    width: 80%;
    margin-top: 1.5rem;
    grid-template-columns: "1fr 1fr";
  }
  .options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    justify-content: center;
    gap: 10px; 
  }
  
  input {
    color: black;
    padding: 0.8rem;
    font-size: 1.2rem;
    width: 20rem;
    &:focus {
      outline: none;
    }
  }
  select {
    color: black;
    padding: 0.8rem;
    font-size: 1.2rem;
    width: 20rem;
    &:focus {
      outline: none;
    }
  }

  button {
    padding: 1rem 1rem;
    background-color: black;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.5rem;
    width: 20rem;
    display: block;
    margin: 0 auto; 
  }


  img {
    width: 100px;
  }
`;

export default CreateCharacter;
