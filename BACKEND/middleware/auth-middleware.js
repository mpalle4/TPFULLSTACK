const jwt = require('jsonwebtoken');

const verify = (req,res,next) =>{

    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send("Token no proporcionado");
    }

    try {
        const decoded = jwt.verify(token, "fgdgbrfeer6g1df23g86ef2gs");
        req.user = decoded; // El token decodificado contendrá información del usuario
        next();
    } catch (error) {
        res.status(401).send("Token inválido");
    }    
}

module.exports = {verify}
