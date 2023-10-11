import { check, oneOf, validationResult, body, matchedData } from "express-validator";
import Apierror from "../../helpers/API-error";
import ordermodel from "../../models/order.model/order-model";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
import APIresponse from "../../helpers/API-response";
export async function getAllorders (req, res, next) {
   try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    fillterobject.deleted =  false
    fillterobject.user = req.user._id
    if (req.query.status) {
      fillterobject.status = { $regex: req.query.status, $options: 'i' };
    }
    if (req.query.paymentmethods){
        fillterobject.paymentmethods = { $regex: req.query.paymentmethods, $options: 'i' };
    }

    if (req.query.fromDate && req.query.toDate) {
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      if (fromDate && toDate) {
        fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
      }
    }
  const totalcount= await ordermodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingorders = await ordermodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingorders,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function getorder(req, res, next) {
  try {
    const { orderID } = req.params;
    let findingoneorder = await ordermodel.checkExistThenGet({ _id: orderID }, {}, req.t('not found', { controller: "order" }));
    res.send(findingoneorder);
  }
  catch (err) {
    next(err);
  }

}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    validateMatch.totalprice = 0;
    validateMatch.taxes = 10;
    validateMatch.products.forEach(element => {
        if (!element.offer){
          element.price =  element.productid.price * element.quantity
        }
        
        if (element.offer){
            element.price = (element.productid.price - ((element.offer/100)*element.productid.price)) * element.quantity
        }
        
        validateMatch.totalprice = validateMatch.totalprice + element.price
    })
    // validateMatch.products.forEach(element => {
    // })
    validateMatch.totalpriceaftertaxes = (validateMatch.totalprice + ((validateMatch.taxes/100)*validateMatch.totalprice))
    validateMatch.user = req.user._id
    let neworder = await ordermodel.create(validateMatch);
    res.send(neworder);
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export async function acceptorder (req, res, next) {
  try {
    const { orderID } = req.params;
    let acceptedorder = await ordermodel.findOneAndUpdate({ _id: +orderID }, [{ $set: {status: "accepted"} }], { new: true });
    res.send(acceptedorder);
  } catch (err) {
    console.log(err);
    next(err);
  }

}
export async function rejectorder (req, res, next) {
    try {
      const { orderID } = req.params;
      const validateMatch=checkValidationExist(req)
      let rejectedorder = await ordermodel.findOneAndUpdate({ _id: +orderID }, [{ $set: {status: "rejected"} }], { new: true });
      await ordermodel.findOneAndUpdate({_id: rejectedorder._id}, [{$set: validateMatch}], {new: true})
      res.send(rejectedorder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  
  }

export async function shiporder (req, res, next) {
    try {
      const { orderID } = req.params;
      let shippedorder = await ordermodel.findOneAndUpdate({ _id: +orderID }, [{ $set: {status: "shipped"} }], { new: true });
      res.send(shippedorder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  
  }

export async function deliverorder (req, res, next) {
    try {
      const { orderID } = req.params;
      let deliveredorder = await ordermodel.findOneAndUpdate({ _id: +orderID }, [{ $set: {status: "delivered"} }], { new: true });
      res.send(deliveredorder);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

export async function deleteorder(req, res, next) {
const { orderID } = req.params;
let deletedorder = await ordermodel.findOneAndUpdate({ _id: +orderID }, {$set: {deleted : true}})
res.send(deletedorder)
 }
