import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import ratesmodel from "../../models/rates.model/rates-model";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
import APIresponse from "../../helpers/API-response";
export async function getAllratings(req, res, next) {
try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    if (req.query.rate){
        fillterobject.rate= +req.query.rate;
    }
    if (req.query.user){
      fillterobject.user = +req.query.user
    }
    if(req.query.product){
      fillterobject.product = +req.query.product
    }
    if (req.query.fromDate && req.query.toDate) {
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      if (fromDate && toDate) {
        fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
      }
    }
  const totalcount= await ratesmodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingrates = await ratesmodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit).populate('user product');
  res.status(200).json(new APIresponse(findingrates,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function rate(req, res, next) {
  try {
const validateMatch=checkValidationExist(req)
let newrating = await ratesmodel.findOneAndUpdate({user: req.user._id, product: req.body.product}, {$set:validateMatch}, {upsert: true, new : true});
    res.send(newrating);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleterating(req, res, next) {
    try{
        let deletedrating = await ratesmodel.findOneAndDelete({user: req.user.id, product: req.body.product})
        res.send(deletedrating)
    }catch (err) {
       res.send (err)
    }

 }
