



// const authenticateUser=(req, res, next)=>{
 
//   // Check if token exists in cookies
//   console.log("authenticateuser middleware start")
//   console.log(req.cookies)
//   const token = req.cookies.jwt;
//   console.log(token)
//   if (!token) {
//     console.log("redirect at home for not logged user in absense of token")

// res.redirect("/");

 
//   }

//   try {
//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     // Set user object on request
//     req.user = decoded;
 
// console.log("token verified")
// // Redirect to homepage with user details
// //  res.redirect(`/home-page?username=${decoded.username}&email=${decoded.email}`);
//  res.redirect("/authuser");

//     next();
//   } catch (err) {
//     res.status(400).send('Invalid token.');
//   }


// }


import jwt from "jsonwebtoken"
import userController from '../controllers/userController.js'

const authenticateUser = (req, res, next) => {
  console.log("authenticateuser middleware start")
 
  const token = req.cookies.jwt;


  if (!token) {
    console.log("redirect at home for not logged user in absence of token")
    return res.redirect("/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;  /*user ????  */

    console.log("token verified")
  
  next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}

export default authenticateUser