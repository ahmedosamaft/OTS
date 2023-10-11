import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import regionmodel from "../../models/region-model/region.model";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
import APIresponse from "../../helpers/API-response";
export async function getAllregions(req, res, next) {
try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    fillterobject.deleted = false
    if (req.query.Name){
        fillterobject.$or = [{'Name.en': {$regex: req.query.Name, $options: 'i'}}, {'Name.ar': {$regex: req.query.Name, $options: 'i'}} ]
        }
    if (req.query.City) {
        fillterobject.City = req.query.City;
    }
    if (req.query.fromDate && req.query.toDate) {
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      if (fromDate && toDate) {
        fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
      }
    }
  const totalcount= await regionmodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingregions = await regionmodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingregions,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function getregion(req, res, next) {
  try {
    const { regionID } = req.params;
    let findingoneregion = await regionmodel.checkExistThenGet({ _id: regionID }, {}, req.t('not found', { controller: "region" }), 'City');
    res.send(findingoneregion);
  }
  catch (err) {
    next(err);
  }

}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    regionmodel.setDefaultLanguage(req.lng);
    let newregion = await regionmodel.create(validateMatch);
    res.send(newregion);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function updateregion(req, res, next) {
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
    const { regionID } = req.params;
    regionmodel.setDefaultLanguage(req.lng);
    console.log(req.lng);
    let updatedregion = await regionmodel.findOneAndUpdate({ _id: +regionID }, [{ $set: validateMatch }], { new: true }).populate('City');
    res.send(updatedregion);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function deleteregion(req, res, next) {
const { regionID } = req.params;
let deletedregion = await regionmodel.findOneAndUpdate({ _id: +regionID }, {$set: {deleted : true}})
res.send(deletedregion)
 }
