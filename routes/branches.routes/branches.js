import { Router } from 'express';

import { getAllbranches, getbranch, create, updatebranch, deletebranch } from '../../controllers/branches-controller/branches-controller';
import {validatecreation, validateupdatedbranch} from '../../controllers/branches-controller/branches-validation'
let router = Router();   

router.get('/getAllbranches',  getAllbranches );
router.get('/getbranch/:branchID', getbranch);
router.post('/create', validatecreation, create);
router.put('/updatebranch/:branchID', validateupdatedbranch, updatebranch);
router.delete('/deletebranch/:branchID', deletebranch);

export default router;