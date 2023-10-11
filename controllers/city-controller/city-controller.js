import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import APIresponse from "../../helpers/API-response";
import citymodel from "../../models/city-model/city.model";
import regionmodel from "../../models/region-model/region.model";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
export async function getAllcities(req, res, next) {
try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    fillterobject.deleted = false
    if (req.query.Name){
        fillterobject.$or = [{'Name.en': {$regex: req.query.Name, $options: 'i'}}, {'Name.ar': {$regex: req.query.Name, $options: 'i'}} ]
        }
    if (req.query.fromDate && req.query.toDate) {
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      if (fromDate && toDate) {
        fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
      }
    }
  const totalcount= await citymodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingcities = await citymodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingcities,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function getcity(req, res, next) {
  try {
    const { cityID } = req.params;
    let findingonecity = await citymodel.checkExistThenGet({ _id: cityID }, {}, req.t('not found', { controller: "city" }));
    res.send(findingonecity);
  }
  catch (err) {
    next(err);
  }

}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    citymodel.setDefaultLanguage(req.lng);
    let newcity = await citymodel.create(validateMatch);
    res.send(newcity);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function updatecity(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    if (validateMatch.Name) {
      validateMatch.Name = {
        $mergeObjects: [
          "$Name",
          validateMatch.Name
        ]
      };
    }
    const { cityID } = req.params;
    citymodel.setDefaultLanguage(req.lng);
    console.log(req.lng);
    let updatedcity = await citymodel.findOneAndUpdate({ _id: +cityID }, [{ $set: validateMatch }], { new: true });
    res.send(updatedcity);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function deletecity(req, res, next) {
const { cityID } = req.params;
let deletedcity = await citymodel.findOneAndUpdate({ _id: +cityID }, {$set: {deleted : true}})
await regionmodel.findOneAndUpdate({ City: +cityID }, {$set: {deleted : true}})
res.send(deletedcity)
 }
