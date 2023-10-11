import { Router } from 'express';

import { getAllcities, getcity, create, updatecity, deletecity } from '../../controllers/city-controller/city-controller';
import {validatecreation, validateupdatedcity} from '../../controllers/city-controller/city-validation'
let router = Router();   

router.get('/getAllcities',  getAllcities );
router.get('/getcity/:cityID', getcity);
router.post('/create',  validatecreation, create);
router.put('/updatecity/:cityID',  validateupdatedcity, updatecity);
router.delete('/deletecity/:cityID', deletecity);

export default router;