import mongoose, { Schema } from "mongoose";
import mongooseIntl from 'mongoose-intl';
import { autoIncrement } from "mongoose-plugin-autoinc";
import autopopulate from "mongoose-autopopulate"
import config from '../../config'
import existPlugin from "../../plugins/Existplugin";
const favoriteSchema=mongoose.Schema({
    _id:Number,
    userFavorite:{
        type:Number,
        ref:"user",
        autopopulate:true
    },
    productId:{
        type:Number,
        ref:"productmodel",
        autopopulate:true
    },
},{
    versionKey:false, 
    toJSON:{
        transform: function (doc,ret){
            ret.id=ret._id,
            delete ret._id
            return ret

    }},
     timestamps: true ,
})

favoriteSchema.plugin(autoIncrement,{
    model:"favorites",
    startAt:1
})
favoriteSchema.plugin(existPlugin);
favoriteSchema.plugin(mongooseIntl,{languages:config.languages,defaultLanguage:config.defaultLanguage})
favoriteSchema.plugin(autopopulate);

const Favorites=mongoose.model("favorites",favoriteSchema)

export default Favorites