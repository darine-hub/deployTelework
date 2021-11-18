
const Task = require('../models/taskSchema');

const addTask =  async(req,res)=>{
try {
   
    
    const {name,description,startDate,deadLine,project,employee}= req.body
    const newTask =await Task.create({
    name,
    description,
    startDate,
    deadLine,
    owner:req.personId,
    project,
    employee


    })
    res.status(200).json({newTask,message:'task added successfully!!!'})
    if(!newTask){res.status(400).json({message:'bad!!!! task not added !!!'})}
    
    
} catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
    console.log (projectId)
}





} 

const afficheTaskController = async (req,res)=>  {
    try {
        
          const listTasks = await  Task.find().populate('owner', '-password').populate('project').populate('employee');
          res.status(200).json(listTasks)
           
    } catch (error) {
        res.status(500).json({message:error})
    }
 

}
const afficheTaskbyId = async (req,res)=>  {
    try {
        
          const listTasks = await Task.find({owner:req.params.id}).populate('owner', '-password').populate('project').populate('employee');
          res.status(200).json(listTasks)
           
    } catch (error) {
        res.status(500).json({message:error})
    }
 

}




const updateTaskController = async (req,res)=>{
try {
    const { name,description,startDate,deadLine, state,employee} = req.body;
   const newTask = await Task.findByIdAndUpdate(req.params.id,{
 name,
 description,
 startDate,
 deadLine,
 state,
 employee

   });
   res.status(200).json({newTask,message:'task updated successfully!!!'})
   if(!newTask){res.status(400).json({message:'bad!!!! task not updated !!!'})}
    
} catch (error) {
    res.status(500).json({message:'task not updated'})  
}


}


const updateStateTaskController = async (req,res)=>{
    try {
        
       const newTask = await Task.findByIdAndUpdate(req.params.id,{ 

 state:"valid",
 
        
       });
       res.status(200).json({newTask,message:'task valided successfully!!!'})
    if(!newTask){res.status(400).json({message:'bad!!!! task not valided !!!'})}
        
    } catch (error) {
        res.status(500).json({message:error})  
    }
    
    
    }

    const updateFinishTaskController = async (req,res)=>{
        try {
            
           const newTask = await Task.findByIdAndUpdate(req.params.id,{ 
    
     state:"ended",
     
            
           });
           res.status(200).json({newTask,message:'task ended successfully!!!'})
           if(!newTask){res.status(400).json({message:'bad!!!! task not ended !!!'})}
            
        } catch (error) {
            res.status(500).json({message:error})  
        }
        
        
        }
   


const deleteTaskController = async (req,res)=>{
try {
   const TaskDeleted = await Task.findByIdAndDelete(req.params.id);
   res.status(200).json({TaskDeleted,message:'task deleted successfully!!!'})
    if(!TaskDeleted){res.status(400).json({message:'bad!!!! task not deleted !!!'})}
    
} catch (error) {
    res.status(500).json({message:error}) 
}

}

const deleteManyTaskController = async (req,res)=>{
    try {
       const [TasksDeleted] = await Task.deleteMany({project: req.params.id});
       res.status(200).json([TasksDeleted] )
        
    } catch (error) {
        res.status(500).json({message:error}) 
    }
    
    }



module.exports={afficheTaskbyId ,addTask,afficheTaskController,updateTaskController,deleteTaskController,updateStateTaskController,updateFinishTaskController,deleteManyTaskController   }