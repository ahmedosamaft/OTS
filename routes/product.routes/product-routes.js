import { verifyToken } from '../../auth/auth';
import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProducts } from '../../controllers/product-controller/product-controller';
import { validateProductCreation, validateProductUpdate } from "../../controllers/product-controller/product-validation";
import { uploadimage } from '../../helpers/Multer';




const productRoutes=Router()





//create product
productRoutes.post("/create",uploadimage.array('slider'),validateProductCreation,createProduct)
//find product by Id
productRoutes.get("/find/:id",getProduct)
//getAllProducts
productRoutes.get("/getAllProducts",verifyToken(["user"],{optional:true}),getAllProducts)
//updateProducts
productRoutes.put("/updateProducts/:id",validateProductUpdate,updateProducts)

//delete product

productRoutes.delete("/deleteProduct/:id",deleteProduct)



export default productRoutes