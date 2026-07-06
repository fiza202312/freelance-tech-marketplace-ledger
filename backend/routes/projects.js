const express = require("express");
const router = express.Router();

const db = require("../db");

// GET Active Projects
router.get("/", (req, res) => {

    const sql = `
        SELECT
            Gigs.Gig_ID,
            Gigs.Project_Title,
            Gigs.Budget_Amount
        FROM Gigs
        INNER JOIN Contracts
            ON Gigs.Gig_ID = Contracts.Gig_ID
        WHERE Contracts.Contract_Status = 'Active';
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