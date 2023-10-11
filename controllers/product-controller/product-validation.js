import { body } from "express-validator";
import categorymodel from "../../models/category.models/category.models";
import trademarkmodel from "../../models/trademark.model/trademark.models";




export const validateProductCreation=[
    body('name').notEmpty().bail().customSanitizer(value=>{
      return JSON.parse(value)
    }),
    body("name.ar").notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })),
    body("name.en").notEmpty().withMessage("enter your product Name"),
    body("description").notEmpty().withMessage("enter Product description"),
    body("category").notEmpty().custom(async (value,{req})=>{
        return await categorymodel.checkExist({ _id: value, parent: { $exists: false } },"cat not found",)
    }),
    body("subcategory").notEmpty().custom(async (value,{req})=>{
        return await categorymodel.checkExist({ _id: value, parent: req.body.category },"subcat not found")
    }),
    body('trademark').notEmpty().custom(async (value, { req }) => {
        return await trademarkmodel.checkExist({ _id: value, category: req.body.category } ,"trade not found");
    }),
   
    body("price").notEmpty().withMessage("enter Your price"),
    body("quality").notEmpty().withMessage("enter Product Quality"),
    body("offer").optional().notEmpty().withMessage("Enter your Offer"),
    body("offerStartDate").if(body("offer").exists()).notEmpty()
    .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss'),
    body("offerEndDate").if(body("offer").exists()).notEmpty().isISO8601('yyyy-mm-dd')
    .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss'),
]

export const validateProductUpdate=[
    body('name').optional().notEmpty().bail().customSanitizer(value=>{
        return JSON.parse(value)
      }),
      body("name.ar").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })),
      body("name.en").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "name" })),
      body("description").optional().notEmpty().withMessage((_,{req})=>req.t('notEmpty', { controller: "description" })),
      body("category").optional().notEmpty().custom(async (value,{req})=>{
          return await categorymodel.checkExist({ _id: value, parent: { $exists: false } },"cat not found",)
      }),
      body("subcategory").optional().notEmpty().custom(async (value,{req})=>{
          return await categorymodel.checkExist({ _id: value, parent: req.body.category },"subcat not found")
      }),
      body('trademark').optional().notEmpty().custom(async (value, { req }) => {
          return await trademarkmodel.checkExist({ _id: value, trademark: req.body.trademark } ,"trade not found");
      }),
     
      body("price").optional().notEmpty().withMessage("enter Your price"),
      body("quality").optional().notEmpty().withMessage("enter Product Quality"),
      body("offer").optional().notEmpty().withMessage("Enter your Offer"),
      body("offerStartDate").if(body("offer").exists()).notEmpty()
      .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss'),
      body("offerEndDate").if(body("offer").exists()).notEmpty().isISO8601('yyyy-mm-dd')
      .withMessage('start must be in correct format yyyy:mm:dd hh:mm:ss'),

]