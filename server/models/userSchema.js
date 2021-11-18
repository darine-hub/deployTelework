const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

  firstName: {type: String,required: false},
  lastName: {type: String,required: false},
  image:{
    type:String,
    /* required:false, */
    default:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'
    
},
  age:{
      type:Number,
      required:false
  } ,

  familySituation:{
      
      type:String,
     enum:['Single','Maried','Divorced'],
      required:false
      
      
    
    },

  email:{
      type: String,
      required:true,
    
  },

  password:{
      type:String,
      required:true

  },

  tel:{
      type:Number,
      required:false
  },

  title:{type:String,
    required:false

},

  departement:{
    type:String,
    enum:['Tunis','Sousse','Mounastir'],
    required:false
      
  },

  adress:{
      type:String,
      required:false
  },

  joinDate:{
      type:Date,
      default:Date.now()
  },

  role:{
      type:String,
      enum:['Employee','Manager','Admin'],
     required:false
      
    
    }
    ,
    blocked:{
     type: Boolean,
     default :false,

   } 


});

const User = mongoose.model('User', userSchema);

module.exports = User;

