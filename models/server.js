const express = require("express");
require('dotenv')
const { userGet,userPost, userPatch, userDelete, userPut } = require('../controller/user');
const { dbConnection } = require("../database/configdb");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const Role = require('../models/role');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validator");

/* const { validarCampos } = require("../middlewares/validar-campos"); */
/* const { esRoleValido } = require("../helpers/db-validators"); */


class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        //Conectar a base de datos
        this.conectarDB()


        //Middlewars
        this.middlewars()
        //Rutas 
        this.routes()
        //Rutas de usuarios
        /* this.userPatch = '/api/usuarios' */

    }
    //Metodo para conectar a db
    async conectarDB(){
        await dbConnection()
    }
    //Middlewars
    middlewars (){
        this.app.use(express.static('public'))
        //El siguiente middlewars me permita obtener los datos del body que vienen en el post
        this.app.use(express.json())
    }

    //Rutas #endpoints
    routes(){
        this.app.get('/api/usuarios', userGet)
        this.app.post('/api/usuarios',[
            //Middlewars de validaciones express
            check('password','El password es obligatorio y debe ser de más de 6 letras').isLength({ min:6}),
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('correo', 'El correo no es válido').isEmail(),
            check('correo').custom(emailExiste),
            check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
            //Validación del rol contra la Bd
            check('rol').custom(esRoleValido),//Para esto esta la funcion dentro de helpers
            validarCampos//este es un middleware que hemos creado para validaciones donde se ejecuta el validationResults  
        ], userPost)
        this.app.put('/api/usuarios/:id',[
            check('id','No es un id válido').isMongoId(),
            check('id').custom(existeUsuarioPorId),
            check('rol').custom(esRoleValido),
            validarCampos
        ] , userPut)
        this.app.delete('/api/usuarios', [
            check('id','No es un id válido').isMongoId(),
            check('id').custom(existeUsuarioPorId),
            validarCampos
        ], userDelete)
        this.app.patch('/api/usuarios', userPatch)
    }
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

module.exports = Server

