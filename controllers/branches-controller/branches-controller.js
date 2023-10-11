import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import branchesmodel from "../../models/branches.model/branches.model";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"

export async function getAllbranches (req, res, next) {
   try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    if (req.query.Name) {
      fillterobject.Name = { $regex: req.query.Name, $options: 'i' };
    
    }
    if (req.query.PhoneNumber) {
      fillterobject.PhoneNumber = { $regex: req.query.PhoneNumber, $options: 'i' };
    }
    if (req.query.Address) {
      fillterobject.Address = { $regex: req.query.Address, $options: 'i' };
    
    }
    if (req.query.fromDate && req.query.toDate) {
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      if (fromDate && toDate) {
        fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
      }
    }
  const totalcount= await branchesmodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingbranches = await branchesmodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingbranches,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function getbranch(req, res, next) {
  try {
    const { branchID } = req.params;
    let findingonebranch = await branchesmodel.checkExistThenGet({ _id: branchID }, {}, req.t('not found', { controller: "category" }));
    res.send(findingonebranch);
  }
  catch (err) {
    next(err);
  }

}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    branchesmodel.setDefaultLanguage(req.lng);
    let newbranch = await branchesmodel.create(validateMatch);
    res.send(newbranch);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function updatebranch(req, res, next) {
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
    const { branchID } = req.params;
    branchesmodel.setDefaultLanguage(req.lng);
    console.log(req.lng);
    let updatedbranch = await branchesmodel.findOneAndUpdate({ _id: +branchID }, [{ $set: validateMatch }], { new: true });
    res.send(updatedbranch);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function deletebranch(req, res, next) {
const { branchID } = req.params;
let deletedbranch = await branchesmodel.findOneAndDelete({ _id: +branchID })
res.send(deletedbranch)
 }
