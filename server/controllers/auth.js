import mongoose from "mongoose"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

//Register User
export const register = async (req, res) => {
    try {
        const {username, password} = req.body

        const isUsed = await User.findOne({username})

        if (isUsed) {
           return res.json({
                 message: "Username already has been taken."
           })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash,
        })

          const token = jwt.sign(
                {
                    id : newUser._id,
                },

                process.env.JWT_SECRET,

                {expiresIn: "30d"}
       )

        await newUser.save()

        res.json({
            newUser, 
            token,
            message: "The user has been successfully registered."
        })
    } catch (error) {
        res.json({
            message: "Error creating user."
        })
    }
}

//Login User

export const login = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({username})
        if(!user){
            return res.json({
                message: "Incorrect user credentials."
            })
        }
            const isPasswordCorrect = await bcrypt.compare(password, user.password)

            if(!isPasswordCorrect){
                return res.json({
                    message: "Incorrect password."
                })
            }

            const token = jwt.sign(
                {
                    id : user._id
                },

                process.env.JWT_SECRET,

                {expiresIn: "30d"}
       )

       res.json({
        token,
        user, 
        message: "You are logged in."
       })

          
    } catch (error) {
        res.json({
            message: "Authorization error"
        })
    }
}

//Get Me

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId)

        if(!user){
            return res.json({
                message: "User does not exists"
            })
        }

        const token = jwt.sign(
            {
                id : user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "30d"
            }
        )

        res.json({
            token,
            user,
        })
    } catch (error) {
        return res.json({
            message: "No access rights."
        })
    }
}