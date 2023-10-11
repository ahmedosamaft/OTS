import { Router } from 'express';
import { verifyToken } from "../../auth/auth";
import { getAlluseraddresses, getAlladdresses, getaddress,  create, updateaddress, deleteaddress } from '../../controllers/address-controller/address-controller';
import {validatecreation, validateupdatedaddress} from '../../controllers/address-controller/address-validation'
let router = Router();   

router.get('/getAlluseraddresses', verifyToken("user"), getAlluseraddresses );
router.get('/getAlladdresses', verifyToken("admin"), getAlladdresses );
router.get('/getaddress/:addressID',verifyToken("user"), getaddress);
router.post('/create', verifyToken("user"),  validatecreation, create);
router.put('/updateaddress/:addressID', verifyToken("user"), validateupdatedaddress, updateaddress);
router.delete('/deleteaddress/:addressID',verifyToken("user"), deleteaddress);

export default router;