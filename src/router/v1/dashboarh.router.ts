const router = require("express").Router();
import checkauth from "../../middleware/checkLogin";
import Dashboarh from "../../controller/dashboarh.controller";

router.get(
  "/find-all-user-register",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Dashboarh.getAllUsers
);
router.get(
  "/find-user-register-by-month",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Dashboarh.getUserLoginByMonth
);
router.get(
  "/find-user-login-by-month",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Dashboarh.getUserRegisterByMonth
);

export default router;
