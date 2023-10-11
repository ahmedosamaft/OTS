import { Router } from 'express';


import { getAllimages, getimage, create,  deleteimage } from '../../controllers/slider-controller/slider-controller';
import { validatecreation} from '../../controllers/slider-controller/slider-validation';
import { uploadimage } from '../../helpers/Multer';

var router = Router();


router.get('/getAllimages', getAllimages );
router.get('/getimage/:imageID', getimage);
router.post('/create', uploadimage.single('image'),validatecreation, create);
router.delete('/deleteimage/:imageID', deleteimage);
export default router;