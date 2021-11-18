const mongoose = require('mongoose')
const Schema= mongoose.Schema
const reservationSchema = new Schema ({
    salleId:
    { type: Schema.Types.ObjectId,
    ref:'salle',
    required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true

    },
created_at:{
    type:Date,
    default:Date.now()
},
dateOfreservation:{
    type:Date,
    required:true
},
shift:{
    type:String,
    enum:['morning','evening']
}
})

const Reservation = mongoose.model ('reservation',reservationSchema);
module.exports= Reservation;