import { Router } from "express";
import CoordenadasController from "../controllers/travel.controller.js";


const router = Router();

router.post('/map', CoordenadasController);

export default router;