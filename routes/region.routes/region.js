import { Router } from 'express';

import { getAllregions, getregion, create, updateregion, deleteregion } from '../../controllers/region-controller/region-controller';
import {validatecreation, validateupdatedregion} from '../../controllers/region-controller/region-validation'
let router = Router();   

router.get('/getAllregions',  getAllregions);
router.get('/getregion/:regionID', getregion);
router.post('/create',  validatecreation, create);
router.put('/updateregion/:regionID',  validateupdatedregion, updateregion);
router.delete('/deleteregion/:regionID', deleteregion);

export default router;