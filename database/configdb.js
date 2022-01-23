require('dotenv')
const mongoose = require('mongoose')

const dbConnection = async() => {
    try{

       await mongoose.connect( process.env.MONDODB_ATLAS, {
 
       })
       console.log('Base de datos online')

    } catch (error){
        console.log(error)
    }
}

module.exports = {
    dbConnection
}