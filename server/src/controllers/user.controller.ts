import express, { Router } from "express";
import UserService from "../services/user.service";
import validateNewUser from "../middlewares/validateNewUser";

const userController = express.Router()
const userService = new UserService()


//GET => get toàn bộ users & sort theo id
userController.get('/', userService.getAllUser)

//GET => get toàn bộ users có phân trang
userController.get('/pagi', userService.getAllUserAndPagi)

//POST => thêm mới user
userController.post('/', validateNewUser, userService.createUser)

//GET => get detail của 1 user
userController.get('/detail/:id', userService.getDetailUser)

//PATCH => cập nhật user
userController.patch('/update/:id', validateNewUser, userService.updateUser)

//DELETE => xoá user
userController.delete('/delete/:id', userService.deleteUser)

export default userController 