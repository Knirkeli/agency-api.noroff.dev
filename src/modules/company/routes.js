import express from "express";
import { databasePrisma } from "../../prismaClient.js";
import { createCompany } from "./controllers/createCompany.js";
import { findCompanyById } from "./controllers/findCompanyById.js";
import { deleteCompany } from "./controllers/deleteCompany.js";
import { findAllCompanies } from "./controllers/findAllCompanies.js";
import { changeCompany } from "./controllers/changeCompany.js";
import { addAdminToCompany } from "./controllers/addAdmin.js";
import { deleteAdminFromCompany } from "./controllers/deleteAdmin.js";

export const companyRouter = express.Router();

// Endpoint to get all companies in a list

companyRouter.get("/", async (req, res) => {
  findAllCompanies(databasePrisma, req, res);
});

// Endpoint to get a company by id

companyRouter.get("/:id", async (req, res) => {
  findCompanyById(databasePrisma, req, res);
});

// Endpoint to create a company

companyRouter.post("/", async (req, res) => {
  createCompany(databasePrisma, req, res);
});

// Endpoint to update a company

companyRouter.put("/:id", async (req, res) => {
  changeCompany(databasePrisma, req, res);
});

// Endpoint to delete a company

companyRouter.delete("/:id", async (req, res) => {
  deleteCompany(databasePrisma, req, res);
});

// Endpoint to add an admin to a company

companyRouter.put("/admin/:id", async (req, res) => {
  addAdminToCompany(databasePrisma, req, res);
});

// Endpoint to remove an admin from a company

companyRouter.delete("/admin/:id", async (req, res) => {
  deleteAdminFromCompany(databasePrisma, req, res);
});
