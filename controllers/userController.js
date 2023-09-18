// Dotenv
import dotenv from "dotenv";
dotenv.config();
// import UserModel from "../models/Schema.js"
import { UserModel, Card } from "../models/Schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/*no need to write filename.ejs--due to set template engine */
class userController {
  static home = async (req, res) => {
    const ApiCards = await Card.find(
      {}
    ); /* finding inside Card database in cluster*/
    // console.log(result)
    res.render("home", { hotelData: ApiCards || [] });
  };

  static signup = (req, res) => {
    res.render("signup");
  };

  //adding new user in db
  static createUserDoc = async (req, res) => {
    const { name, email, password, conf_password, tc } = req.body; //this data is given by new user in signup page

    try {
      // Check if user with the same email already exists in db
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.send(
          'User with this email already exists. <a href="/signup"> Go back to home page</a>'
        );
      }

      // Check if password and confirm password match
      if (password !== conf_password) {
        return res.send(
          'Password and confirm password do not match. <a href="/signup">  Go back to home page</a>'
        );
      }
      // Hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // Create new user document
      const newUser = new UserModel({
        name,
        email: email,
        password: hashPassword,
      });

      // Save user document to database
      await newUser.save();

      // Create JWT token with 5-day expiration time
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "5d",
      });

      // Set token in a cookie with a 5-day expiration time
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 5 * 24 * 60 * 60 * 1000,
      });

      // Redirect to home page
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.status(500).send("An error occurred while registering user");
    }
  };

  static login = (req, res) => {
    res.render("login");
  };

  static verifyLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      const result = await UserModel.findOne({ email: email });
      if (result != null) {
        // compare entered password with hashed password
        const passwordMatch = await bcrypt.compare(password, result.password);
        if (passwordMatch && result.email == email) {
          // Create JWT token with 5-day expiration time while user login
          const token = jwt.sign({ userId: result._id },  process.env.JWT_SECRET_KEY, {
            expiresIn: "5d",
          });

          // Set token in a cookie with a 5-day expiration time
          // res.cookie('name', value, { httpOnly: true [accessible by server side only], maxAge: milliseconds})
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 5 * 24 * 60 * 60 * 1000,
          });
          // console.log(token)--->checking in jwt.io  as well as check in cookie of application{inspect}

          // Redirect to authuser  page
          res.redirect("/authuser");
        } else {
          res.send("<h1>Email or Password is not Valid</h1>");
        }
      } else {
        res.send("<h1>You are not a Registered User</h1>");
      }
    } catch (error) {
      console.log(error);
    }
  };
}

export default userController;
