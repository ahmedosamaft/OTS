import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import ratesmodel from "../../models/rates.model/rates-model";
import User from '../../models/user.model/user-model'
import Product from "../../models/product-model/product-model"
export const validaterate = [
    body('rate').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "rate" })).toFloat().isIn([ 1, 2, 3, 4, 5]),
    body('product').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "product" })).custom(async (value, { req }) => {
        return await Product.checkExist({ _id: value, deleted: false }, req.t('not found', { controller: "product" }));
      })
];
