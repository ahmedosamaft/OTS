import { body } from "express-validator";
import Favorites from "../../models/favorits.model/favorits-model";



export const favoritesValidations=[
    // body("userFavorite").notEmpty().withMessage((_,{req})=>req.t("notEmpty",{controller: "userId"})).custom(async(value,{req})=>{
    //     return await Favorites.checkExist({ _id: value},"user not found")
    // }),
    body("productId").notEmpty().withMessage((_,{req})=>req.t("notEmpty",{controller: "productId"})).custom(async(value,{req})=>{
        return await Favorites.checkExist({ id: value},"product not found")
    }),
]