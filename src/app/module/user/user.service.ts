import config from "../../config/config";
import trhowErrorHandller from "../../utills/trhowErrorHandller";
import { Userinterface } from "./user.interface";
import User from "./user.model";
import jwt from 'jsonwebtoken'

const createUserDB = async (payload: Userinterface) => {
    const isUserexist = await User.findOne({ email: payload.email })

    if (isUserexist) {
        trhowErrorHandller('User already found')
    }
    const result = await User.create(payload)
    return result

}


const LogInUserDB = async (payload: Userinterface) => {


    const users = await User.findOne({ email: payload.email })

    if (!users || !users?.password) {
        trhowErrorHandller('User not found')
    }


    const passwordMatcher = await User.isPasswordmatch(payload.password, users?.password)

    if (!passwordMatcher) {
        trhowErrorHandller('password not match')
    }

const tokenplayload = {
    id:users?._id,
    role:users?.role
}

const accessToken = jwt.sign(tokenplayload,config.JWT_sec_Token as string,{expiresIn:'365D'})


return {
    accessToken
}

}


export const Userservices = {
    createUserDB,
    LogInUserDB
}