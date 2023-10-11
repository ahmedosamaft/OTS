import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import regionmodel from "../../models/region-model/region.model";
import citymodel from "../../models/city-model/city.model";
export const validatecreation = [
  body('Name').customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';
  }),
  body('Name.en').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await regionmodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "region" }));
  }),
  body('Name.ar').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await regionmodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "region" }));
  }),
  body("City").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "city" })).custom(async (value, { req }) => {
    return await citymodel.checkExist({ _id: value }, req.t('not found', { controller: "city" }));
  })
];
export const validateupdatedregion = [
  body('Name').optional().customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';

  }),
  body('Name.en').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await regionmodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "region" }));
  }),
  body('Name.ar').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await regionmodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "region" }));
  }),
  body("City").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "city" })).custom(async (value, { req }) => {
    return await citymodel.checkExist({ _id: value }, req.t('not found', { controller: "city" }));
  })
];