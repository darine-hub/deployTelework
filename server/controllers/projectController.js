const Project = require('../models/projectSchema');

const addProject = async (req, res) => {
  try {
    const { title ,description, startDate,deadLine} = req.body;
    console.log(req.body)
    const newProject = await Project.create({ title, description,startDate,deadLine, owner: req.personId });
    res.status(200).json({newProject,message:'project added successfully!!!'});
    if(!newProject ){res.status(400).json({message:'project not added , try again !!!'})}
    console.log(newProject)
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
    
  }
};

const afficheProjectController = async (req,res)=>  {
    try {
        
          const listProjects = await  Project.find().populate('owner', '-password');
          res.status(200).json(listProjects)
           
    } catch (error) {
        res.status(500).json({message:error})
        console.log (error)
    }
 

}

const updateProjectController = async (req,res)=>{
try {
   const newProject= await Project.findByIdAndUpdate(req.params.id, req.body);
   res.status(200).json({newProject,message:'project updated successfully!!!'})
   if(!newProject){  res.status(400).json({message:'project not updated , try again !!!'})}
    
} catch (error) {
    

res.status(500).json({message:error})

}
}


const updateStateProjectController = async (req,res)=>{
  try {
      
     const newProject = await Project.findByIdAndUpdate(req.params.id,{ 

state:"valid",

      
     });
     res.status(200).json({newProject,message:'fine!!!! project valided !!!'})
     if(!newProject){ res.status(400).json({message:'bad!!!! project not valided try again!!!'})}
      
  } catch (error) {
      res.status(500).json({message:error})  
  }
  
  
  }


  const updateProgressProjectController = async (req,res)=>{
    try {
        
       const newProject = await Project.findByIdAndUpdate(req.params.id,{ 
  
  state:"In progress",
  
        
       });
       res.status(200).json({newProject,message:'fine!!!! project is in progress!!!'})
       if(!newProject){ res.status(400).json({message:'bad!!!! project not in progress try again!!!'})}
        
    } catch (error) {
        res.status(500).json({message:error})  
    }
    
    
    }





  const finishProjectController = async (req,res)=>{
    try {
        
       const newProject = await Project.findByIdAndUpdate(req.params.id,{ 
  
  state:"ended",
  
        
       });
       res.status(200).json({newProject,message:'fine!!!! project ended !!!'})
       if(!newProject){ res.status(400).json({message:'bad!!!! project not ended try again!!!'})}
        
    } catch (error) {
        res.status(500).json({message:error})  
    }
    
    
    }



const deleteProjectController = async (req,res)=>{
try {
   const projectDeleted =await Project.findByIdAndDelete(req.params.id);
   res.status(200).json({projectDeleted,message:'fine!!!! project deleted !!!'})
   if(!projectDeleted){ res.status(400).json({message:'bad!!!! project not ended try again!!!'})}
    
} catch (error) {
    res.status(500).json({message:error}) 
}

}
const afficheProjectbyid = async (req,res)=>  {
  try {
      
        const listProjects = await  Project.find({owner:req.params.id});
        res.status(200).json(listProjects)
       
         
  } catch (error) {
      res.status(500).json({message:error})
  }


}


module.exports = { afficheProjectbyid,addProject,afficheProjectController,updateProjectController,deleteProjectController,updateStateProjectController,finishProjectController,updateProgressProjectController };