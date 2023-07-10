const router = require("express").Router()
import  checkauth  from "../../middleware/checkLogin"
import user from '../../controller/User.controller'


router.post('/signup', user.signUp)
router.post('/login', user.login)
router.get('/get-user/:id', user.getUserById)
router.get('/get-all-user',user.getAllUsers)
router.post('/handle-user', checkauth.checkLogin,user.handleUser)
router.delete('/delete-user/:id', user.removeUserById)


export default router