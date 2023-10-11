import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import regionmodel from "../../models/region-model/region.model";
export const validatecreation = [
  body('name').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })),
  body("region").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "region" })).custom(async (value, { req }) => {
    return await regionmodel.checkExist({ _id: value }, req.t('not found', { controller: "region" }));
  }),
  body ("street").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "street" })),
  body ("details").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "details" })),
  body("phonenumber").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "phonenumber" })),
  body('latitude').notEmpty().withMessage((_,{req})=>req.t('latitudenotempty')).toFloat().isFloat(),
  body('longitude').notEmpty().withMessage((_,{req})=>req.t('longitudenotempty')).toFloat().isFloat(),

];
export const validateupdatedaddress = [
    body('name').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })),
    body("region").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "region" })).custom(async (value, { req }) => {
        return await regionmodel.checkExist({ _id: value }, req.t('not found', { controller: "region" }));
      }),
      body ("street").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "street" })),
      body ("details").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "details" })),
      body("phonenumber").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "phonenumber" })),
      body('latitude').optional().notEmpty().withMessage((_,{req})=>req.t('latitudenotempty')).toFloat().isFloat(),
      body('longitude').optional().notEmpty().withMessage((_,{req})=>req.t('longitudenotempty')).toFloat().isFloat(),
];