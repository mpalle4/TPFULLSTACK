const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  try {
    // Por algun motivo no recone el req.headers.Autorization desde el postman
    const decode = jwt.verify(
      req.headers.Authorization,
      process.env.JWT_SECRET
    );
    //const decode = jwt.verify(req.body.token,process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).send("No autorizado");
  }
};

/* 
    TODO:
        - Implementar alguna forma para filtrar los permisos de acceso segun si es admin o usuario normal
        - Implementar alguna forma para fitlrar los permisos dependiendo de si el usuario es el autor del juego
*/

module.exports = { verify };
