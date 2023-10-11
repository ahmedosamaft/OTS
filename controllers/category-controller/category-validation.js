import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import categorymodel from "../../models/category.models/category.models";
export const validatecreation = [
  body('Name').customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';
  }),
  body('Name.en').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "category" }));
  }),
  body('Name.ar').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "category" }));
  })
];
export const validateupdatedcategory = [
  body('Name').optional().customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';

  }),
  body('Name.en').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.en': value, _id: { $ne: req.params.categoryID } }, req.t('already exists', { controller: "category" }));
  }),
  body('Name.ar').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.ar': value, _id: { $ne: req.params.categoryID } }, req.t('already exists', { controller: "category" }));
  })
];