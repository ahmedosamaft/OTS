
import { matchedData, validationResult } from "express-validator";
import APIError from "../../helpers/API-error";
import { checkquery, checkValidationExist, tobool } from "../../helpers/methods";
import User from "../../models/user.model/user-model";

import {compare,hash,genSalt} from "bcrypt"
import APIresponse from "../../helpers/API-response";
import { sign } from "jsonwebtoken";

import jwt from "jsonwebtoken"
import config from "../../config"
import { roles } from "../../models/user.model/user-role";






export const Register=async (req,res,next)=>{
    try {
        try { checkValidationExist(req,res) }
        catch (error) {
          throw new APIError(422, error);
        }        
        const validateDate= matchedData(req,{locations:["body"]})
        validateDate.type= roles.User
        const newUser=await User.create(validateDate)
        res.status(200).json({user:newUser,token:newUser.accessToken()})
    } catch (error) {
        next(error)
    }
}

export const Login =async(req,res,next)=>{
    try {
        checkValidationExist(req)
                
        const validateData= matchedData(req,{locations:["body"]})

        const validLogin= await User.findOne({phoneNumber:validateData.phoneNumber})
        if(!validLogin){
            throw new APIError(422, "in Valid PhoneNumber");
        }else{
            const matchesPassword= await compare(validateData.password, validLogin.password)
            if(matchesPassword==false){
                throw new APIError(422, "invalid password");

            }else{

                res.status(200).json({user: validLogin, token: validLogin.accessToken()})
            }

        }
        
    } catch (error) {
        next(error)
        
    }

}

//get All users

//users Fillter
export const getAllusersFiltter=async(req,res,next)=>{

    try {
        const {limit,skip,page,all,fillterobject,sortObjects} = checkquery(req)

        if (req.query.username){
            fillterobject.username={$regex:req.query.username ,$options:'i'}
        }
        if (req.query.email){
            fillterobject.email={$regex:req.query.email ,$options:'i'}
        }
        if (req.query.phoneNumber){
            fillterobject.phoneNumber={$regex:req.query.phoneNumber ,$options:'i'}
        }
        const totalcount= await User.count(fillterobject)
         const pagecount=Math.ceil(totalcount / limit)
        const users=await User.find(fillterobject).sort(sortObjects).skip(skip).limit(limit)
         res.status(200).json(new APIresponse(users,page,limit,pagecount,totalcount,req))
       
        
    } catch (error) {
        next(error)
    }

}


//user while complete when Atuh add

//update User Profile
export const updateUserProfile=async(req,res,next)=>{
    try {
        const validateData= matchedData(req,{locations:["body"]})
        checkValidationExist(req)
       
        const userId=req.user.id
        const newUser =await User.findOneAndUpdate({_id:+userId},{$set:validateData},{new:true})

        res.status(200).json(newUser)
        
    } catch (error) {
        next(error)
        
    }

}


//find user by Id
export const findUser=async(req,res,next)=>{
    try {

        const userId=req.params.id
        const finduser= await User.findById(userId)
        if(!finduser) {
            throw new APIError(422,"user not found")
        }
        res.status(200).json(finduser)
        
    } catch (error) {
        next(error)
        
    }
}

// delete user Account

export const deleteUser=async(req,res,next)=>{
    try {
      

    await User.findByIdAndDelete(req.params.id)

    res.status(200).json("user is deleted")

        
    } catch (error) {
        next(error)
        
    }

    
}