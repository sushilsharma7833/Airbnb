import express from "express"
const router = express.Router()
import logged_user from '../controllers/logged_controller.js'
// import multer from "../controllers/multer_controller.js"




router.get("/", logged_user.homepage)

router.get("/admin", logged_user.admin )
router.get("/hoster", logged_user.hoster )
router.get("/hoster_curd", logged_user.hoster_curd)
router.get("/Adduser",logged_user.Adduser)

router.get("/booking_conf", logged_user.booking_conf)
router.get("/property", logged_user.property)
router.get("/help", logged_user.help)






export default router