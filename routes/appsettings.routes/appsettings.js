import { Router } from 'express';
import { translation } from "../../helpers/methods";

import {getappsettings, updateappsettings } from '../../controllers/appsettings-controller/appsettings-controller';
import {appsettingsvalidation } from '../../controllers/appsettings-controller/appsettings-validation';
import { uploadimage } from '../../helpers/Multer';
let router = Router();


router.get('/getappsettings', getappsettings );
router.put('/updateappsettings', uploadimage.single('image'), appsettingsvalidation, updateappsettings )

export default router;
