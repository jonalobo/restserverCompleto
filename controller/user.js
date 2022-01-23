const { response, request } = require('express')
//Acá jalo el modelo de usuario y me permite generar instancias de usuario
const Usuario = require('../models/usuarios')
//modulo de encriptacion 
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

//Acá en get mandarémos query params, esto me sirve para mi proyecto de garantías
//Express incorpora todas estas funcionalidades
const userGet = (req, res) => {

    //Obtendre la serie que me manda el cliente
    const query = req.query
    //Puedo desestructurar
    res.json({
        mensaje: "GET",
        query
    })
}
const userPost = async(req = request, res) => {

    //En el req es donde estarán los resultados de los checks de express validator
    /* const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    } */
    //Acá recibiré información del usuario por ejm su id esto tambien lo cambio en la ruta put
    /* const { id } = req.params */
    //Voy a recibir información que viene de un body atraves del metodo post en el req
    /* const body = req.body */
    const { nombre, correo, password, rol} = req.body

    //Ahora voy a crear una instancia de usuario del schema de la db
    const usuario = new Usuario({nombre, correo, password, rol})

    //Validare que el correo no este en la BD
    const existeEmail = await Usuario.findOne({correo})

    //Lo paso por la válidación
    if (existeEmail) {
        return res.status(400).json({
            mensaje: "El correo ya está registrado"
        })
    }

    //encriptando la contraseña
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync(password, salt)
    //Ahora debo grabar el usuario en mongoDB
    await usuario.save()

    res.json({
        mensaje: "POST",
        usuario
    })
}
const userPut = (req = request, res) => {
    //Acá recibiré información del usuario por ejm su id esto tambien lo cambio en la ruta put
    /* const { id } = req.params */

    res.json({
        mensaje: "PUT"
    })
}
const userDelete = (req, res) => {
    res.json({
        mensaje: "DELETE"
    })
}
const userPatch = (req, res) => {
    res.json({
        mensaje: "PATCH"
    })
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPatch
}