
const express = require('express');
const authMiddleware = require ('../middleware/authMiddleware');
const router = express.Router();
const {getreservations,getreservationsbySalle, addreservations , getreservationsbyId ,updateReservation, deleteReservation} = require('../controllers/reservationController.js');
const {getsalles ,getsallesbydept,updateSalle,deleteSalle,addSalle} = require('../controllers/sallesController.js');
router.get('/getreservations',authMiddleware,getreservations);
router.post('/addreservations',authMiddleware,addreservations);
router.get('/getsalles',authMiddleware,getsalles);
router.get('/getsallesbydept/:dep',authMiddleware,getsallesbydept);
router.get('/getreservationsbyId/:id',authMiddleware,getreservationsbyId);
router.post('/addSalle',authMiddleware,addSalle);
router.delete('/deleteReservation/:id',authMiddleware,deleteReservation);
router.put('/updateReservation/:id',authMiddleware,updateReservation);
router.get('/getreservationsbySalle/:id',authMiddleware,getreservationsbySalle);
router.put('/updateSalle/:id',authMiddleware,updateSalle);
router.delete('/deleteSalle/:id',authMiddleware,deleteSalle);
module.exports = router
