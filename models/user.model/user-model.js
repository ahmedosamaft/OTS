import mongoose ,{ model as _model } from "mongoose";
import { rolesenum } from "./user-role";
import mongooseIntl from "mongoose-intl";
import { autoIncrement } from "mongoose-plugin-autoinc";
import existPlugin from "../../plugins/Existplugin";
import  {Authplugin}  from "../../plugins/Authplugin";
const userSchema=new mongoose.Schema({
    username :{type :String ,required:true,Intl:true},
    email:{type :String ,required:true , unique: true},
    phoneNumber:String,type:
    {
        type :String,
        enum: rolesenum
    },
    password:
    {
        type :String ,required:true
    },
    image: String
},{
    versionKey:false, 
    toJSON:{
        transform: function (doc,ret){
            delete ret.password,
            ret.id=ret._id,
            delete ret._id
            return ret

    }},
     timestamps: true ,
})
userSchema.plugin(autoIncrement,{
    model:"user",
    startAt:1
})
userSchema.plugin(existPlugin)
userSchema.plugin(Authplugin)
userSchema.plugin(mongooseIntl,{ languages: ['en', 'ar'], defaultLanguage: 'en' })


const User=_model("user",userSchema)

export default User