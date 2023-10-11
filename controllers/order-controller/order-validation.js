import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import productmodel from "../../models/product-model/product-model";
import regionmodel from "../../models/region-model/region.model";
export const validatecreation = [
body('products.*.productid').customSanitizer(async value => {
    return await productmodel.checkExistThenGet({ _id: value}, {}, 'j', );
      }),
body ('products.*.quantity').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "quantity" })).toFloat().isFloat(),
body ('products.*.offer').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "price" })).toFloat().isFloat(),
body("products").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "product" })).isArray(),
body('address.name').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })),
body("address.region").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "region" })).custom(async (value, { req }) => {
  return await regionmodel.checkExist({ _id: value }, req.t('not found', { controller: "region" }));
}),
body ("address.street").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "street" })),
body ("address.details").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "details" })),
body("address.phonenumber").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "phonenumber" })),
body('address.latitude').notEmpty().withMessage((_,{req})=>req.t('latitudenotempty')).toFloat().isFloat(),
body('address.longitude').notEmpty().withMessage((_,{req})=>req.t('longitudenotempty')).toFloat().isFloat(),
body("notes").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "notes" })),
body('paymentmethods').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "paymentmethods" })).isIn(['cash', 'visa']).withMessage((_,{req})=>req.t('paymentmethodsIN')),
]