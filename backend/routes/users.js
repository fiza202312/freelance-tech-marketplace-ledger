const express = require("express");
const router = express.Router();

const db = require("../db");


// ======================================
// GET ALL USERS
// ======================================
router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM Users ORDER BY User_ID",
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.json({
                success: true,
                data: results
            });

        }
    );

});


// ======================================
// GET SINGLE USER
// ======================================
router.get("/:id", (req, res) => {

    db.query(
        "SELECT * FROM Users WHERE User_ID = ?",
        [req.params.id],
        (err, results) => {

            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            res.json({
                success: true,
                data: results[0]
            });

        }
    );

});


// ======================================
// CREATE USER
// ======================================
router.post("/", (req, res) => {

    const {
        User_Name,
        User_Role,
        Skill_Rating
    } = req.body;

    db.query(

        `INSERT INTO Users
        (User_Name, User_Role, Skill_Rating)
        VALUES (?, ?, ?)`,

        [
            User_Name,
            User_Role,
            Skill_Rating
        ],

        (err, result) => {

            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            res.json({
                success: true,
                message: "User added successfully."
            });

        }

    );

});


// ======================================
// UPDATE USER
// ======================================
router.put("/:id", (req, res) => {

    const {
        User_Name,
        User_Role,
        Skill_Rating
    } = req.body;

    db.query(

        `UPDATE Users
        SET
            User_Name=?,
            User_Role=?,
            Skill_Rating=?
        WHERE User_ID=?`,

        [
            User_Name,
            User_Role,
            Skill_Rating,
            req.params.id
        ],

        (err) => {

            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            res.json({
                success: true,
                message: "User updated successfully."
            });

        }

    );

});


// ======================================
// DELETE USER
// ======================================
router.delete("/:id", (req, res) => {

    db.query(

        "DELETE FROM Users WHERE User_ID=?",

        [req.params.id],

        (err) => {

            if (err)
                return res.status(500).json({
                    success: false,
                    message: err.message
                });

            res.json({
                success: true,
                message: "User deleted successfully."
            });

        }

    );

});

module.exports = router;