import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import appsettingsmodel from "../../models/appsettings-model/appsettings-model";
export const appsettingsvalidation = [
    body('SocialLinks').customSanitizer(value => {
        return (typeof value === 'string') ?
          JSON.parse(value) : '';
      }),
    body('AboutUs').customSanitizer(value => {
        return (typeof value === 'string') ?
          JSON.parse(value) : '';
      }),
    body('InstructionOfUse').customSanitizer(value => {
        return (typeof value === 'string') ?
          JSON.parse(value) : '';
      }),
    body('PrivacyPolicy').customSanitizer(value => {
        return (typeof value === 'string') ?
          JSON.parse(value) : '';
      }),
    body('SocialLinks.Gmail').optional(),
    body('SocialLinks.Whatsapp').optional(),
    body('SocialLinks.Facebook').optional(),
    body('SocialLinks.Snapchat').optional(),
    body('SocialLinks.Twitter').optional(),
    body('SocialLinks.Outlook').optional(),
    body('Address').optional().notEmpty().withMessage((_,{req})=>req.t('addressnotempty')),
    body('Latitude').optional().notEmpty().withMessage((_,{req})=>req.t('latitudenotempty')).toFloat().isFloat(),
    body('Longitude').optional().notEmpty().withMessage((_,{req})=>req.t('longitudenotempty')).toFloat().isFloat(),
    body('AboutUs.ar').optional().notEmpty().withMessage((_,{req})=>req.t('aboutusnotempty')),
    body('AboutUs.en').optional().notEmpty().withMessage((_,{req})=>req.t('aboutusnotempty')),
    body('InstructionOfUse.ar').optional().notEmpty().withMessage((_,{req})=>req.t('instructionnotempty')),
    body('InstructionOfUse.en').optional().notEmpty().withMessage((_,{req})=>req.t('instructionnotempty')),
    body('PrivacyPolicy.ar').optional().notEmpty().withMessage((_,{req})=>req.t('privacynotempty')),
    body('PrivacyPolicy.en').optional().notEmpty().withMessage((_,{req})=>req.t('privacynotempty')),
    body('AndroidUrl').optional().notEmpty().withMessage((_,{req})=>req.t('androidnotempty')),
    body('IosUrl').optional().notEmpty().withMessage((_,{req})=>req.t('iosnotempty')),

    
 ]