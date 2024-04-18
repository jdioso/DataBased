const express = require("express");
const db = require("../models");

const router = express.Router();

router.post("/register", async (req, res) => {
   const { email, password, firstName, lastName } = req.body;
   if (!email || !password || !firstName || !lastName) {
      return res
         .status(400)
         .json({ error: "All fields are required to register a user." });
   }

   // Extract domain from email, including '@'
   const domainIndex = email.indexOf("@");
   if (domainIndex === -1) {
      // Check if '@' is present
      return res.status(400).json({ error: "Invalid email address." });
   }
   const domain = email.substring(domainIndex); // Get everything from '@' onward

   try {
      const existingUser = await db.users.findOne({ where: { email } });
      if (existingUser) {
         return res
            .status(409)
            .json({ error: "A user with this email already exists." });
      }

      // Check if the domain corresponds to a registered university
      const university = await db.university.findOne({ where: { domain } });
      let universityID = null;
      if (university) {
         universityID = university.universityID;
      }

      const newUser = await db.users.create({
         email,
         password,
         firstName,
         lastName,
         universityID: universityID, // This will be null if no matching university is found
      });

      res.status(201).json({
         message: "User registered successfully.",
         userID: newUser.userID,
         universityID: universityID ? universityID : "No associated university",
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: "Failed to register user due to internal server error.",
      });
   }
});

router.post("/login", async (req, res) => {
   try {
      const user = await db.users.findOne({ where: { email: req.body.email } });
      if (!user) {
         return res.status(401).json({
            error: "Authentication failed. No user found with that email.",
         });
      }

      // Compare the plain text password directly
      const isMatch = req.body.password === user.password;
      if (!isMatch) {
         return res
            .status(401)
            .json({ error: "Authentication failed. Incorrect password." });
      }

      res.status(200).json({
         message: "User logged in successfully.",
         userID: user.userID,
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: "Login process failed due to internal server error.",
      });
   }
});

router.get("/user/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const user = await db.users.findByPk(id, {
         attributes: ["userID", "email"],
      });
      if (user) {
         res.status(200).json(user);
      } else {
         res.status(404).json({ error: "User not found." });
      }
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: "Error fetching user data from the database.",
      });
   }
});

router.get("/searchByEmail/:email", async (req, res) => {
   const { email } = req.params;
   try {
      const user = await db.users.findOne(
         { where: { email } },
         {
            attributes: ["userID", "email"],
         }
      );
      if (user) {
         res.status(200).json(user);
      } else {
         res.status(404).json({ error: "User not found." });
      }
   } catch (err) {
      console.error(err);
      res.status(500).json({
         error: "Error fetching user data from the database.",
      });
   }
});

module.exports = router;
