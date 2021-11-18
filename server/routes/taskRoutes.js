const express = require ('express');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware')
const{afficheTaskbyId ,addTask,afficheTaskController,updateTaskController,deleteTaskController,updateStateTaskController,updateFinishTaskController ,deleteManyTaskController  } = require ('../controllers/taskController')

router.post('/addtask',authMiddleware,addTask)
router.get('/listTasks',authMiddleware,afficheTaskController)
router.put('/updateTask/:id',authMiddleware,updateTaskController)
router.put('/updateStateTask/:id',authMiddleware,updateStateTaskController)
router.put('/updateFinishTask/:id',authMiddleware,updateFinishTaskController)
router.delete('/deleteTask/:id',authMiddleware ,deleteTaskController)
router.delete('/deleteManyTasks/:id',authMiddleware ,deleteManyTaskController)
router.get('/tasksbyId/:id',authMiddleware,afficheTaskbyId)


module.exports = router;