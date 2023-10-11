import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import citymodel from "../../models/city-model/city.model";
export const validatecreation = [
  body('Name').customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';
  }),
  body('Name.en').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await citymodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "city" }));
  }),
  body('Name.ar').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await citymodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "city" }));
  })
];
export const validateupdatedcity = [
  body('Name').optional().customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';

  }),
  body('Name.en').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await citymodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "city" }));
  }),
  body('Name.ar').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await citymodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "city" }));
  })
];