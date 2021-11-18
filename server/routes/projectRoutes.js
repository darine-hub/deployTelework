const express = require ('express');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware')
const{afficheProjectbyid,addProject,afficheProjectController,updateProjectController,deleteProjectController,updateStateProjectController,finishProjectController,updateProgressProjectController } = require ('../controllers/projectController')

router.post('/addproject',authMiddleware,addProject)

router.get('/listProjects',authMiddleware,afficheProjectController)

router.put('/updateProject/:id',authMiddleware,updateProjectController)

router.put('/updateStateProject/:id',authMiddleware,updateStateProjectController)
router.put('/finishProject/:id',authMiddleware,finishProjectController)
router.get('/listProjectsbyid/:id',authMiddleware,afficheProjectbyid)

router.delete('/deleteProject/:id',authMiddleware ,deleteProjectController)

router.put('/updateProgressProject/:id',authMiddleware,updateProgressProjectController) 

module.exports = router;