import appsettingsmodel from "../../models/appsettings-model/appsettings-model";
import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import {checkValidationExist} from "../../helpers/methods"
import { tobool } from "../../helpers/methods";
export async function getappsettings (req, res, next) {
    let findingappsettings = await appsettingsmodel.findOne({});
    
    res.status(200).send(findingappsettings);
  }
export async function updateappsettings (req, res, next) {
    try {
      const validateMatch=checkValidationExist(req)
      validateMatch.image = req.file.path.slice(7)
      appsettingsmodel.setDefaultLanguage(req.lng);
      let updatedsettings = await appsettingsmodel.findOneAndUpdate({}, { $set: validateMatch },{upsert:true, new: true});
      res.status(200).send(updatedsettings);
    } catch (err) {
      console.log(err);
      next(err);
    }
  
  }