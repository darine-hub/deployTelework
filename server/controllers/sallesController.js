const Salle = require('../Models/salleSchema')
const getsalles= async (req,res)=>{
    try{
        const salle = await Salle.find({}).populate('departement')
        if(!salle) {
            res.status(400).json({success: false});
          }
          res.send(salle);
          
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

}
const getsallesbydept= async (req,res)=>{
    try{
        const salle = await Salle.find({departement:req.params.dep})
        if(!salle) {
            res.status(400).json({success: false});
          }
          res.send(salle);
      
      }

    catch(error){
        res.status(500).json({success: false});
    }
    

}
const addSalle = async (req, res) => {
    try {
      const { number,
        capacity,
        departement,
        inUse,
       } = req.body;
      const newSalle = await Salle.create({ 
        number,
        capacity,
        departement,inUse });
      res.json(newSalle);
      console.log(newSalle) 
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error)
      
    }
  };
  const updateSalle = async (req, res) => {
    try {
      const { number,capacity,departement,inUse } = req.body;
      const updatedSalle = await Salle.findByIdAndUpdate(req.params.id, {
       number,capacity,departement,inUse
      });
      res.json(updatedSalle);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  };
  const deleteSalle = async (req,res)=>{
    try {
       const salleDeleted =await Salle.findByIdAndDelete(req.params.id);
       res.status(200).json(salleDeleted)
        
    } catch (error) {
        res.status(500).json({message:error}) 
    }
    
    }

module.exports={getsalles,addSalle,getsallesbydept,updateSalle,deleteSalle}