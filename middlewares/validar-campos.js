const { validationResult } = require('express-validator')

const validarCampos = (req,res, next)=>{//acá next() es necesario para que siga paso a paso las validaciones
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next()
}

module.exports = {
    validarCampos
}