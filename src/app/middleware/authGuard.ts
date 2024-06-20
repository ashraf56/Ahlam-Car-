/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { tryCatchWrapper } from "../utills/tryCatchWrapper"
import trhowErrorHandller from "../utills/trhowErrorHandller";
import config from "../config/config";
import jwt, { JwtPayload } from "jsonwebtoken";

const authGuardValidator = () => {
    return tryCatchWrapper(
        async (req: Request, res: Response, next: NextFunction) => {
            const authHeader = req.headers.authorization as string;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                trhowErrorHandller('You have no access to this route ')
            }
            // ensure that token included with Bearer
            const formatedToken = authHeader.startsWith('Bearer') ? authHeader : `Bearer ${authHeader}`
            const finalToken = formatedToken.split(' ')[1]

            if (!finalToken) {
                trhowErrorHandller('You have no access to this route ')
            }
            const decoded = jwt.verify(finalToken, config.JWT_sec_Token as string) as JwtPayload
            const{  id, role}  = decoded

next()
        }


    )


}


export default authGuardValidator