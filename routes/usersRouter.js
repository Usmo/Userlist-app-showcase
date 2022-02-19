import Router from "express";
import {
  getUsers,
  addUser,
  deleteUser,
  editUser,
  getUser,
} from "../usersController.js";
import { check } from "express-validator";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:uid", getUser);

usersRouter.post(
  "/",
  [
    check("fname").notEmpty(),
    check("lname").notEmpty(),
    check("age").notEmpty(),
  ],
  addUser
);

usersRouter.patch(
  "/:uid",
  [
    check("fname").notEmpty(),
    check("lname").notEmpty(),
    check("age").notEmpty(),
  ],
  editUser
);

usersRouter.delete("/:uid", deleteUser);

export default usersRouter;
