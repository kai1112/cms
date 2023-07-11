const router = require("express").Router();
import checkauth from "../../middleware/checkLogin";
import user from "../../controller/User.controller";

router.post("/signup", user.signUp);
router.post("/login", user.login);
router.get("/get-user/:id", checkauth.checkLogin, user.getUserById);
router.get(
  "/get-all-user",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  user.getAllUsers
);
router.post("/handle-user", checkauth.checkLogin, user.handleUser);
router.delete(
  "/delete-user/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  user.removeUserById
);

export default router;
