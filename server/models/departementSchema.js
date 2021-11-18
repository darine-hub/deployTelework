const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departementSchema = new Schema({


name:{
    type:String,
    required:false
},

  address:{
      type:String,
      required:false
  },

  inUse:{
    type:String,
    enum:['yes','no']
},

  joinDate:{
      type:Date,
      default:Date.now()
  },



});

const Departement = mongoose.model('Departement', departementSchema);

module.exports = Departement;

