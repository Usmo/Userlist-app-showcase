import { validationResult } from "express-validator";
import { v4 } from "uuid";

import HttpError from "./http-error.js";

/*
Normally there would be separate database (PosttgreSQL for example) to connect to.
This controller has the userdata saved in DUMMY_USERS variable for now. 
*/

let DUMMY_USERS = [
  {
    userId: "user1",
    fname: "Panu",
    lname: "Pertsa",
    age: "33",
  },
  {
    userId: "user2",
    fname: "Reiska",
    lname: "Kauppine",
    age: "33",
  },
];

// Get all users from DUMMY_USERS
const getUsers = async (req, res, next) => {
  res.status(200).json({ users: DUMMY_USERS });
};

// Find a user with given userId
const getUser = async (req, res, next) => {
  const userId = req.params.uid;
  const fetchedUser = DUMMY_USERS.find((u) => {
    return u.userId === userId;
  });

  console.log(userId);
  if (!fetchedUser || !fetchedUser.userId) {
    return next(new HttpError("No user with provided id", 404));
  }
  res.status(200).json({ user: fetchedUser });
};

// Create and add new user with received data to DUMMY_USERS
const addUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return next(
      new HttpError("Invalid values given, please check the data", 422)
    );
  }

  const { fname, lname, age } = req.body;

  const newUser = {
    userId: v4(),
    fname,
    lname,
    age,
  };

  if (DUMMY_USERS.length < 8) {
    DUMMY_USERS.push(newUser);
  } else {
    return next(
      new HttpError(
        "Maximum user amount reached, delete existing users to add new ones",
        403
      )
    );
  }
  res.status(201).json({ user: newUser });
  res.body = { message: "User added" };
};

// Find user with given id and update its data
const editUser = async (req, res, next) => {
  const userId = req.params.uid;
  const { fname, lname, age } = req.body;

  const userIndex = DUMMY_USERS.findIndex((u) => u.userId === userId);
  if (userIndex === -1) {
    return next(new HttpError("No user with provided id", 404));
  }

  const updatedUser = DUMMY_USERS.find((u) => u.userId === userId);

  updatedUser.fname = fname;
  updatedUser.lname = lname;
  updatedUser.age = age;

  DUMMY_USERS[userIndex] = updatedUser;

  res.status(200).json({ user: updatedUser });
};

// Find user with given id and delete it from DUMMY_USERS
const deleteUser = async (req, res, next) => {
  const userId = req.params.uid;

  DUMMY_USERS = DUMMY_USERS.filter((u) => u.userId !== userId);

  res.status(200).json({ message: "Deleted the user" });
};

export { getUsers, getUser, addUser, editUser, deleteUser };
