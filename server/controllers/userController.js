const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");


const sendMail = require('./sendMail')

 const {google} = require('googleapis')
const {OAuth2} = google.auth
/* const fetch = require('node-fetch')  */

/* const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)*/

const {CLIENT_URL} = process.env 

/* const registerController = async (req, res) => {
  try {
    const newBody = JSON.parse(req.body.info);
    console.log(newBody)
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.mapped() });
    }


    const existUser = await User.findOne({ email: newBody.email });
    if (existUser) {
     return res.status(401).json({ msg: "user already exist" });
    }
  /*   const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
console.log(req.file.filename) */
    

  /*   const hashedPassword = await bcrypt.hash(newBody.password , 10);

    const newUser = await User.create({
      email: newBody.email,
      password: hashedPassword ,
      firstName: newBody.firstName,
      lastName: newBody.lastName, */
      /* image: imagePath, */
     /*  age: newBody.age,
      familySituation: newBody.familySituation,
      tel: newBody.tel,
      title: newBody.title,
      departement: newBody.departement,
      adress: newBody.adress, */
 /*      role: newBody.role,
    });
    console.log(newUser)


    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "30d" }
    );

    res.status(200).json({user: newUser, token, message: "user register successfully!" });
    if (!newUser){res.status(400).json({ message: "user not registred!" });}
    

  } catch (error) {
    res.status(500).json({ message: error });


  }
}; */
 


const registerController = async (req, res) => {
  try {
    const { email ,password, firstName,lastName/* ,age,familySituation,tel,title,departement,adress */,role} = req.body;
    console.log(req.body)
    const existUser = await User.findOne({ email });
    if (existUser) {
     return res.status(401).json({ message: "user already exist" });
    }
    const hashedPassword = await bcrypt.hash(password , 10);
    console.log(hashedPassword)
    const newUser = await User.create(
      {email ,password: hashedPassword, firstName,lastName/* ,age,familySituation,tel,title,departement,adress */,role});

      console.log(`newuser,${newUser}`)
    res.status(200).json({newUser,message:'user added successfully!!!'});
    if(!newUser ){res.status(400).json({message:'user not added , try again !!!'})}
  
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error)
    
  }
};




const updateUserImage = async (req, res) => {
  try {
    const imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
  console.log('helllllloooo')
    console.log(imagePath)
  
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      image: imagePath,
    });
    
    res.status(200).json({updatedUser, message: "imageupdated successfully!" });
    if (!updatedUser){ res.status(400).json({message: 'image not updated'});}
     
  } catch (error) {
  res.status(500).json({ message: error });
  }
};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser)
      res.status(400).json({ message: "you must register first!" });

      if (existUser.blocked === true)
      res.status(400).json({ message: "we are sorry you are bloqued!" });  

    const validatePassword = await bcrypt.compare(password, existUser.password);
    if (!validatePassword)
      res.status(400).json({ message: "wrong password ! try again!" });
    const token = jwt.sign(
      { id: existUser._id, email: existUser.email },
      process.env.SECRET_KEY
    );
    res.json({ user: existUser, token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};




const verifPasswordController = async (req, res) => {
  try {
    const {password } = req.body;
    const existUser = await User.findById(req.params.id);
    const validatePassword = await bcrypt.compare(password, existUser.password);
    
   
    if (!validatePassword)
    res.status(400).json({ message: "wrong password ! try again!" });

  
    if (validatePassword)
      res.status(200).json({ message: "correct password" });
    
  } catch (error) {
    res.status(500).json({ message: error });
  }
};















const afficheController = async (req, res) => {
  try {
    const listUsers = await User.find();
    res.status(200).json(listUsers);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateUserController = async (req, res) => {
  try {
    const newUser = await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({newUser,message: ' user updated with sucess'});
    if (!newUser){  res.status(400).json({ message: ' user not updated ' });}
  
    
  } catch (error) {
    res.status(500).json({ message: error });
}
};

const deleteUserController = async (req, res) => {
  try {
    const userDeleted = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(userDeleted);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};



const updateStateUserController = async (req,res)=>{
  try {
      
     const newUser = await User.findByIdAndUpdate(req.params.id,{ 

blocked:true,

      
     });
     res.status(200).json({newUser,message: ' user blocked with sucess'})
     if (!newUser){  res.status(400).json({message:' user not blocked ,try again'})  }
      
  } catch (error) {
    res.status(500).json({ message: error });
  }
  
  
  }

  const changePasswordController = async (req, res) => {
    
      try {
              const { currentPassword, newPassword } = req.body;
      
              const user = await User.findById(req.params.id);
              console.log(user)
              const isMatch = await bcrypt.compare(currentPassword, user.password);
              if (!isMatch) {
                  return res
                      .status(400)
                      .json({ message: 'Current password entered does not match' });
              }
              const hashedPassword = await bcrypt.hash(newPassword, 10)
      console.log(hashedPassword)
              if (user) {
                  user.password = hashedPassword || user.password;
                  console.log(user.password)
                  const passwordUpdated = await User.findByIdAndUpdate(req.params.id,{ 

                    password:user.password ,
                    
                          
                         });
                 /*  const passwordUpdated = await user.save(); */
                  console.log(passwordUpdated)
                  res.status(200).json({ user: passwordUpdated, message: 'Password changed successfully' });
              }
          } catch (err) {
              return res.status(500).json('Server Error');
          }
      };
      

      const createAccessToken = (payload) => {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
    }

    const  forgotPassword = async (req, res) => {
        try {
            const {email} = req.body
            const existUser = await User.findOne({email})
            if(!existUser) return res.status(400).json({message: "This email does not exist."})

            // const access_token = createAccessToken({id: existUser._id}) 

             const token = jwt.sign(
              { id: existUser._id, email: existUser.email },
              process.env.SECRET_KEY
            ); 
            const url = `${CLIENT_URL}/reset/${token}`
            

          sendMail(email, url, "Reset your password")
          res.status(200).json({message: "Re-send the password, please check your email."});
      /*       res.json({msg: "Re-send the password, please check your email."}) */
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    };



    const changeForgetPasswordController = async (req, res) => {
    
      try {
        const {  newPassword,confirmPassword} = req.body;
      
      
              const hashedPassword = await bcrypt.hash(newPassword , 10);
      
              
                  const passwordUpdated = await User.findByIdAndUpdate(req.params.id,{ 

                    password:hashedPassword ,
                    
                          
                         });
                         console.log(passwordUpdated)

                
                  res.status(200).json({user: passwordUpdated, message: 'Password changed successfully' });
                  if(!passwordUpdated){
                    res.status(400).json({ message: 'Password not changed !' });
                  }
              }
           catch (err) {
              return res.status(500).json('Server Error');
          }
      };
      







module.exports = {
  registerController,
  loginController,
  afficheController,
  updateUserController,
  deleteUserController,
  updateUserImage,
  updateStateUserController,
  changePasswordController,
  verifPasswordController,
  forgotPassword ,
  changeForgetPasswordController 
};
