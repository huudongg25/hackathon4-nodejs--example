import { NextFunction, Request, Response } from "express";
import readFileCommon from "../common/readFile";
import path from "path";

const validateNewUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = readFileCommon(path.join('public/db.json'))
        const checkExistUser = users.findIndex((item: any) => item.name == req.body.name)
        if (checkExistUser !== -1) {
            return res.status(400).json('user đã tồn tại')
        }

        const keys = Object.keys(req.body)
        for (let i = 0; i < keys.length; i++) {
            if (req.body[keys[i]] == "") {
                return res.status(400).json(`K đc để trống ${keys[i]}`)
            }
        }
        next()
    } catch (error) {
        res.status(400).json(error)
    }
}

export default validateNewUser