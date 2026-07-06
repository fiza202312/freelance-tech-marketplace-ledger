const express = require("express");
const cors = require("cors");

// Database Connection
const db = require("./db");

// Import Routes
const usersRoute = require("./routes/users");
const freelancersRoute = require("./routes/freelancers");
const projectsRoute = require("./routes/projects");
const budgetRoute = require("./routes/budget");

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("Freelance Tech Marketplace Ledger API is Running...");
});

// API Routes
app.use("/users", usersRoute);
app.use("/freelancers", freelancersRoute);
app.use("/projects", projectsRoute);
// app.use("/budget", budgetRoute);

// Server Port
const PORT = 3000;

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});