// ======================================
// SAMPLE DATA
// Replace this with API calls later
// ======================================

const users = [
    {
        id: 1,
        name: "Alice Johnson",
        role: "Freelancer",
        rating: 4.9
    },
    {
        id: 2,
        name: "Bob Smith",
        role: "Client",
        rating: 0.0
    },
    {
        id: 3,
        name: "Charlie Brown",
        role: "Freelancer",
        rating: 4.7
    },
    {
        id: 4,
        name: "David Wilson",
        role: "Client",
        rating: 0.0
    },
    {
        id: 5,
        name: "Emma Davis",
        role: "Freelancer",
        rating: 4.8
    },
    {
        id: 6,
        name: "Frank Thomas",
        role: "Freelancer",
        rating: 4.3
    }
];

const projects = [
    {
        id: 1,
        title: "E-Commerce Website",
        budget: 50000,
        status: "Active"
    },
    {
        id: 2,
        title: "Portfolio Website",
        budget: 15000,
        status: "Completed"
    },
    {
        id: 3,
        title: "Inventory Management System",
        budget: 75000,
        status: "Active"
    },
    {
        id: 4,
        title: "Restaurant Ordering App",
        budget: 60000,
        status: "Pending"
    }
];

// ======================================
// REGISTERED USERS
// ======================================

function renderUsers() {

    const table = document.getElementById("usersTable");

    table.innerHTML = "";

    users.forEach(user => {

        table.innerHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.role}</td>
                <td>${user.rating.toFixed(1)}</td>
            </tr>
        `;

    });

}

// ======================================
// HIGH RATED FREELANCERS
// ======================================

function renderFreelancers() {

    const table = document.getElementById("freelancersTable");

    table.innerHTML = "";

    users
        .filter(user => user.role === "Freelancer" && user.rating >= 4.5)
        .forEach(user => {

            table.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.rating.toFixed(1)}</td>
                </tr>
            `;

        });

}

// ======================================
// ACTIVE PROJECTS
// ======================================

function renderProjects() {

    const table = document.getElementById("projectsTable");

    table.innerHTML = "";

    projects
        .filter(project => project.status === "Active")
        .forEach(project => {

            table.innerHTML += `
                <tr>
                    <td>${project.id}</td>
                    <td>${project.title}</td>
                    <td>₹${project.budget.toLocaleString("en-IN")}</td>
                </tr>
            `;

        });

}

// ======================================
// TOTAL CONTRACT BUDGET
// ======================================

function renderBudget() {

    const total = projects.reduce((sum, project) => {

        return sum + project.budget;

    }, 0);

    document.getElementById("totalBudget").textContent =
        "₹" + total.toLocaleString("en-IN");

}

// ======================================
// LOAD PAGE
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    renderUsers();
    renderFreelancers();
    renderProjects();
    renderBudget();

});