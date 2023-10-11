import passport from 'passport';
import { Strategy as JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

import User from '../models/user.model/user-model';
import config from '../config';
import APIError from '../helpers/API-error';

const opts={
    secretOrKey:config.JWT_SEC,
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()

}

passport.use(new JwtStrategy(opts ,(payload,done)=>{
    User.findById(payload.id).then(user =>{
        console.log(user)
        if(user){
            return done(null ,user)
        }else{
            return  APIError(422,"user not found")

        }
    }).catch(
        err => console.error("user not found")
    )
}))

const authenticatetoken = passport.authenticate('jwt', { session: false, failWithError: true})



export const verifyToken=(roles=[],{optional=true}={})=>{
    const auth = [
        authenticatetoken, (req,res,next)=>{ 
            try { 
                if(roles.length > 0){
                    if(!roles.includes(req.user.type)){
                        throw new APIError(403,"NOt Allowed to Asses")
                    }
                }
                next()
            } catch (error) {
                next(error)
                
            }
        }
        
    ]
    if(optional){
        auth.push((err,req,res,next)=>{ 
           delete req.user
           next()
        })
    }
    return auth
    

}
