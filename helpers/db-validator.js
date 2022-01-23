const Role = require('../models/role')

const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la DB`)
        //Ahora voy a centralizar esta validación
    }
}

module.exports = {
    esRoleValido
}