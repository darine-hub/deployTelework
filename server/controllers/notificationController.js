const Notification = require('../models/notificationSchema');

const addNotification =  async(req,res)=>{
    try {
       
        
        const {title,message,receiver}= req.body
        const newNotification =await Notification.create({
        title,
        message,
        receiver,
        owner:req.personId,
        

       
     })
        res.status(200).json(newNotification);
        
        
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
       
    }
    
    
    
    
    
    } 

    const getNotificationController = async (req,res)=>  {
        try {
            
              const listNotifications= await  Notification.find().populate('owner', '-password').populate('receiver');
              res.status(200).json(listNotifications)
               
        } catch (error) {
            res.status(500).json({message:error})
        }
     
    
    }


    const updateNotificationController = async (req,res)=>{
        try {
            
           const newNotification = await Notification.findByIdAndUpdate(req.params.id,{ 
      
      readed:true,
      
            
           });
           console.log(newNotification)
           res.status(200).json({newNotification,message: ' notification updated with sucess'})
           if (!newNotification){  res.status(400).json({message:' notification not updated ,try again'})  }
            
        } catch (error) {
          res.status(500).json({ message: error });
        }
        
        
        }

    module.exports={addNotification,getNotificationController,updateNotificationController}