import slidermodel from "../../models/slider.model/slider.model";
import { tobool } from "../../helpers/methods";
import {checkValidationExist} from "../../helpers/methods"
import {checkquery} from "../../helpers/methods"
import APIresponse from "../../helpers/API-response";
import categorymodel from "../../models/category.models/category.models";
export async function getAllimages(req, res, next) {
  try{
    const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
    if (req.query.Name){
      fillterobject.$or = [{'Name.en': {$regex: req.query.Name, $options: 'i'}}, {'Name.ar': {$regex: req.query.Name, $options: 'i'}} ]
      }
    if (req.query.category) {
      fillterobject.category = req.query.category;
  }
  if (req.query.subcategory) {
      fillterobject.subcategory = req.query.subcategory;
  }
  if (req.query.product) {
      fillterobject.trademark = req.query.product;
  }
    if (req.query.fromDate && req.query.toDate) {
      let fromDate = new Date(req.query.fromDate);
      let toDate = new Date(req.query.toDate);
      if (fromDate && toDate) {
        fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
      }
    }
  const totalcount= await slidermodel.count(fillterobject)
  const pagecount=Math.ceil(totalcount / limit)
  let findingimages = await slidermodel.find(fillterobject).sort(sortObjects).skip(skip).limit(limit);
  res.status(200).json(new APIresponse(findingimages,page,limit,pagecount,totalcount,req))
}
  catch (error) {
    next(error)
}
}
export async function getimage(req, res, next) {
  try {
    const { imageID } = req.params;
    slidermodel.setDefaultLanguage(req.lng);
    let findingoneimage = await slidermodel.findOne({ _id: imageID}).populate('category subcategory');
    res.send(findingoneimage);
  }
  catch (err) {
    next(err);
  }

}
export async function create(req, res, next) {
  try {
    const validateMatch=checkValidationExist(req)
    validateMatch.image = req.file.path.slice(7);
    let newimage = await slidermodel.create(validateMatch);
    res.send(newimage);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export async function deleteimage(req, res, next) {
const { imageID } = req.params;
let deletedslider = await slidermodel.findOneAndDelete({ _id: +imageID })
res.send(deletedslider)
 }
