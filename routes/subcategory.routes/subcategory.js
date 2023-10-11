import { Router } from 'express';


import { getAllcategories, getcategory, create, updatesubcategory, deletesubcategory } from '../../controllers/category-controller/subcategory-controller';
import {validatecreation, validateupdatedsubcategory} from '../../controllers/category-controller/subcategory-validation'
import { uploadimage } from '../../helpers/Multer';

let router = Router();   


router.get('/getAllsubcategories', getAllcategories );
router.get('/getsubcategory/:categoryID', getcategory);
router.post('/create', uploadimage.single('image'),  validatecreation, create);
router.put('/updatesubcategory/:subcategoryID', uploadimage.single('image'), validateupdatedsubcategory, updatesubcategory);
router.delete('/deletesubcategory/:subcategoryID', deletesubcategory);

export default router;