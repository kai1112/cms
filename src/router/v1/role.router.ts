const router = require("express").Router();
import checkauth from "../../middleware/checkLogin";
import role from "../../controller/Role.controller";

router.post(
  "/create",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  role.create
);
router.get(
  "/find-by-id/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  role.findById
);
router.get(
  "/find-all",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  role.findAllRole
);
router.put(
  "/update/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  role.update
);
router.delete(
  "/delete/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  role.remove
);

export default router;
