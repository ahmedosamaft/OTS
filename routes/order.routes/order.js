import { Router } from 'express';
import { verifyToken } from "../../auth/auth";
import { getAllorders, getorder, create, acceptorder, rejectorder, shiporder, deliverorder, deleteorder } from '../../controllers/order-controller/order-controller';
import {validatecreation} from '../../controllers/order-controller/order-validation'
let router = Router();   

router.get('/getAllorders', verifyToken("user"), getAllorders );
router.get('/getorder/:orderID', verifyToken("user"),getorder);
router.post('/create', verifyToken("user"), validatecreation, create);
router.put('/accept/:orderID', verifyToken("user"), acceptorder);
router.put('/reject/:orderID', verifyToken("user"), rejectorder);
router.put('/shipping/:orderID',verifyToken("user"),  shiporder);
router.put('/deliver/:orderID', verifyToken("user"), deliverorder);
router.delete('/deleteorder/:orderID', verifyToken("user"), deleteorder);

export default router;