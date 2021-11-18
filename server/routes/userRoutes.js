const express = require ('express');
const{registerController,loginController,afficheController,updateUserController,
  deleteUserController,updateUserImage, updateStateUserController,
  changePasswordController,verifPasswordController,forgotPassword,changeForgetPasswordController  }= require ('../controllers/userController');
const router = express.Router();
const {body}=require ('express-validator');
const authMiddleware = require ('../middleware/authMiddleware')

const multer = require ('multer')

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
      cb(null,Date.now() + '-' + file.originalname )
    }
  })
  
  const upload = multer({storage })


router.post('/register',/* upload.single('picture'), */
/*  body('email','invalid email').isEmail(),
body('password','password must have min 6 characters').isLength({min:6}),  */
registerController);

router.put('/updateImage/:id',upload.single('userImg'),updateUserImage);


router.post('/login',loginController);

router.post('/forgotPassword',forgotPassword );

router.get('/listUsers', authMiddleware,afficheController)

router.post('/verifPassword/:id', authMiddleware,verifPasswordController )

router.put('/updateUser/:id',authMiddleware,updateUserController)

router.put('/updateStateUser/:id',authMiddleware,updateStateUserController)

router.delete('/deleteUser/:id',authMiddleware ,deleteUserController)

router.put('/changePassword/:id',authMiddleware, changePasswordController);

router.put('/changeForgetPassword/:id', changeForgetPasswordController);


module.exports = router;