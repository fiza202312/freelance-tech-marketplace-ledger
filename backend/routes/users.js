const express = require("express");
const router = express.Router();

const db = require("../db");

// GET all users
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM Users
    `;

    db.query(sql, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: results.length,
            data: results
        });

    });

});

module.exports = router;