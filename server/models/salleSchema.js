const mongoose = require('mongoose')
const Schema= mongoose.Schema
const salleSchema = new Schema ({

    inUse:{
        type:String,
        enum:['yes','no']
    },
    number :String,
    capacity:Number,
    departement:{ 
        type:Schema.Types.ObjectId,
        ref:'Departement',
        required:false
       

    

    } }) 

const Salle = mongoose.model ('salle',salleSchema);
module.exports= Salle;