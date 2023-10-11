import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import categorymodel from "../../models/category.models/category.models";
export const validatecreation = [
  body('Name').customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';
  }),
  body('Name.en').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "subcategory" }));
  }),
  body('Name.ar').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "subcategory" }));
  }),
  body('parent').custom(async (value, { req }) => {
    return await categorymodel.checkExist({ _id: value, parent: { $exists: false } }, req.t('not found', { controller: "category" }));
  }), 
];
export const validateupdatedsubcategory = [
  body('Name').optional().customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';

  }),
  body('Name.en').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "subcategory" }));
  }),
  body('Name.ar').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await categorymodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "subcategory" }));
  }),
  body('parent').optional().custom(async (value, { req }) => {
    return await categorymodel.checkExist({ 'Name': value }, req.t('not found', { controller: "category" }));
  }),
];