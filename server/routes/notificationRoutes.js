const express = require ('express');
const router = express.Router();
const authMiddleware = require ('../middleware/authMiddleware')
const{addNotification,getNotificationController,updateNotificationController} = require ('../controllers/notificationController')

router.post('/addNotification',authMiddleware,addNotification)

router.get('/listNotifications',authMiddleware,getNotificationController)
router.put('/updateNotification/:id',authMiddleware,updateNotificationController)




module.exports = router;