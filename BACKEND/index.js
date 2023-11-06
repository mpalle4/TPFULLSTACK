const express = require("express");
const app = express();
const mongoose = require("mongoose");
const http = require("http").createServer(app);
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;

const UsrController = require("./controllers/userController");
const AuthController = require("./controllers/authController");
const CharactersController = require("./controllers/characterController");
const Middleware = require("./middleware/authMiddleware.js");

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Funcionando");
});
app.post("/", (req, res) => {
  res.send("Llamada post");
});

//-------------------------------------------------------------------------------------------------------
// LOGIN
//-------------------------------------------------------------------------------------------------------
app.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await AuthController.login(email, password);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(401).send("No puede estar aqui");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS USER
//-------------------------------------------------------------------------------------------------------

//Get de todos los usuarios
app.get("/users", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await UsrController.getAllUsers(limit, offset);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un usuario
app.get(
  "/users/:id",
  /*Middleware.verify*/ async (req, res) => {
    let userId = req.params.id;

    try {
      user = await UsrController.getUser(userId);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo usuario
app.post(
  "/users/create",
  /*Middleware.verify*/ async (req, res) => {
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let isActive = req.body.isActive;
    let password = req.body.password;
    let myCharacters = req.body.myCharacters;

    try {
      const result = await UsrController.addUser(
        name,
        lastname,
        email,
        isActive,
        password,
        myCharacters
      );
      if (result) {
        res.status(201).send("Usuario creado correctamente");
      } else {
        res.status(409).send("El usuario ya existe");
      }
    } catch (error) {
      res.status(500).send("Error al crear el usuario");
    }
  }
);

//Edito usuario
app.put(
  "/users/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const user = { _id: req.params.id, ...req.body };

    try {
      const result = await UsrController.editUser(user);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El usuario no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

// Elimino un usuario
app.delete(
  "/users/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await UsrController.deleteUser(req.params.id);
      if (result) {
        res.status(200).send("Usuario borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el usuario.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

// Edito roles del usuario
app.put(
  "/users/:id/editRoles",
  /*Middleware.verify*/ async (req, res) => {
    const roles = req.body.roles;
    try {
      const result = await UsrController.editRoles(roles, req.params.id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El usuario no existe.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Edito isActive
app.put(
  "/users/:id/editActive",
  /*Middleware.verify*/ async (req, res) => {
    const isActive = req.body.isActive;
    try {
      const result = await UsrController.editActive(isActive, req.params.id);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El usuario no existe.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//-------------------------------------------------------------------------------------------------------
// ENDPOINTS CHARACTER
//-------------------------------------------------------------------------------------------------------

//Get de todos los personajes
app.get("/characters", async (req, res) => {
  let limit = req.query.limit;
  let offset = req.query.offset;

  try {
    const results = await CharactersController.getAllCharacters(limit, offset);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});

//Get info de un personaje
app.get(
  "/characters/:id",
  /*Middleware.verify*/ async (req, res) => {
    let characterId = req.params.id;

    try {
      character = await CharactersController.getCharacter(characterId);
      res.status(200).json(character);
    } catch (error) {
      res.status(500).send("Error. Intente más tarde");
    }
  }
);

//Creo nuevo personaje
app.post(
  "/characters/create",
  /*Middleware.verify*/ async (req, res) => {
    let characterId = req.body.characterId;
    let name = req.body.name;
    let faceImage = req.body.faceImage;
    let upperBody = req.body.upperBody;
    let lowerBody = req.body.lowerBody;
    let shoes = req.body.shoes;
    let createdBy = req.body.createdBy;

    try {
      const result = await CharactersController.createCharacter(
        characterId,
        name,
        faceImage,
        upperBody,
        lowerBody,
        shoes,
        createdBy
      );
      if (result) {
        res.status(201).send("Personaje creado correctamente");
      } else {
        res.status(409).send("El personaje ya existe");
      }
    } catch (error) {
      res.status(500).send("Error al crear el personaje");
    }
  }
);

//Edito personaje
app.put(
  "/characters/:id/edit",
  /*Middleware.verify*/ async (req, res) => {
    const character = { _id: req.params.id, ...req.body };

    try {
      const result = await CharactersController.editCharacter(character);
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).send("El personaje no existe");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);

//Elimino personaje
app.delete(
  "/characters/:id/delete",
  /*Middleware.verify*/ async (req, res) => {
    try {
      const result = await CharactersController.deleteCharacter(req.params.id);
      if (result) {
        res.status(200).send("Personaje borrado.");
      } else {
        res.status(404).send("No se ha podido eliminar el personaje.");
      }
    } catch (error) {
      res.status(500).send("Error");
    }
  }
);
