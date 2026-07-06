const express = require("express");
const router = express.Router();

const db = require("../db");

// GET Total Contract Budget
router.get("/", (req, res) => {

    const sql = `
        SELECT
            SUM(Gigs.Budget_Amount) AS Total_Contract_Budget
        FROM Gigs
        INNER JOIN Contracts
            ON Gigs.Gig_ID = Contracts.Gig_ID;
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
            data: results[0]
        });

    });

});

module.exports = router;