import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import {addressmodel} from "../../models/address.model/address-model";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
import APIresponse from "../../helpers/API-response";
export async function getAlluseraddresses(req, res, next) {
    try{
      const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
      fillterobject.deleted =  false
      fillterobject.user = req.user._id
      if (req.query.name){
      fillterobject.name = { $regex: req.query.name, $options: 'i' };
      }
      if (req.query.phonenumber) {
        fillterobject.phonenumber = { $regex: req.query.phonenumber, $options: 'i' };
      }
      if (req.query.region){
        fillterobject.region = +req.query.region
      }
      if (req.query.street){
        fillterobject.street ={ $regex: req.query.street, $options: 'i' };
      }
      if (req.query.details){
        fillterobject.details ={ $regex: req.query.details, $options: 'i' };
      }
      if (req.query.fromDate && req.query.toDate) {
        let fromDate = new Date(req.query.fromDate);
        let toDate = new Date(req.query.toDate);
        if (fromDate && toDate) {
          fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
        }
      }
    const totalcount= await addressmodel.count(fillterobject)
    const pagecount=Math.ceil(totalcount / limit)
    let findinguseraddresses = await addressmodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit).populate('user region');
    res.status(200).json(new APIresponse(findinguseraddresses,page,limit,pagecount,totalcount,req))
  }
    catch (error) {
      next(error)
  }
  }

export async function getAlladdresses(req, res, next) {
  try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    fillterobject.deleted =  false
    if (req.query.name){
        fillterobject.name = { $regex: req.query.name, $options: 'i' };
        }
        if (req.query.phonenumber) {
          fillterobject.phonenumber = { $regex: req.query.phonenumber, $options: 'i' };
        }
        if (req.query.region){
          fillterobject.region = +req.query.region
        }
        if (req.query.user){
          fillterobject.user = +req.query.user
        }
        if (req.query.street){
          fillterobject.street ={ $regex: req.query.street, $options: 'i' };
        }
        if (req.query.details){
          fillterobject.details ={ $regex: req.query.details, $options: 'i' };
        }
    if (req.query.fromDate && req.query.toDate) {
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      if (fromDate && toDate) {
        fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
      }
    }
  const totalcount= await addressmodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingaddresses = await addressmodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit).populate('user region');
  res.status(200).json(new APIresponse(findingaddresses,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function getaddress(req, res, next) {
  try {
    const { addressID } = req.params;
    let findingoneaddress = await addressmodel.checkExistThenGet({ _id: addressID}, {}, req.t('not found', { controller: "address" }), "user region");
    res.send(findingoneaddress);
  }
  catch (err) {
    next(err);
  }

}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    addressmodel.setDefaultLanguage(req.lng);
    let newaddress = await addressmodel.create(validateMatch);
    await addressmodel.findOneAndUpdate({_id: newaddress._id}, {$set: {user: req.user._id}})
    res.send(newaddress);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function updateaddress(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    const { addressID } = req.params;
    addressmodel.setDefaultLanguage(req.lng);
    let updatedaddress = await addressmodel.findOneAndUpdate({ _id: +addressID }, [{ $set: validateMatch }], { new: true });
    res.send(updatedaddress);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function deleteaddress(req, res, next) {
const { addressID } = req.params;
let deletedaddress= await addressmodel.findOneAndUpdate({ _id: +addressID }, {$set: {deleted : true}})
res.send(deletedaddress)
 }
