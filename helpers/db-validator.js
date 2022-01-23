const Role = require('../models/role')
const Usuario = require('../models/usuarios')

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB`)
        //Ahora voy a centralizar esta validación
    }
}

const emailExiste = async(correo = '') =>{
    //Validare que el correo no este en la BD
    const existeEmail = await Usuario.findOne({correo})

    //Lo paso por la válidación
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya está registrado`)
    }
}
//Validar el id del usuario
const existeUsuarioPorId = async(id) =>{
    //Validare que el correo no este en la BD
    const existeUsuario = await Usuario.findById(id)

    //Lo paso por la válidación
    if (!existeUsuario) {
        throw new Error(`El ${id} no existe`)
    }
}
module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}