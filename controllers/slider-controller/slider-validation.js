import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import categorymodel from "../../models/category.models/category.models";
import { slidertypesenum, slidertypes } from '../../models/slider.model/slidertypes';
export const validatecreation = [
    body('type').notEmpty().isIn(['category', 'subcategory', 'product']).withMessage((_,{req})=>req.t('typeIN')),
    body('category').if(body('type').equals('category')).notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "category" })).custom(async (value, { req }) => {
        return await categorymodel.checkExist({ _id: value, parent: { $exists: false } }, req.t('not found', { controller: "category" }));
    }),
    body('subcategory').if(body('type').equals('subcategory')).notEmpty().withMessage((_,{req})=>req.t('subcategorynotempty')).custom(async (value, { req }) => {
        return await categorymodel.checkExist({ _id: value, parent: req.body.category }, req.t('not found', { controller: "subcategory" }));
    }),
    body('product').if(body('type').equals('product')).notEmpty().withMessage((_,{req})=>req.t('productnotempty')).custom(async (value, { req }) => {
        return await categorymodel.checkExist({ _id: value}, req.t('not found', { controller: "product" }));
    }),
];
