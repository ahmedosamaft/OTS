
import { checkquery, checkValidationExist } from "../../helpers/methods"
import { matchedData } from "express-validator"
import Favorites from "../../models/favorits.model/favorits-model"
import APIresponse from "../../helpers/API-response"


// add product to favorite by userId and productId
export const addToFavorites=async(req,res,next)=>{
    try {
        const favoriteData=checkValidationExist(req)
        Favorites.setDefaultLanguage(req.lng)
        favoriteData.userFavorite=req.user.id
       await Favorites.validateExist({  userFavorite: favoriteData.userFavorite,productId: favoriteData.productId  },req.t('already exists', { controller: "favorite" }))
        const newFavorites=await Favorites.create(favoriteData)
         
         res.status(200).json(newFavorites)
        
    } catch (error) {
        next(error)
    }

}


//get all favorite

export const getAllFavorite=async(req,res,next)=>{
    try {

        const {fillterobject,sortObjects,page,limit,skip}=checkquery(req)

        if(req.query.userFavorite){
            fillterobject.userFavorite= +req.query.userFavorite
        }
        if(req.query.productId){
            fillterobject.productId= +req.query.productId
        }

        if (req.query.fromDate && req.query.toDate) {
            let fromDate = new Date(req.query.fromDate);
            let toDate = new Date(req.query.toDate);
            if (fromDate && toDate) {
              fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
            }
          }
        const totalCount=await Favorites.count(fillterobject)
        const pageCount=Math.ceil(totalCount/limit)

        const favorites=await Favorites.find(fillterobject).sort(sortObjects).skip(skip).limit(limit)

        res.status(200).json(new APIresponse(favorites,pageCount,totalCount,page,limit,req))
        
    } catch (error) {
        next(error)
        
    }

}
//delete favorite by id
export const deleteFavorate=async(req,res,next)=>{
    try {
        const favoriteData=checkValidationExist(req)
        Favorites.setDefaultLanguage(req.lng)
        favoriteData.userFavorite=req.user.id
      // await Favorites.validateExist({  userFavorite: favoriteData.userFavorite,productId: favoriteData.productId  },req.t('already exists', { controller: "favorite" }))
        await Favorites.findOneAndDelete(favoriteData)
         
         res.status(200).json("delete")
    } catch (error) {
        next(error)
        
    }

}

