import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import branchesmodel from "../../models/branches.model/branches.model";
export const validatecreation = [
  body('Name').customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';
  }),
//   body('Address').customSanitizer(value => {
//     return (typeof value === 'string') ?
//       JSON.parse(value) : '';
//   }),
  body('Name.en').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await branchesmodel.validateExist({ 'Name.en': value }, req.t('already exists', { controller: "branch" }));
  }),
  body('Name.ar').notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await branchesmodel.validateExist({ 'Name.ar': value }, req.t('already exists', { controller: "branch" }));
  }),
  body('Address').notEmpty().withMessage((_,{req})=>req.t('addressnotempty')).custom(async (value, { req }) => {
    return await branchesmodel.validateExist({ 'Address': value }, req.t('already exists', { controller: "branch" }));
  }),
//   body('Address.ar').notEmpty().withMessage((_,{req})=>req.t('addressnotempty')).custom(async (value, { req }) => {
//     return await branchesmodel.validateExist({ 'Address.ar': value }, req.t('already exists', { controller: "branch" }));
//   }),
  body("PhoneNumber").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "phonenumber" })),
  body('Latitude').notEmpty().withMessage((_,{req})=>req.t('latitudenotempty')).toFloat().isFloat(),
  body('Longitude').notEmpty().withMessage((_,{req})=>req.t('longitudenotempty')).toFloat().isFloat(),

];
export const validateupdatedbranch = [
  body('Name').optional().customSanitizer(value => {
    return (typeof value === 'string') ?
      JSON.parse(value) : '';

  }),
//   body('Address').optional().customSanitizer(value => {
//     return (typeof value === 'string') ?
//       JSON.parse(value) : '';

//   }),
  body('Name.en').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await branchesmodel.validateExist({ 'Name.en': value}, req.t('already exists', { controller: "branch" }));
  }),
  body('Name.ar').optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })).custom(async (value, { req }) => {
    return await branchesmodel.validateExist({ 'Name.ar': value}, req.t('already exists', { controller: "branch" }));
  }),
  body('Address').optional().notEmpty().withMessage((_,{req})=>req.t('addressnotempty')).custom(async (value, { req }) => {
    return await branchesmodel.validateExist({ 'Address': value }, req.t('already exists', { controller: "branch" }));
  }),
//   body('Address.ar').optional().notEmpty().withMessage((_,{req})=>req.t('addressnotempty')).custom(async (value, { req }) => {
//     return await branchesmodel.validateExist({ 'Address.ar': value }, req.t('already exists', { controller: "branch" }));
//   }),
  body("PhoneNumber").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "phonenumber" })),
  body('Latitude').optional().notEmpty().withMessage((_,{req})=>req.t('latitudenotempty')).toFloat().isFloat(),
  body('Longitude').optional().notEmpty().withMessage((_,{req})=>req.t('longitudenotempty')).toFloat().isFloat(),
];