const express = require("express");
const router = express.Router();

const db = require("../db");

// ==========================================
// GET ALL CONTRACTS
// ==========================================
router.get("/", (req, res) => {

    const sql = `
        SELECT *
        FROM Contracts
        ORDER BY Contract_ID ASC
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

// ==========================================
// GET SINGLE CONTRACT
// ==========================================
router.get("/:id", (req, res) => {

    const sql = `
        SELECT *
        FROM Contracts
        WHERE Contract_ID = ?
    `;

    db.query(sql, [req.params.id], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Contract not found"
            });
        }

        res.status(200).json({
            success: true,
            data: results[0]
        });

    });

});

// ==========================================
// CREATE CONTRACT
// ==========================================
router.post("/", (req, res) => {

    const {
        Gig_ID,
        Freelancer_ID,
        Contract_Status
    } = req.body;

    const sql = `
        INSERT INTO Contracts
        (
            Gig_ID,
            Freelancer_ID,
            Contract_Status
        )
        VALUES
        (?, ?, ?)
    `;

    db.query(
        sql,
        [
            Gig_ID,
            Freelancer_ID,
            Contract_Status
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Contract created successfully",
                id: result.insertId
            });

        }
    );

});

// ==========================================
// UPDATE CONTRACT
// ==========================================
router.put("/:id", (req, res) => {

    const {
        Gig_ID,
        Freelancer_ID,
        Contract_Status
    } = req.body;

    const sql = `
        UPDATE Contracts
        SET
            Gig_ID = ?,
            Freelancer_ID = ?,
            Contract_Status = ?
        WHERE Contract_ID = ?
    `;

    db.query(
        sql,
        [
            Gig_ID,
            Freelancer_ID,
            Contract_Status,
            req.params.id
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Contract updated successfully"
            });

        }
    );

});

// ==========================================
// DELETE CONTRACT
// ==========================================
router.delete("/:id", (req, res) => {

    const sql = `
        DELETE
        FROM Contracts
        WHERE Contract_ID = ?
    `;

    db.query(sql, [req.params.id], (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Contract deleted successfully"
        });

    });

});

module.exports = router;