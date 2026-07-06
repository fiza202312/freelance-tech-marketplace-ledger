const API_BASE_URL = "http://localhost:3000";

// ===============================
// Fetch All Users
// ===============================
async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const result = await response.json();

        renderUsers(result.data);

    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

// ===============================
// Fetch High Rated Freelancers
// ===============================
async function fetchFreelancers() {
    try {
        const response = await fetch(`${API_BASE_URL}/freelancers`);
        const result = await response.json();

        renderFreelancers(result.data);

    } catch (error) {
        console.error("Error fetching freelancers:", error);
    }
}

// ===============================
// Fetch Active Projects
// ===============================
async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const result = await response.json();

        renderProjects(result.data);

    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

// ===============================
// Fetch Budget
// ===============================
async function fetchBudget() {
    try {
        const response = await fetch(`${API_BASE_URL}/budget`);
        const result = await response.json();

        renderBudget(result.data);

    } catch (error) {
        console.error("Error fetching budget:", error);
    }
}

// ===============================
// Render Users
// ===============================
function renderUsers(users) {

    const table = document.getElementById("usersTable");

    table.innerHTML = "";

    users.forEach(user => {

        table.innerHTML += `
            <tr>
                <td>${user.User_ID}</td>
                <td>${user.User_Name}</td>
                <td>${user.User_Role}</td>
                <td>${user.Skill_Rating}</td>
            </tr>
        `;

    });

}

// ===============================
// Render Freelancers
// ===============================
function renderFreelancers(freelancers) {

    const table = document.getElementById("freelancersTable");

    table.innerHTML = "";

    freelancers.forEach(user => {

        table.innerHTML += `
            <tr>
                <td>${user.User_ID}</td>
                <td>${user.User_Name}</td>
                <td>${user.Skill_Rating}</td>
            </tr>
        `;

    });

}

// ===============================
// Render Projects
// ===============================
function renderProjects(projects) {

    const table = document.getElementById("projectsTable");

    table.innerHTML = "";

    projects.forEach(project => {

        table.innerHTML += `
            <tr>
                <td>${project.Gig_ID}</td>
                <td>${project.Project_Title}</td>
                <td>₹${Number(project.Budget_Amount).toLocaleString("en-IN")}</td>
            </tr>
        `;

    });

}

// ===============================
// Render Budget
// ===============================
function renderBudget(budget) {

    document.getElementById("totalBudget").textContent =
        "₹" + Number(budget.Total_Contract_Budget).toLocaleString("en-IN");

}

// ===============================
// Load Everything
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    fetchUsers();
    fetchFreelancers();
    fetchProjects();
    fetchBudget();

});