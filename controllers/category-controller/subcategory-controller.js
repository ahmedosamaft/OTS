import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import categorymodel from "../../models/category.models/category.models";
import slidermodel from "../../models/slider.model/slider.model";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
import APIresponse from "../../helpers/API-response";
export async function getAllcategories(req, res, next) {
  try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    if (req.query.parent) { fillterobject = { parent: req.query.parent, deleted: false }; } else {
      fillterobject.deleted = false
      fillterobject.parent = {$exists: true}
    }
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
  let findingsubcategory = await categorymodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingsubcategory,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}

}
export async function getcategory(req, res, next) {
  const { categoryID } = req.params;
  let findingonesubcategory = await categorymodel.checkExistThenGet({ _id: categoryID, parent: { $exists: true } }, {}, '', 'parent')
  res.send(findingonesubcategory);
}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    validateMatch.image = req.file.path.slice(7)
    categorymodel.setDefaultLanguage(req.lng);
    let newsubcategory = await categorymodel.create(validateMatch);
    res.send(newsubcategory);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function updatesubcategory(req, res, next) {
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
    const { subcategoryID } = req.params;
    categorymodel.setDefaultLanguage(req.lng);
    let updatedsubcategory = await categorymodel.findOneAndUpdate({ _id: +subcategoryID }, { $set: validateMatch}, { new: true }).populate('parent');
    res.send(updatedsubcategory);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function deletesubcategory(req, res, next) {
const { subcategoryID } = req.params;
let deletedsubcategory = await categorymodel.findOneAndUpdate({ _id: +subcategoryID }, {$set: {deleted: true}});
await slidermodel.deleteMany({ subcategory: +subcategoryID }, {$set: {deleted : true}})
res.send(deletedsubcategory)
}
