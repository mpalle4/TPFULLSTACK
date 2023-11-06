import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import TopNav from "../components/TopNav";

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const CreateCharacter = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    faceImage: "",
    upperBody: "",
    lowerBody: "",
    shoes: "",
  });
  const [isScrolled, setIsScrolled] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const characterData = {
    characterId: "1",
    name: formValues.name,
    faceImage: formValues.faceImage,
    upperBody: formValues.upperBody,
    lowerBody: formValues.lowerBody,
    shoes: formValues.shoes,
  };

  const navigate = useNavigate();

  const handleCreation = async () => {
    console.log(JSON.stringify(characterData));
    fetch("http://localhost:3000/characters/create",{
      method: "POST",
      headers: headers,
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
          alert("Personaje creado correctamente");
          //window.open("login.html");
          navigate("/");
          //this.close();
        } else {
          console.log("Error al crearse el personaje");
          alert("Error al crearse el personaje ");
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
    setIsScrolled(window.pageYOffset === 0 ? false : true); //si no scrolleo
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
              placeholder="name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
            />
            <div className="options">
              <h3>Face:</h3>
              <label htmlFor="faceImage" className="faceImage">
                <input
                  type="radio"
                  name="faceImage"
                  value="https://cdn1.vectorstock.com/i/1000x1000/40/25/cartoon-character-face-boy-children-vector-14814025.jpg"
                  checked={
                    formValues.faceImage ===
                    "https://cdn1.vectorstock.com/i/1000x1000/40/25/cartoon-character-face-boy-children-vector-14814025.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn1.vectorstock.com/i/1000x1000/40/25/cartoon-character-face-boy-children-vector-14814025.jpg"
                  alt="Face 1"
                />
              </label>
              <label htmlFor="faceImage" className="faceImage">
                <input
                  type="radio"
                  name="faceImage"
                  value="https://cdn4.vectorstock.com/i/1000x1000/40/83/cartoon-character-face-boy-children-vector-14814083.jpg"
                  checked={
                    formValues.faceImage ===
                    "https://cdn4.vectorstock.com/i/1000x1000/40/83/cartoon-character-face-boy-children-vector-14814083.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn4.vectorstock.com/i/1000x1000/40/83/cartoon-character-face-boy-children-vector-14814083.jpg"
                  alt="Face 2"
                />
              </label>
              <label htmlFor="faceImage" className="faceImage">
                <input
                  type="radio"
                  name="faceImage"
                  value="https://static.vecteezy.com/system/resources/previews/019/837/381/non_2x/cute-baby-girl-face-collection-cartoon-character-png.png"
                  checked={
                    formValues.faceImage ===
                    "https://static.vecteezy.com/system/resources/previews/019/837/381/non_2x/cute-baby-girl-face-collection-cartoon-character-png.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://static.vecteezy.com/system/resources/previews/019/837/381/non_2x/cute-baby-girl-face-collection-cartoon-character-png.png"
                  alt="Face 3"
                />
              </label>
            </div>
            <div className="options">
              <h3>Upper body:</h3>
              <label htmlFor="upperBody" className="upperBody">
                <input
                  type="radio"
                  name="upperBody"
                  value="https://cdn4.vectorstock.com/i/1000x1000/12/48/child-t-shirt-icon-cartoon-style-vector-18781248.jpg"
                  checked={
                    formValues.upperBody ===
                    "https://cdn4.vectorstock.com/i/1000x1000/12/48/child-t-shirt-icon-cartoon-style-vector-18781248.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn4.vectorstock.com/i/1000x1000/12/48/child-t-shirt-icon-cartoon-style-vector-18781248.jpg"
                  alt="Upper body 1"
                />
              </label>
              <label htmlFor="upperBody" className="upperBody">
                <input
                  type="radio"
                  name="upperBody"
                  value="https://www.shutterstock.com/image-vector/cartoon-vector-illustration-children-tshirt-260nw-1918560785.jpg"
                  checked={
                    formValues.upperBody ===
                    "https://www.shutterstock.com/image-vector/cartoon-vector-illustration-children-tshirt-260nw-1918560785.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://www.shutterstock.com/image-vector/cartoon-vector-illustration-children-tshirt-260nw-1918560785.jpg"
                  alt="Upper body 2"
                />
              </label>
              <label htmlFor="upperBody" className="upperBody">
                <input
                  type="radio"
                  name="upperBody"
                  value="https://img.freepik.com/premium-vector/illustration-shirt-sport-shirt-vector-design-yellow-white-color-shirt-logo-design_678696-566.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698451200&semt=ais"
                  checked={
                    formValues.upperBody ===
                    "https://img.freepik.com/premium-vector/illustration-shirt-sport-shirt-vector-design-yellow-white-color-shirt-logo-design_678696-566.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698451200&semt=ais"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://img.freepik.com/premium-vector/illustration-shirt-sport-shirt-vector-design-yellow-white-color-shirt-logo-design_678696-566.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698451200&semt=ais"
                  alt="Upper body 3"
                />
              </label>
            </div>
            <div className="options">
              <h3>Lower body:</h3>
              <label htmlFor="lowerBody" className="lowerBody">
                <input
                  type="radio"
                  name="lowerBody"
                  value="https://cdn3.vectorstock.com/i/1000x1000/07/02/trousers-for-kids-poster-vector-21590702.jpg"
                  checked={
                    formValues.lowerBody ===
                    "https://cdn3.vectorstock.com/i/1000x1000/07/02/trousers-for-kids-poster-vector-21590702.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn3.vectorstock.com/i/1000x1000/07/02/trousers-for-kids-poster-vector-21590702.jpg"
                  alt="Lower body 1"
                />
              </label>
              <label htmlFor="lowerBody" className="lowerBody">
                <input
                  type="radio"
                  name="lowerBody"
                  value="https://image.made-in-china.com/202f0j00uHrfWtUyasqj/Custom-Autumn-Girls-Trousers-Baby-Pure-Cotton-Cartoon-Print-Kids-Long-Pants.jpg"
                  checked={
                    formValues.lowerBody ===
                    "https://image.made-in-china.com/202f0j00uHrfWtUyasqj/Custom-Autumn-Girls-Trousers-Baby-Pure-Cotton-Cartoon-Print-Kids-Long-Pants.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://image.made-in-china.com/202f0j00uHrfWtUyasqj/Custom-Autumn-Girls-Trousers-Baby-Pure-Cotton-Cartoon-Print-Kids-Long-Pants.jpg"
                  alt="Lower body 2"
                />
              </label>
              <label htmlFor="lowerBody" className="lowerBody">
                <input
                  type="radio"
                  name="lowerBody"
                  value="https://image.made-in-china.com/202f0j00bIkRsUCcfjqv/Baby-Girls-Long-Printed-Pants-New-Fashion-Children-Cartoon-Flower-Clothes-Bottoms-Leggings-Trousers.jpg"
                  checked={
                    formValues.lowerBody ===
                    "https://image.made-in-china.com/202f0j00bIkRsUCcfjqv/Baby-Girls-Long-Printed-Pants-New-Fashion-Children-Cartoon-Flower-Clothes-Bottoms-Leggings-Trousers.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://image.made-in-china.com/202f0j00bIkRsUCcfjqv/Baby-Girls-Long-Printed-Pants-New-Fashion-Children-Cartoon-Flower-Clothes-Bottoms-Leggings-Trousers.jpg"
                  alt="Lower body 3"
                />
              </label>
            </div>
            <div className="options">
              <h3>Shoes:</h3>
              <label htmlFor="shoes" className="shoes">
                <input
                  type="radio"
                  name="shoes"
                  value="https://img.freepik.com/premium-vector/red-sneakers-pair-cute-cartoon-kid-shoes_533410-1583.jpg"
                  checked={
                    formValues.shoes ===
                    "https://img.freepik.com/premium-vector/red-sneakers-pair-cute-cartoon-kid-shoes_533410-1583.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://img.freepik.com/premium-vector/red-sneakers-pair-cute-cartoon-kid-shoes_533410-1583.jpg"
                  alt="Shoes 1"
                />
              </label>
              <label htmlFor="shoes" className="shoes">
                <input
                  type="radio"
                  name="shoes"
                  value="https://cdn.pixabay.com/photo/2022/06/02/19/11/pink-baby-shoes-7238781_1280.png"
                  checked={
                    formValues.shoes ===
                    "https://cdn.pixabay.com/photo/2022/06/02/19/11/pink-baby-shoes-7238781_1280.png"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://cdn.pixabay.com/photo/2022/06/02/19/11/pink-baby-shoes-7238781_1280.png"
                  alt="Shoes 2"
                />
              </label>
              <label htmlFor="shoes" className="shoes">
                <input
                  type="radio"
                  name="shoes"
                  value="https://static.vecteezy.com/system/resources/previews/004/715/428/non_2x/a-pair-of-red-textile-sneakers-with-a-rubber-toe-and-loose-laces-hand-drawn-illustration-in-flat-cartoon-stile-shoes-of-modern-skaters-for-training-isolated-object-free-vector.jpg"
                  checked={
                    formValues.shoes ===
                    "https://static.vecteezy.com/system/resources/previews/004/715/428/non_2x/a-pair-of-red-textile-sneakers-with-a-rubber-toe-and-loose-laces-hand-drawn-illustration-in-flat-cartoon-stile-shoes-of-modern-skaters-for-training-isolated-object-free-vector.jpg"
                  }
                  onChange={handleInputChange}
                />
                <img
                  src="https://static.vecteezy.com/system/resources/previews/004/715/428/non_2x/a-pair-of-red-textile-sneakers-with-a-rubber-toe-and-loose-laces-hand-drawn-illustration-in-flat-cartoon-stile-shoes-of-modern-skaters-for-training-isolated-object-free-vector.jpg"
                  alt="Shoes 3"
                />
              </label>
            </div>
            <button onClick={handleCreation}>Create character</button>
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
    background-color: rgba(0, 0, 0, 0.79);
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
  .options {
    justify-content: space-between;
    align-items: center;
    display: flex;
    flex-direction: row;
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
    padding: 0.5rem 1rem;
    background-color: red;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.05rem;
    width: 20rem;
  }

  img {
    width: 100px;
  }
`;

export default CreateCharacter;
