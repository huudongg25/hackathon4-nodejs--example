import { Request, Response } from "express";
import readFileCommon from "../common/readFile";
import path from "path";
import writeFileCommon from "../common/writeFile";

class UserService {

    public getAllUser(req: Request, res: Response) {
        try {
            const users = readFileCommon(path.join('public/db.json'))
            if (req.query.sort) {
                if (req.query.sort == 'ASC') {
                    users.sort((item1: any, item2: any) => item1.id - item2.id)
                    res.json(users)
                } else if (req.query.sort == 'DESC') {
                    users.sort((item1: any, item2: any) => item2.id - item1.id)
                    res.json(users)
                } else {
                    res.status(200).json(users)
                }
            } else {
                res.status(200).json(users)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    public getAllUserAndPagi(req: Request, res: Response) {
        try {
            const users = readFileCommon(path.join('public/db.json'))
            const limit = 4
            const page = Number(req.query.page)
            const offset = (page - 1) * limit
            if (req.query.sort) {
                if (req.query.sort == 'ASC') {
                    users.sort((item1: any, item2: any) => item1.id - item2.id)
                    const result = users.splice(offset, limit)
                    res.json(result)
                } else if (req.query.sort == 'DESC') {
                    users.sort((item1: any, item2: any) => item2.id - item1.id)
                    const result = users.splice(offset, limit)
                    res.json(result)
                } else {
                    const result = users.splice(offset, limit)
                    res.status(200).json(result)
                }
            }else {
                const result = users.splice(offset, limit)
                res.json(result)
            }
        } catch (error) {

        }
    }

    public createUser(req: Request, res: Response) {
        try {
            const users = readFileCommon(path.join('public/db.json'))
            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                name: req.body.name,
                desc: req.body.desc,
                age: Number(req.body.age),
                class: req.body.class
            }
            users.push(newUser)
            writeFileCommon(path.join('public/db.json'), users)
            res.status(201).json("Đã thêm thành công")

        } catch (error) {
            res.status(400).json("có lỗi")
        }
    }

    public updateUser(req: Request, res: Response) {
        try {
            const users = readFileCommon(path.join('public/db.json'))
            const id = req.params.id
            const newUser = {
                name: req.body.name,
                desc: req.body.desc,
                age: Number(req.body.age),
                class: req.body.class
            }
            const newData = users.map((item: any) => {
                if (item.id == id) {
                    return {
                        ...item,
                        ...newUser
                    }
                } else {
                    return item
                }
            })
            writeFileCommon(path.join('public/db.json'), newData)
            res.status(200).json("Đã sửa thành công")
        } catch (error) {
            res.status(400).json("Có lỗi xảy ra")
        }
    }


    public deleteUser(req: Request, res: Response) {
        try {
            const users = readFileCommon(path.join('public/db.json'))
            const id = req.params.id
            const newData = users.filter((item: any) => item.id !== Number(id))
            writeFileCommon(path.join('public/db.json'), newData)
            res.status(200).json("Đã xoá thành công")
        } catch (error) {
            res.status(400).json("Có lỗi xảy ra")

        }
    }

    public getDetailUser(req: Request, res: Response) {
        try {
            const users = readFileCommon(path.join('public/db.json'))
            const id = req.params.id
            const findUser = users.find((item: any) => item.id == id)
            res.status(200).json(findUser)
        } catch (error) {
            res.status(400).json("Có lỗi xảy ra")
        }
    }
}

export default UserService