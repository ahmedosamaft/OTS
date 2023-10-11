import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import categorymodel from "../../models/category.models/category.models";
import trademarkmodel from "../../models/trademark.model/trademark.models";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import slidermodel from "../../models/slider.model/slider.model";
import {checkquery} from "../../helpers/methods"
import {DELETEALL} from "../../helpers/Delete-files"
import APIresponse from "../../helpers/API-response";
export async function getAllcategories(req, res, next) {
  try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    fillterobject.deleted =  false
    fillterobject.parent = {$exists: false}
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
  const totalcount= await categorymodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingcategory = await categorymodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingcategory,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function getcategory(req, res, next) {
  try {
    const { categoryID } = req.params;
    let findingonecategory = await categorymodel.checkExistThenGet({ _id: categoryID, parent: { $exists: false } }, {}, req.t('not found', { controller: "category" }));
    res.send(findingonecategory);
  }
  catch (err) {
    next(err);
  }

}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    validateMatch.image = req.file.path.slice(7)
    categorymodel.setDefaultLanguage(req.lng);
    let newcategory = await categorymodel.create(validateMatch);
    res.send(newcategory);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function updatecategory(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    if (validateMatch.image){
      validateMatch.image = req.file.path.slice(7)
    }
    if (validateMatch.Name) {
      validateMatch.Name = {
        $mergeObjects: [
          "$Name",
          validateMatch.Name
        ]
      };
    }
    const { categoryID } = req.params;
    categorymodel.setDefaultLanguage(req.lng);
    console.log(req.lng);
    let updatedcategory = await categorymodel.findOneAndUpdate({ _id: +categoryID }, [{ $set: validateMatch }], { new: true });
    res.send(updatedcategory);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function deletecategory(req, res, next) {
const { categoryID } = req.params;
let deletedcategory = await categorymodel.findOneAndUpdate({ _id: +categoryID }, {$set: {deleted : true}})
await categorymodel.updateMany({ parent: +categoryID }, {$set: {deleted : true}})
await trademarkmodel.updateMany({category: +categoryID}, {$set: {deleted: true}})
await slidermodel.deleteMany({ category: +categoryID }, {$set: {deleted : true}})
res.send(deletedcategory)
 }
