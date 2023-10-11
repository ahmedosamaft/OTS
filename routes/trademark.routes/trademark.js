import { Router } from 'express';


import { getAlltrademarks, gettrademark, create, updatetrademark, deletetrademark } from '../../controllers/trademark-controller/trademark-controller'
import {validatecreation, validateupdatedtrademark} from '../../controllers/trademark-controller/trademark-validation'


let router = Router();


router.get('/getAlltrademarks', getAlltrademarks );
router.get('/gettrademark/:trademarkID', gettrademark);
router.post('/create', validatecreation, create);
router.put('/updatetrademark/:trademarkID',  validateupdatedtrademark, updatetrademark);
router.delete('/deletetrademark/:trademarkID', deletetrademark);
export default router;