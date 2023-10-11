import {matchedData,body,validationResult} from "express-validator"
import User from "../models/user.model/user-model";
import APIError from "./API-error"
import APIresponse from "./API-response";


export function tobool (value){
        return Boolean(value) && value !=="false";
    }
export const  checkValidationExist=(req,res)=>{
       const validate= validationResult(req).array()
       if(validate.length>0){
        throw new APIError(422,validate.map(err=>err.msg))
       }
        return matchedData(req,{locations:["body"]})
}


export const checkquery=(req,res)=>{
        const fillterobject={}
          
         const sortType= req.query.sortType === "asc" ? 1 : -1
        const sortObjects={createdAt: sortType}
        
        let limit =20
        let skip=0
        let page=1
        

        if(+req.query.limit){
            limit=+req.query.limit
        }
        

        if(+req.query.page){
            page= +req.query.page
            skip=((+req.query.page)-1)*limit
        }
        const all = tobool(req.query.all);
         if (all) {
          skip = 0;
          limit = 0;
          page = 0;
         }

        const query={limit,skip,page,all,fillterobject,sortObjects}
        return  query
         


}

