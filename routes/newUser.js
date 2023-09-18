import express from "express"
const router = express.Router()
import userController from '../controllers/userController.js'
import authenticateUser from '../utils/middleware.js'
// protected route
router.get('/', authenticateUser, (req, res) => {
    // req.user contains the decoded token payload
    console.log(`Hello, ${req.user. userId}!`);
   
   
    
    res.redirect("/authuser");
  });
  
router.get("/home", userController.home )

router.get("/signup", userController.signup )
router.post("/signup",userController.createUserDoc)

router.get("/login", userController.login )
router.post("/login",userController.verifyLogin)

// router.get("/help", userController.help )

// router.get("/appartments", userController.appartment)
// router.route("/appartments").get( userController.appartment)




export default router