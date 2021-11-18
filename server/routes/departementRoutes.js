const express = require ('express');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware')
const{addDepartement,getDepartementController,updateDepartementController,deleteDepartementController} = require ('../controllers/departementController')

router.post('/addDepartement',authMiddleware,addDepartement)

router.get('/listDepartement',authMiddleware,getDepartementController)

router.put('/updateDepartement/:id',authMiddleware,updateDepartementController)

router.delete('/deleteDepartement/:id',authMiddleware ,deleteDepartementController)




module.exports = router;