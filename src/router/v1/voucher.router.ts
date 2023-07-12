const router = require("express").Router();
import checkauth from "../../middleware/checkLogin";
import voucher from "../../controller/Voucher.controller";

router.post("/create",checkauth.checkLogin, voucher.create);
router.get("/get-all-voucher",checkauth.checkLogin, voucher.findAllVouchers);
router.get("/get-voucher-by-id/:id", checkauth.checkLogin, voucher.findVoucherById);
router.get(
  "/get-name",
  checkauth.checkLogin,
  checkauth.checkRoleAdmin,
  voucher.findName
);
router.put("/update/:id", checkauth.checkLogin, voucher.update);


export default router;
