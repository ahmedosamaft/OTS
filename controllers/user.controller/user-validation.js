import {body} from "express-validator"



import User from "../../models/user.model/user-model"

export const validateLogin=[
    
    body("phoneNumber").notEmpty().withMessage("enter Your phoneNumber"),
    body("password").notEmpty().withMessage("Enter Your password ").isLength({min:8}).withMessage("password length should be 8").matches(/([A-Z])/)
    .withMessage("Enter capital Character").matches(/[a-z]/).withMessage("Should contain Small Character")
]

export const validateRegister=[
    body("username").notEmpty().withMessage("enter your username"),
    body("email").notEmpty().withMessage("enter Your email").isEmail().custom(async(value,{req})=>{
        return await User.validateExist({ email: value},req.t('already exists', { controller: "email" }))
    }),
    body("phoneNumber").notEmpty().withMessage("enter Your phoneNumber").custom(async(value,{req})=>{
        return await User.validateExist({phoneNumber: value},req.t('already exists', { controller: "phoneNumber" }))
    }),
    body("password").notEmpty().withMessage("Enter Your password ").isLength({min:8}).withMessage("password length should be 8").matches(/([A-Z])/)
    .withMessage("Enter capital Character").matches(/[a-z]/).withMessage("Should contain Small Character")

]

export const validateUpdate=[
    body("username").optional().notEmpty().withMessage("enter your new username"),
    body("email").optional().notEmpty().withMessage("enter your new Email").isEmail().custom(async(value,{req})=>{
        return await User.validateExist({ email: value, _id: { $ne: req.user._id }},req.t('already exists', { controller: "email" }))
    }),
    body("phoneNumber").optional().notEmpty().withMessage("enter your new phoneNumber").custom(async(value,{req})=>{
        return await User.validateExist({phoneNumber: value, _id: { $ne: req.user._id }},req.t('already exists', { controller: "phoneNumber" }))
    }),
    body("password").optional().notEmpty().withMessage("Enter Your password ").isLength({min:8}).withMessage("password length should be 8").matches(/([A-Z])/)
    .withMessage("Enter capital Character").matches(/[a-z]/).withMessage("Should contain Small Character")
]
