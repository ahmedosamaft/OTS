import { Router } from 'express';

import { getAllcategories, getcategory, create, updatecategory, deletecategory } from '../../controllers/category-controller/category-controller';
import {validatecreation, validateupdatedcategory} from '../../controllers/category-controller/category-validation'
import { uploadimage } from '../../helpers/Multer';
let router = Router();   

router.get('/getAllcategories',  getAllcategories );
router.get('/getcategory/:categoryID', getcategory);
router.post('/create', uploadimage.single('image'),  validatecreation, create);
router.put('/updatecategory/:categoryID', uploadimage.single('image'), validateupdatedcategory, updatecategory);
router.delete('/deletecategory/:categoryID', deletecategory);

export default router;