// ==============================
// Navigation
// ==============================

const navButtons = document.querySelectorAll(".nav-btn");

const pages = document.querySelectorAll(".page");

navButtons.forEach(button => {

    button.addEventListener("click", () => {

        navButtons.forEach(btn => btn.classList.remove("active"));

        pages.forEach(page => page.classList.remove("active"));

        button.classList.add("active");

        document
            .getElementById(button.dataset.page)
            .classList.add("active");

    });

});
const API_BASE_URL = "http://localhost:3000";

// ======================================
// USERS CRUD VARIABLES
// ======================================

let editingUser = false;

const userForm = document.getElementById("userForm");
const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const userRole = document.getElementById("userRole");
const userRating = document.getElementById("userRating");

const usersCrudTable = document.getElementById("usersCrudTable");

const saveUserBtn = document.getElementById("saveUserBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

// ======================================
// PROJECT CRUD VARIABLES
// ======================================

let editingProject = false;

const gigForm = document.getElementById("gigForm");

const gigId = document.getElementById("gigId");

const clientId = document.getElementById("clientId");

const projectTitle = document.getElementById("projectTitle");

const budgetAmount = document.getElementById("budgetAmount");

const saveGigBtn = document.getElementById("saveGigBtn");

const cancelGigEditBtn = document.getElementById("cancelGigEditBtn");

// ======================================
// CONTRACT CRUD VARIABLES
// ======================================

let editingContract = false;

const contractForm = document.getElementById("contractForm");

const contractId = document.getElementById("contractId");

const contractGigId = document.getElementById("contractGigId");

const freelancerId = document.getElementById("freelancerId");

const contractStatus = document.getElementById("contractStatus");

const saveContractBtn = document.getElementById("saveContractBtn");

const cancelContractEditBtn = document.getElementById("cancelContractEditBtn");

const contractsCrudTable = document.getElementById("contractsCrudTable");

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
// ======================================
// LOAD USERS FOR CRUD PAGE
// ======================================

async function loadUsersCRUD() {

    try {

        const response = await fetch(`${API_BASE_URL}/users`);

        const result = await response.json();

        renderUsersCRUD(result.data);

    }

    catch (error) {

        console.error(error);

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

        const response = await fetch(`${API_BASE_URL}/projects/active`);

        const result = await response.json();

        renderProjects(result.data);

    }

    catch(error){

        console.error(error);

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
// ======================================
// CANCEL CONTRACT EDIT
// ======================================

cancelContractEditBtn.addEventListener("click", () => {

    editingContract = false;

    contractForm.reset();

    contractId.value = "";

    saveContractBtn.textContent = "Add Contract";

    cancelContractEditBtn.style.display = "none";

});
// ======================================
// RENDER USERS CRUD
// ======================================

function renderUsersCRUD(users) {

    usersCrudTable.innerHTML = "";

    users.forEach(user => {

        usersCrudTable.innerHTML += `

        <tr>

            <td>${user.User_ID}</td>

            <td>${user.User_Name}</td>

            <td>${user.User_Role}</td>

            <td>${user.Skill_Rating}</td>

            <td>

                <button onclick="editUser(${user.User_ID})">

                    Edit

                </button>

                <button onclick="deleteUser(${user.User_ID})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ======================================
// EDIT USER
// ======================================

async function editUser(id) {

    try {

        const response = await fetch(`${API_BASE_URL}/users/${id}`);

        const result = await response.json();

        const user = result.data;

        userId.value = user.User_ID;

        userName.value = user.User_Name;

        userRole.value = user.User_Role;

        userRating.value = user.Skill_Rating;

        editingUser = true;

        saveUserBtn.textContent = "Update User";

        cancelEditBtn.style.display = "inline-block";

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================
// CANCEL EDIT
// ======================================

cancelEditBtn.addEventListener("click", () => {

    editingUser = false;

    userForm.reset();

    userId.value = "";

    saveUserBtn.textContent = "Add User";

    cancelEditBtn.style.display = "none";

});

// ======================================
// DELETE USER
// ======================================

async function deleteUser(id) {

    const confirmDelete = confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) return;

    try {

        await fetch(`${API_BASE_URL}/users/${id}`, {

            method: "DELETE"

        });

        loadUsersCRUD();

        fetchUsers();

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================
// ADD / UPDATE USER
// ======================================

userForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const user = {

        User_Name: userName.value,

        User_Role: userRole.value,

        Skill_Rating: userRating.value

    };

    try {

        if (!editingUser) {

            await fetch(`${API_BASE_URL}/users`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            });

        }

        else {

            await fetch(`${API_BASE_URL}/users/${userId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(user)

            });

            editingUser = false;

            saveUserBtn.textContent = "Add User";

            cancelEditBtn.style.display = "none";

        }

        userForm.reset();

        loadUsersCRUD();

        fetchUsers();

    }

    catch (error) {

        console.error(error);

    }

});

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

// ======================================
// LOAD PROJECTS CRUD TABLE
// ======================================

async function loadProjectsCRUD() {

    try {

        const response = await fetch(`${API_BASE_URL}/projects`);

        const result = await response.json();

        const table = document.getElementById("gigsCrudTable");

        table.innerHTML = "";

        result.data.forEach(project => {

            table.innerHTML += `
                <tr>
                    <td>${project.Gig_ID}</td>
                    <td>${project.Client_ID}</td>
                    <td>${project.Project_Title}</td>
                    <td>₹${Number(project.Budget_Amount).toLocaleString("en-IN")}</td>

                    <td>
                       <button onclick="editProject(${project.Gig_ID})">

    Edit

</button>

<button onclick="deleteProject(${project.Gig_ID})">

    Delete

</button>
                    </td>
                </tr>
            `;

        });

    }

    catch(error){

        console.error(error);

    }

}

// ======================================
// LOAD CONTRACTS CRUD TABLE
// ======================================

async function loadContractsCRUD() {

    try {

        const response = await fetch(`${API_BASE_URL}/contracts`);

        const result = await response.json();

        renderContractsCRUD(result.data);

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================
// RENDER CONTRACTS CRUD
// ======================================

function renderContractsCRUD(contracts) {

    contractsCrudTable.innerHTML = "";

    contracts.forEach(contract => {

        contractsCrudTable.innerHTML += `

            <tr>

                <td>${contract.Contract_ID}</td>

                <td>${contract.Gig_ID}</td>

                <td>${contract.Freelancer_ID}</td>

                <td>${contract.Contract_Status}</td>

                <td>

                    <button onclick="editContract(${contract.Contract_ID})">

                        Edit

                    </button>

                    <button onclick="deleteContract(${contract.Contract_ID})">

                        Delete

                    </button>

                </td>

            </tr>

        `;

    });

}

// ======================================
// EDIT CONTRACT
// ======================================

async function editContract(id) {

    try {

        const response = await fetch(`${API_BASE_URL}/contracts/${id}`);

        const result = await response.json();

        const contract = result.data;

        contractId.value = contract.Contract_ID;

        contractGigId.value = contract.Gig_ID;

        freelancerId.value = contract.Freelancer_ID;

        contractStatus.value = contract.Contract_Status;

        editingContract = true;

        saveContractBtn.textContent = "Update Contract";

        cancelContractEditBtn.style.display = "inline-block";

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================
// DELETE CONTRACT
// ======================================

async function deleteContract(id) {

    const confirmDelete = confirm("Are you sure you want to delete this contract?");

    if (!confirmDelete) return;

    try {

        await fetch(`${API_BASE_URL}/contracts/${id}`, {

            method: "DELETE"

        });

        loadContractsCRUD();

        fetchProjects();

        fetchBudget();

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================
// CANCEL CONTRACT EDIT
// ======================================

cancelContractEditBtn.addEventListener("click", () => {

    editingContract = false;

    contractForm.reset();

    contractId.value = "";

    saveContractBtn.textContent = "Add Contract";

    cancelContractEditBtn.style.display = "none";

});

// ======================================
// ADD / UPDATE CONTRACT
// ======================================

contractForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const contract = {

        Gig_ID: contractGigId.value,

        Freelancer_ID: freelancerId.value,

        Contract_Status: contractStatus.value

    };

    try {

        if (!editingContract) {

            await fetch(`${API_BASE_URL}/contracts`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(contract)

            });

        }

        else {

            await fetch(`${API_BASE_URL}/contracts/${contractId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(contract)

            });

            editingContract = false;

            saveContractBtn.textContent = "Add Contract";

            cancelContractEditBtn.style.display = "none";

        }

        contractForm.reset();

        loadContractsCRUD();

        fetchProjects();

        fetchBudget();

    }

    catch (error) {

        console.error(error);

    }

});

// ======================================
// EDIT PROJECT
// ======================================

async function editProject(id) {

    try {

        const response = await fetch(`${API_BASE_URL}/projects/${id}`);

        const result = await response.json();

        const project = result.data;

        document.getElementById("gigId").value = project.Gig_ID;

        document.getElementById("clientId").value = project.Client_ID;

        document.getElementById("projectTitle").value = project.Project_Title;

        document.getElementById("budgetAmount").value = project.Budget_Amount;

        document.getElementById("saveGigBtn").textContent = "Update Gig";

        document.getElementById("cancelGigEditBtn").style.display = "inline-block";

        editingProject = true;

    }

    catch(error){

        console.error(error);

    }

}

// ======================================
// DELETE PROJECT
// ======================================

async function deleteProject(id) {

    const confirmDelete = confirm("Are you sure you want to delete this gig?");

    if (!confirmDelete) return;

    try {

        await fetch(`${API_BASE_URL}/projects/${id}`, {

            method: "DELETE"

        });

        loadProjectsCRUD();

        fetchProjects();

    }

    catch (error) {

        console.error(error);

    }

}

// ======================================
// CANCEL PROJECT EDIT
// ======================================

cancelGigEditBtn.addEventListener("click", () => {

    editingProject = false;

    gigForm.reset();

    gigId.value = "";

    saveGigBtn.textContent = "Add Gig";

    cancelGigEditBtn.style.display = "none";

});

// ======================================
// ADD / UPDATE PROJECT
// ======================================

gigForm.addEventListener("submit", async function (e) {

    e.preventDefault();

    const project = {

        Client_ID: clientId.value,

        Project_Title: projectTitle.value,

        Budget_Amount: budgetAmount.value

    };

    try {

        if (!editingProject) {

            await fetch(`${API_BASE_URL}/projects`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(project)

            });

        }

        else {

            await fetch(`${API_BASE_URL}/projects/${gigId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(project)

            });

            editingProject = false;

            saveGigBtn.textContent = "Add Gig";

            cancelGigEditBtn.style.display = "none";

        }

        gigForm.reset();

        loadProjectsCRUD();

        fetchProjects();

    }

    catch (error) {

        console.error(error);

    }

});

// ===============================
// Load Everything
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    fetchUsers();
    fetchFreelancers();
    fetchProjects();
    fetchBudget();

    loadUsersCRUD();
    loadProjectsCRUD();
    loadContractsCRUD();

});