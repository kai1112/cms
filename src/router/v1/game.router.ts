const router = require("express").Router();
import checkauth from "../../middleware/checkLogin";
import Game from "../../controller/Game.controller";

router.post(
  "/create",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Game.create
);
router.get("/find-name", Game.findGameByName);
router.get("/find-all", Game.findAll);
router.put(
  "/update-description/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Game.handleDescription
);
router.put(
  "/update-developer/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Game.handleDeveloper
);

router.delete(
  "/delete/:id",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  Game.remove
);
export default router;
