import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import trademarkmodel from "../../models/trademark.model/trademark.models";
import categorymodel from "../../models/category.models/category.models";
export const validatecreation = [
  body('Name').customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';
  }),
  body('Name.en').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await trademarkmodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "trademark" })
    );
  }),
  body('Name.ar').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await trademarkmodel.validateExist({ 'Name.ar': value },  req.t('already exists', { controller: "trademark" }));
  }),
  body('category').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "category" })).custom(async (value, { req }) => {
    return await categorymodel.checkExist({ _id: value, parent: { $exists: false } }, req.t('not found', { controller: "category" }));
  })
];
export const validateupdatedtrademark = [
  body('Name').optional().customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';

  }),
  body('Name.en').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await trademarkmodel.validateExist({ 'Name.en': value, _id: { $ne: req.params.trademarkID } }, req.t('already exists', { controller: "trademark" }) );
  }),
  body('Name.ar').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await trademarkmodel.validateExist({ 'Name.ar': value, _id: { $ne: req.params.trademarkID } },  req.t('already exists', { controller: "trademark" }));
  }),
  body('category').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "category" })).custom(async (value, { req }) => {
    return await categorymodel.checkExist({ _id: value, parent: { $exists: false } },  req.t('not found', { controller: "category" }));
  })
];