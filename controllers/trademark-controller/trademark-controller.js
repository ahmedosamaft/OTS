import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import trademarkmodel from "../../models/trademark.model/trademark.models";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
import APIresponse from "../../helpers/API-response";
export async function getAlltrademarks(req, res, next) {
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
  const totalcount= await trademarkmodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingtrademark = await trademarkmodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingtrademark,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}

}
export async function gettrademark(req, res, next) {
  const { trademarkID } = req.params;
  let findingonetrademark = await trademarkmodel.findOne({ _id: trademarkID }).populate('category');
  res.send(findingonetrademark);
}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    trademarkmodel.setDefaultLanguage(req.lng);
    let newtrademark = await trademarkmodel.create(validateMatch);
    res.send(newtrademark);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function updatetrademark(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    const { trademarkID } = req.params;
    trademarkmodel.setDefaultLanguage(req.lng);
    let updatedtrademark = await trademarkmodel.findOneAndUpdate({ _id: +trademarkID }, { $set: validateMatch }, { new: true }).populate('category');
    res.send(updatedtrademark);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function deletetrademark(req, res, next) {
const { trademarkID } = req.params;
let deletedtrademark = await trademarkmodel.findOneAndUpdate({ _id: +trademarkID }, {$set: {deleted: true}});
res.send(deletedtrademark)
 }
