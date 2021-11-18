const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
 
    title:{
     type:String,
     required:false
 },
 description:{
    type:String,
    required:true
},
startDate:{
     type:Date,
     required:false
     
 },
 deadLine:{
     type:Date,
     required:false
 },
 state:{
   /*  type:{
        enum:['ended','In progress','valid']
    }, */
    type:String,
    
    default:'In progress',
    required:false
    },
 

 owner:{
    type: Schema.Types.ObjectId,
    ref:'User',
    required:false}

 




});
const Project = mongoose.model('Project',projectSchema);
module.exports= Project;
