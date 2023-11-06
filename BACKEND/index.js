const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;
const jwt = require("jsonwebtoken");

const User = require('./models/userModel');
const UsrController = require("./controllers/userController");
const AuthController = require("./controllers/authController");
const CharactersController = require("./controllers/characterController");
const Middleware = require("./middleware/auth-middleware");
const { verify } = require("crypto");

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

app.post("/login", verify ,async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const result = await AuthController.login(email, password);
    if (result) {
      const { token, user } = await AuthController.login(email, password);
      res.status(200).json({ token, user });
    } else {
      res.status(401).send("No puede estar aqui");
    }
  } catch (error) {
    res.status(500).send("Error");
  }
});

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

//Middleware.verify,
app.get("/users/:id", async (req, res) => {
  let userId = req.params.id;

  try {
    user = await UsrController.getUser(userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send("Error. Intente más tarde");
  }
});


//Middleware.verify
app.post("/users/create", async (req, res) => {
  let name = req.body.name;
  let lastname = req.body.lastname;
  let email = req.body.email;
  let isActive = req.body.isActive;
  let password = req.body.password;
  let characterIdCounter= req.body.characterIdCounter;

  try {
    const result = await UsrController.addUser(
      name,
      lastname,
      email,
      isActive,
      password,
      characterIdCounter
    );
    if (result) {
      res.status(201).send("Usuario creado correctamente");
    } else {
      res.status(409).send("El usuario ya existe");
    }
  } catch (error) {
    res.status(500).send("Error al crear el usuario");
  }
});

//Middleware.verify
app.put("/users/:id/edit", async (req, res) => {
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
});

//Middleware.verify
app.delete("/users/:id/delete", async (req, res) => {
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
});

//Middleware.verify
app.put("/users/:id/editRoles", async (req, res) => {
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
});
 
//Middleware.verify
app.put("/users/:id/editActive", async (req, res) => {
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
});

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
//Middleware.verify
app.get("/characters/:id", async (req, res) => {
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
//Middleware.verify
app.post("/characters/create", async (req, res) => {
    const token = req.headers.authorization; // Obtén el token del encabezado de la solicitud o de donde lo almacenes localmente

    if (!token) {
        return res.status(401).send("Acceso no autorizado. Se requiere un token.");
    }

    
    const decodedToken = jwt.verify(token, "tu_secreto"); // Verifica el token con tu clave secreta

    if (!decodedToken.createdBy) {
        return res.status(401).send("Token no válido. No se encontró createdBy.");
    }

    const userEmail = decodedToken.createdBy;
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Aumenta el valor de characterIdCounter en 1
    user.characterIdCounter += 1;

    // Guarda el documento de usuario actualizado en la base de datos
    await user.save();

    // Ahora puedes usar el nuevo valor de characterIdCounter como characterId
    const characterIdC = user.characterIdCounter;
    // Resto del código para guardar el personaje

    let createdBy = req.body.createdBy;
    let characterId = characterIdC;
    let name = req.body.lastname;
    let faceImage = req.body.faceImage;
    let upperBody = req.body.upperBody;
    let lowerBody = req.body.lowerBody;
    let shoes = req.body.shoes;

    try {
      const result = await CharactersController.createCharacter(
        createdBy,
        characterId,
        name,
        faceImage,
        upperBody,
        lowerBody,
        shoes
      );
      if (result) {
        return res.status(201).send("Personaje creado correctamente");
      } else {
        return res.status(409).send("El personaje ya existe");
      }
    } catch (error) {
      res.status(401).send("Token no valido");
    }
  }
);

//Edito personaje
//Middleware.verify
app.put("/characters/:id/edit", async (req, res) => {
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
//Middleware.verify
app.delete("/characters/:id/delete", async (req, res) => {
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
