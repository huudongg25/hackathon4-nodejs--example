import { Express } from "express"
import userController from "./user.controller"

const controller = (app:Express) => {
    app.use('/user',userController)
}

export default controller