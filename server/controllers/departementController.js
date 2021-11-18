const Departement = require('../models/departementSchema');

const addDepartement =  async(req,res)=>{
    try {
       
        
        const {name,address,inUse}= req.body
        const newDepartement =await Departement.create({
        name,
        address,
        inUse,
       
     })
        res.status(200).json(newDepartement);
        
        
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
       
    }
    
    
    
    
    
    } 

    const getDepartementController = async (req,res)=>  {
        try {
            
              const listDepartement= await  Departement.find();
              res.status(200).json(listDepartement)
               
        } catch (error) {
            res.status(500).json({message:error})
        }
     
    
    }


    const updateDepartementController = async (req,res)=>{
        try {
            const {name,address,inUse}= req.body
           const newDepartement = await Departement.findByIdAndUpdate(req.params.id,req.body);
           console.log(newDepartement)
          
           res.status(200).json({newDepartement,message: ' departement updated with sucess'})
           if (!newDepartement){  res.status(400).json({message:' departement not updated ,try again'})  }
            
        } catch (error) {
          res.status(500).json({ message: error });
        }
        
        
        }


        const deleteDepartementController = async (req,res)=>{
            try {
               const DepartementDeleted = await Departement.findByIdAndDelete(req.params.id);
               res.status(200).json({DepartementDeleted,message:'departement deleted successfully!!!'})
                if(!DepartementDeleted){res.status(400).json({message:'bad!!!! departement not deleted !!!'})}
                
            } catch (error) {
                res.status(500).json({message:error}) 
            }
            
            }   

    module.exports={addDepartement,getDepartementController,updateDepartementController,deleteDepartementController}