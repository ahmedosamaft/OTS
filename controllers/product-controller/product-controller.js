import APIresponse from "../../helpers/API-response"
import { matchedData } from "express-validator"
import APIError from "../../helpers/API-error"
import { checkquery, checkValidationExist } from "../../helpers/methods"
import Product from "../../models/product-model/product-model"
//create product
export const createProduct=async(req,res,next)=>{

    try {
        checkValidationExist(req)

        const validateData=matchedData(req ,{locations:["body"]})

        if(req.files && req.files.length>0){
            validateData.slider=req.files.map((curruntValue,index)=>{
                return curruntValue.path
            })
        }else{
            throw new APIError(422, "slider Must be add")
        }
         Product.setDefaultLanguage(req.lng)
        let newProduct=await Product.create(validateData)
       

        res.status(200).json(newProduct)
        
    } catch (error) {
        next(error)
        
    }
    

}
// get product by Id
export const getProduct=async(req,res,next)=>{
    try {
    const productId=req.params.id
    const getId=await Product.findById({_id:+productId})
    res.status(200).json(getId)
        
    } catch (error) {
        next(error)
        
    }
}


//get getAll products
export const getAllProducts=async(req,res,next)=>{
    try {
        const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)
        if(req.query.name){
            fillterobject.name={$regex:req.query.name,$options:'i'}
        }
        if(req.query.description){
            fillterobject.description={$regex:req.query.description,$options:'i'}
        }
        if(req.query.category){
            fillterobject.category=req.query.category
        }
        if(req.query.subcategory){
            fillterobject.subcategory=req.query.subcategory
        }
        if(req.query.trademark){
            fillterobject.trademark=req.query.trademark
        }
        if (req.query.fromDate && req.query.toDate) {
            let fromDate = new Date(req.query.fromDate);
            let toDate = new Date(req.query.toDate);
            if (fromDate && toDate) {
              fillterobject.createdAt = { $gte: (fromDate), $lte: (toDate) };
            }
          }
        const totalCount= await Product.count(fillterobject)
        const pageCount=Math.ceil(totalCount/limit)
        let user=[{$match:fillterobject},
            {$sort: sortObjects},
            {$skip:skip},
            {$limit:limit}]
            if( req.user?.type){
                user.push({$lookup:{
                    from:"favorites",
                    localField:"_id",
                    foreignField:"productId",
                    as:"favoritesFlied",
                    pipeline: [
                        {$match:{userFavorite:+req.user.id}}
                    ]
                
                }},{$addFields:{favoritesFlied:{ $anyElementTrue: [ "$favoritesFlied" ] }}})
            }
          
        const products=await Product.aggregate(user)
        res.status(200).json(new APIresponse(products,page,limit,pageCount,totalCount,req))
    } catch (error) {
        next(error)
    }

}


// update product

export const updateProducts=async(req,res,next)=>{
    try {
       
        const validateData=  checkValidationExist(req)
        const productId=req.params.id
        Product.setDefaultLanguage(req.lng)
        const newProduct =await Product.findOneAndUpdate({ _id: +productId }, [{ $set: validateData }],{new:true})

        res.status(200).json(newProduct)
    } catch (error) {
        next(error)
    }
}



//delete product


export const deleteProduct=async(req,res,next)=>{
    try {
        const productId=req.params.id

        await Product.findByIdAndDelete(productId)

        res.status(200).json("product is deleted")
    } catch (error) {
        next(error)
        
    }

}