import { Router } from 'express';
import sliderRouter from '../slider.routes/slider';
import trademarkRouter from '../trademark.routes/trademark';
import subcategoryRouter from '../subcategory.routes/subcategory';
import branchesRouter from '../branches.routes/branches';
import categoryRouter from '../category.routes/category';
import citiesRouter from '../city.routes/city';
import regionRouter from '../region.routes/region';
import userRouter from '../user.routes/user-routes';
import productRoutes from '../product.routes/product-routes'
import AppSettingsRouter from './../appsettings.routes/appsettings';
import ratesRoutes from '../rates.routes/rates'
import addressRoutes from '../address.routes/address'
import orderRoutes from '../order.routes/order'
import favoriteRouter from '../favorite-router/favorite-routes'
let router = Router();
router.use('/appsettings', AppSettingsRouter);
//user
router.use('/user',userRouter)

//product

router.use('/product',productRoutes)
router.use('/favorite',favoriteRouter)


router.use('/category', categoryRouter);
router.use('/subcategory', subcategoryRouter);

router.use('/slider', sliderRouter);
router.use('/branches', branchesRouter);
router.use('/cities', citiesRouter);
router.use('/regions', regionRouter);
router.use('/trademark', trademarkRouter);
router.use('/rates', ratesRoutes)
router.use('/address', addressRoutes)
router.use('/order', orderRoutes)
export default router;