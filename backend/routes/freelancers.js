const express = require("express");
const router = express.Router();

const db = require("../db");

// GET High Rated Freelancers
router.get("/", (req, res) => {

    const sql = `
        SELECT
            User_ID,
            User_Name,
            Skill_Rating
        FROM Users
        WHERE User_Role = 'Freelancer'
        AND Skill_Rating >= 4.5
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