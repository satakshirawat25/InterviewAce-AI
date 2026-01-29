import jwt from 'jsonwebtoken'
import { User } from '../models/User.js'

//middleware to protect routes

export const protect = async(req,res)=>{
    try{
        let token = req.headers.authorization

        if(token&& token.startsWith("Bearer")){
            token = token.split(" ")[1] //etract token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
        }else{
            res.status(401).json({
            message:"Token authorized , no token",
          e
        })
        }
    }catch(error){
        res.status(401).json({
            message:"Token failed",
            error:error.message
        })
    }
}

