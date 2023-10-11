



import { verifyToken } from "../../auth/auth";
import { Router } from "express";
import { deleteUser, findUser, getAllusers, getAllusersFiltter, Login, register, Register, updateUserProfile } from "../../controllers/user.controller/user-methods";
import { validateLogin, validateRegister, validateUpdate } from "../../controllers/user.controller/user-validation";



const userRouter=Router()


userRouter.post("/login",validateLogin,Login)
userRouter.post("/register",validateRegister,Register)

userRouter.put("/updateProfile",verifyToken(["user"],{optional:false}),validateUpdate,updateUserProfile)


userRouter.get("/getAllusersFillter",verifyToken(["user"],{optional:false}),getAllusersFiltter)
//find user by id
userRouter.get("/find/:id",verifyToken("admin"),findUser)
// delete user by id
userRouter.delete("/delete/:id",deleteUser)


export default userRouter
 