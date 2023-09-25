# Trabajo Práctico Integrador - Desarrollo Web Full Stack

## Descripción del Proyecto

Este proyecto corresponde al Trabajo Práctico Integrador para la materia de Desarrollo Web Full Stack en la Universidad de Palermo. Se centra en el desarrollo de una aplicación API REST utilizando Node.js y MongoDB, enfocada en la creación y gestión de personajes para niños.

## Modalidad de Trabajo

Para la primera entrega, se desarrollará la estructura del Backend. Posteriormente, en la segunda entrega, se trabajará en la estructura del Frontend.

## Tecnologías Utilizadas

- Node.js para el desarrollo del Backend
- MongoDB como base de datos no relacional, utilizando la versión Atlas para evitar la necesidad de una instalación local del motor de base de datos.
- Paquetes utilizados: Express, Mongoose, Dotenv, Cors.

## Estructura del Proyecto

### Backend

El backend seguirá el patrón Modelo Vista Controlador.

#### Modelos

- User
- Character

#### Controladores

- UserController
- CharacterController

#### Endpoints para el Usuario

- **POST** `/login`: Iniciar sesión del usuario
- **GET** `/users`: Obtener todos los usuarios
- **GET** `/users/:id`: Obtener información de un usuario por su ID
- **POST** `/users/create`: Crear un usuario
- **PUT** `/users/:id/edit`: Editar un usuario
- **DELETE** `/users/:id/delete`: Eliminar un usuario
- **PUT** `/users/:id/editRoles`: Editar los roles de un usuario
- **PUT** `/users/:id/editActive`: Editar el parámetro `isActive` de un usuario

#### Endpoints para los Personajes

- **GET** `/characters`: Obtener todos los personajes
- **GET** `/characters/:id`: Obtener información de un personaje por su ID
- **POST** `/characters/create`: Crear un personaje
- **PUT** `/characters/:id/edit`: Editar un personaje
- **DELETE** `/characters/:id/delete`: Eliminar un personaje

## Consideraciones Funcionales

El sistema permitirá el CRUD de usuarios y la creación de personajes, incluyendo la elección de su vestimenta. Los últimos personajes creados podrán ser visualizados.

