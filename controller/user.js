const { response, request } = require('express')
//Acá jalo el modelo de usuario y me permite generar instancias de usuario
const Usuario = require('../models/usuarios')
//modulo de encriptacion 
const bcryptjs = require('bcryptjs')

//Acá en get mandarémos query params, esto me sirve para mi proyecto de garantías
//Express incorpora todas estas funcionalidades
const userGet = async(req, res) => {
    //Acá se usa el .find es el que ocupo
    //Obtendre la serie que me manda el cliente
    const query = req.query
    //Puedo desestructurar
    const usuarios = await Usuario.find()
    res.json({
        usuarios
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

    //Validar existencia del correo esta en helpers

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
const userPut = async(req = request, res) => {
    //Acá recibiré información del usuario por ejm su id esto tambien lo cambio en la ruta put
    const { id } = req.params
    const {_id, password, google, correo, ...resto} = req.body

    //Validación de ruta contra bd
    if (password) {
        //encriptando la contraseña
    const salt = bcryptjs.genSaltSync()
    resto.password = bcryptjs.hashSync(password, salt)
    }
    const usuario = await Usuario.findByIdAndUpdate( id, resto)

    res.json({
        mensaje: "PUT",
        id
    })
}
const userDelete = async(req, res) => {
    const {id} = req.params
    const usuario = await Usuario.findByIdAndUpdate(id, { estado:false}) 
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