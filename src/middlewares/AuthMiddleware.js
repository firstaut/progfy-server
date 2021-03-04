const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');


 const  tokenVerify = (req, res, next) => {

    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({ msg: 'No hay token, acceso prohibido' });
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {

        if(err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.user = decoded.user;
        next();
    });
}

const emailVerify = async (req, res, next) => {

    const { email } = req.body;

    console.log(email);

    const user = await Customer.findOne({ email });
    console.log(user);
    if(!user) {
        console.log('DENTRO');
        next();
        return;
    }

    console.log('FUERA');
    res.status(401).json({
        ok: true,
        msg: 'Ya existe usuario con ese email'
    });
}

module.exports = {
    tokenVerify,
    emailVerify
}