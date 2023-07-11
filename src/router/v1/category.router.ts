const router = require("express").Router();
import checkauth from "../../middleware/checkLogin";
import Category from "../../controller/Category.controller";

router.post(
  "/create",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Category.create
);
router.get("/find-name", Category.findName);
router.get("/find-all", Category.findAll);
router.put(
  "/update-name/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Category.handleName
);
router.put(
  "/update-status/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Category.handleStatus
);
router.put(
  "/update-isPushlished/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Category.handleIsPushlished
);

export default router;
