import { genSaltSync, hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";

import config from "../config"






export const Authplugin=(schema)=>{
    schema.method( "accessToken",function(){
    return sign({id:this._id},config.JWT_SEC ,{expiresIn:"3000s"})
    }),
    schema.method("hashPassword", function(){
       const salt = genSaltSync()
       const hashpassword= hashSync(this.password,salt)

      return hashpassword
    })
    schema.pre("save",function(next){
        if(this.isModified("password")){
            this.password=this.hashPassword()
        }
        next()

    })
    

}