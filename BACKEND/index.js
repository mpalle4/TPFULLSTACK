const express = require("express");
const app = express();
const http = require("http").createServer(app);
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const UsrController = require("./controllers/userController");
const AuthController = require("./controllers/authController");
const Middleware = require("./middleware/auth-middleware");

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

app.post("/login", async (req, res) => {});

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

  try {
    const result = await UsrController.addUser(
      name,
      lastname,
      email,
      isActive,
      password
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
