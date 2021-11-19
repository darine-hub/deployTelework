
const Reservation = require('../models/reservationSchema')
const getreservations= async (req,res)=>{
    try{
        const reservation = await Reservation.find()
        if(!reservation) {
            res.status(400).json({success: false});
          }
          res.send(reservation);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

};
const addreservations= async (req,res)=>{
    try{
        console.log('hi')
        console.log(req.body)
        const{salleId,userId,dateOfreservation,shift}=req.body
        const newReservation = new Reservation({
            salleId,
            userId,
            dateOfreservation,
            shift
          });
          await newReservation.save()
        
        if(!newReservation) {
            res.status(500).json({success: false});
          }
          res.send(newReservation);
      
      }

    catch(error){
console.error(error)
    }
    

};
const getreservationsbyId= async (req,res)=>{
    try{
        const reservationbyId = await Reservation.find({userId:req.params.id}).populate('salleId')
        if(!reservationbyId) {
            res.status(400).json({success: false});
          }
          res.send(reservationbyId);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

};
const deleteReservation = async (req,res)=>{
    try {
       const reservationDeleted =await Reservation.findByIdAndDelete(req.params.id);
       res.status(200).json(reservationDeleted)
        
    } catch (error) {
        res.status(500).json({message:error}) 
    }
    
    };
    const updateReservation = async (req, res) => {
        try {
          const { salleId, dateOfreservation ,shift} = req.body;
          const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, {
            salleId,
            dateOfreservation,
            shift
          });
          res.json(updatedReservation);
        } catch (error) {
          res.status(500).json({ message: error });
        }
      };
      const getreservationsbySalle= async (req,res)=>{
        try{
            const reservationbyId = await Reservation.find({salleId:req.params.id})
            if(!reservationbyId) {
                res.status(400).json({success: false});
              }
              res.send(reservationbyId);
          
          }
    
        catch(error){
            res.status(500).json({success: false});
        }
        
    
    };
module.exports={getreservations,addreservations,getreservationsbySalle,getreservationsbyId,deleteReservation,updateReservation};
