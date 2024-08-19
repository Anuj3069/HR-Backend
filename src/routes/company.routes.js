import { Router } from "express";
import { CompanyUser } from "../controllers/company.controller.js";

const router=Router()

router.route("/registerCompany").post(
    CompanyUser)

export default router