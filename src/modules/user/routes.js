import json from "body-parser/lib/types/json.js";
import express from "express";
import { databasePrisma } from "../../prismaClient.js";

export const usersRouter = express.Router();

// POST /users
usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await databasePrisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        salt: "salty",
      },
    });

    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: `${err}` });
  }
});

//  POST /users/login
usersRouter.post("/login", async (req, res) => {});

// GET /users
usersRouter.get("/", async (req, res) => {
  const users = await databasePrisma.user.findMany();
  res.json(users);
});

// GET /users/:id
usersRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await databasePrisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Something went wrong",
    });

    const errorUser = await json.parse(error.message);
    if (errorUser.status) {
      res.status(errorUser.status).json(errorUser.message);
    } else {
      res.status(404).json("Could not find user!");
    }
  }
});

// PUT /users/:id
usersRouter.put("/:id", async (req, res) => {});

// DELETE /users/:id
usersRouter.delete("/:id", async (req, res) => {});
