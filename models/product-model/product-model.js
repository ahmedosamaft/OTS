import mongoose ,{ model as _model } from "mongoose";
import mongooseIntl from 'mongoose-intl';
import { autoIncrement } from "mongoose-plugin-autoinc";
import autopopulate from "mongoose-autopopulate"
import existPlugin from '../../plugins/Existplugin';
import config from "../../config"
const productSchema= new mongoose.Schema({
    name:{type:String,intl:true },
    description:{ type:String ,intl:true},
    category :{
        type:Number,
        ref: "categorymodel",
           autopopulate: true


    },
    _id:Number,
    subcategory:{
        type:Number,
        ref:"categorymodel",
        autopopulate: true

    },
    trademark:{
        type:Number,
        ref:"trademarkmodel",
        autopopulate: true


    },
    slider:[
        {type:String}
    ],
    price:Number,
    quality:Number,
    offer :{
        type:Number,
        default:0
    },
    offerStartDate:{
        type:Date,

    },
    offerEndDate:{
        type:Date,

    }
},{versionKey:false ,toJSON :{
    virtuals:true,
    transform: function(doc,ret){
        ret.id=ret._id
        delete ret._id
        return ret
    }
},timestamps:true}

)

productSchema.plugin(autoIncrement,{
    model:"product",
    startAt:1
})
productSchema.plugin(existPlugin);
productSchema.plugin(mongooseIntl,{languages:config.languages,defaultLanguage:config.defaultLanguage})
productSchema.plugin(autopopulate);

const Product =_model("productmodel",productSchema)
Product.aggregate([
    {
        $lookup:{
            from:"favorites",
            localField:"favorite",
            foreignField:"productId",
            as:"favoritesFlied"
        }
    }
])
export default Product

