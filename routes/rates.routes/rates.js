import { Router } from 'express';
import { verifyToken } from "../../auth/auth";
import { getAllratings,  rate,  deleterating } from '../../controllers/ratings-controller/ratings-controller';
import {validaterate} from '../../controllers/ratings-controller/ratings-validation'
let router = Router();   

router.get('/getAllratings',  getAllratings );
router.post('/rate', verifyToken("user"),  validaterate, rate);
router.delete('/deleterating/:rateID',verifyToken("user"), deleterating);

export default router;