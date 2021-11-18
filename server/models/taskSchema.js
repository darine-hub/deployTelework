const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema ({

name :{
    type:String,
    required:true

},
description:{
    type:String,
    required:false
},
startDate:{
    type:Date,
    required:true
},
deadLine:{
type:Date,
required:true

},
state:{
    type:String,
    enum:['ended','In progress','valid'],


default:'In progress',

required:false
},

project:{
    type:Schema.Types.ObjectId,
    ref:'Project',
    required:false
},

owner:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:false
},
employee:{
    type:Schema.Types.ObjectId,
    ref:'User',
    required:false

}



})

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;