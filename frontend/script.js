// ==========================================
// API
// ==========================================

const API_BASE_URL = "http://localhost:3000";


// ==========================================
// NAVIGATION
// ==========================================

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


// ==========================================
// DASHBOARD
// ==========================================

async function loadDashboard() {

    try {

        const [
            usersResponse,
            freelancersResponse,
            projectsResponse,
            budgetResponse

        ] = await Promise.all([

            fetch(`${API_BASE_URL}/users`),
            fetch(`${API_BASE_URL}/freelancers`),
            fetch(`${API_BASE_URL}/projects/active`),
            fetch(`${API_BASE_URL}/budget`)

        ]);

        const users = await usersResponse.json();
        const freelancers = await freelancersResponse.json();
        const projects = await projectsResponse.json();
        const budget = await budgetResponse.json();

        renderUsers(users.data);

        renderFreelancers(freelancers.data);

        renderProjects(projects.data);

        renderBudget(budget.data);

        document.getElementById("usersCount").textContent =
            users.data.length;

        document.getElementById("freelancersCount").textContent =
            freelancers.data.length;

        document.getElementById("projectsCount").textContent =
            projects.data.length;

        document.getElementById("dashboardBudget").textContent =
            "₹" +
            Number(
                budget.data.Total_Contract_Budget
            ).toLocaleString("en-IN");

    }

    catch(error){

        console.error(error);

    }

}


// ==========================================
// DASHBOARD TABLES
// ==========================================

function renderUsers(users){

    const table =
        document.getElementById("usersTable");

    table.innerHTML = "";

    users.forEach(user=>{

        table.innerHTML +=`

        <tr>

            <td>${user.User_ID}</td>

            <td>${user.User_Name}</td>

            <td>${user.User_Role}</td>

            <td>${user.Skill_Rating}</td>

        </tr>

        `;

    });

}

function renderFreelancers(users){

    const table =
        document.getElementById("freelancersTable");

    table.innerHTML="";

    users.forEach(user=>{

        table.innerHTML+=`

        <tr>

            <td>${user.User_ID}</td>

            <td>${user.User_Name}</td>

            <td>${user.Skill_Rating}</td>

        </tr>

        `;

    });

}

function renderProjects(projects){

    const table =
        document.getElementById("projectsTable");

    table.innerHTML="";

    projects.forEach(project=>{

        table.innerHTML+=`

        <tr>

            <td>${project.Gig_ID}</td>

            <td>${project.Project_Title}</td>

            <td>₹${Number(project.Budget_Amount).toLocaleString("en-IN")}</td>

        </tr>

        `;

    });

}

function renderBudget(budget){

    document.getElementById("totalBudget").textContent =
        "₹" +
        Number(
            budget.Total_Contract_Budget
        ).toLocaleString("en-IN");

}
// ==========================================
// USERS CRUD VARIABLES
// ==========================================

let editingUser = false;

const userForm = document.getElementById("userForm");

const userId = document.getElementById("userId");

const userName = document.getElementById("userName");

const userRole = document.getElementById("userRole");

const userRating = document.getElementById("userRating");

const saveUserBtn = document.getElementById("saveUserBtn");

const cancelEditBtn = document.getElementById("cancelEditBtn");

const usersCrudTable = document.getElementById("usersCrudTable");

// ==========================================
// LOAD USERS CRUD
// ==========================================

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

// ==========================================
// RENDER USERS CRUD
// ==========================================

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

// ==========================================
// EDIT USER
// ==========================================

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

    catch(error){

        console.error(error);

    }

}

// ==========================================
// CANCEL EDIT
// ==========================================

cancelEditBtn.addEventListener("click", () => {

    editingUser = false;

    userForm.reset();

    userId.value = "";

    saveUserBtn.textContent = "Add User";

    cancelEditBtn.style.display = "none";

});

// ==========================================
// DELETE USER
// ==========================================

async function deleteUser(id) {

    if (!confirm("Are you sure you want to delete this user?")) {

        return;

    }

    try {

        await fetch(`${API_BASE_URL}/users/${id}`, {

            method: "DELETE"

        });

        await loadUsersCRUD();

        await loadDashboard();

    }

    catch(error){

        console.error(error);

    }

}

// ==========================================
// ADD / UPDATE USER
// ==========================================

userForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const user = {

        User_Name: userName.value,

        User_Role: userRole.value,

        Skill_Rating: userRating.value

    };

    try {

        if(editingUser){

            await fetch(`${API_BASE_URL}/users/${userId.value}`,{

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(user)

            });

        }

        else{

            await fetch(`${API_BASE_URL}/users`,{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(user)

            });

        }

        editingUser = false;

        userForm.reset();

        userId.value = "";

        saveUserBtn.textContent = "Add User";

        cancelEditBtn.style.display = "none";

        await loadUsersCRUD();

        await loadDashboard();

    }

    catch(error){

        console.error(error);

    }

});

// ==========================================
// GIGS CRUD VARIABLES
// ==========================================

let editingGig = false;

const gigForm = document.getElementById("gigForm");

const gigId = document.getElementById("gigId");

const clientId = document.getElementById("clientId");

const projectTitle = document.getElementById("projectTitle");

const budgetAmount = document.getElementById("budgetAmount");

const saveGigBtn = document.getElementById("saveGigBtn");

const cancelGigEditBtn = document.getElementById("cancelGigEditBtn");

const gigsCrudTable = document.getElementById("gigsCrudTable");

// ==========================================
// LOAD GIGS CRUD
// ==========================================

async function loadGigsCRUD() {

    try {

        const response = await fetch(`${API_BASE_URL}/projects`);

        const result = await response.json();

        renderGigsCRUD(result.data);

    }

    catch(error){

        console.error(error);

    }

}

// ==========================================
// RENDER GIGS CRUD
// ==========================================

function renderGigsCRUD(gigs){

    gigsCrudTable.innerHTML = "";

    gigs.forEach(gig=>{

        gigsCrudTable.innerHTML += `

        <tr>

            <td>${gig.Gig_ID}</td>

            <td>${gig.Client_ID}</td>

            <td>${gig.Project_Title}</td>

            <td>₹${Number(gig.Budget_Amount).toLocaleString("en-IN")}</td>

            <td>

                <button onclick="editGig(${gig.Gig_ID})">

                    Edit

                </button>

                <button onclick="deleteGig(${gig.Gig_ID})">

                    Delete

                </button>

            </td>

        </tr>

        `;

    });

}

// ==========================================
// EDIT GIG
// ==========================================

async function editGig(id){

    try{

        const response = await fetch(`${API_BASE_URL}/projects/${id}`);

        const result = await response.json();

        const gig = result.data;

        gigId.value = gig.Gig_ID;

        clientId.value = gig.Client_ID;

        projectTitle.value = gig.Project_Title;

        budgetAmount.value = gig.Budget_Amount;

        editingGig = true;

        saveGigBtn.textContent = "Update Gig";

        cancelGigEditBtn.style.display = "inline-block";

    }

    catch(error){

        console.error(error);

    }

}

// ==========================================
// CANCEL GIG EDIT
// ==========================================

cancelGigEditBtn.addEventListener("click", () => {

    editingGig = false;

    gigForm.reset();

    gigId.value = "";

    saveGigBtn.textContent = "Add Gig";

    cancelGigEditBtn.style.display = "none";

});

// ==========================================
// DELETE GIG
// ==========================================

async function deleteGig(id) {

    if (!confirm("Are you sure you want to delete this gig?")) {

        return;

    }

    try {

        await fetch(`${API_BASE_URL}/projects/${id}`, {

            method: "DELETE"

        });

        await loadGigsCRUD();

        await loadDashboard();

    }

    catch (error) {

        console.error(error);

    }

}

// ==========================================
// ADD / UPDATE GIG
// ==========================================

gigForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const gig = {

        Client_ID: clientId.value,

        Project_Title: projectTitle.value,

        Budget_Amount: budgetAmount.value

    };

    try {

        if (editingGig) {

            await fetch(`${API_BASE_URL}/projects/${gigId.value}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(gig)

            });

        }

        else {

            await fetch(`${API_BASE_URL}/projects`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(gig)

            });

        }

        editingGig = false;

        gigForm.reset();

        gigId.value = "";

        saveGigBtn.textContent = "Add Gig";

        cancelGigEditBtn.style.display = "none";

        await loadGigsCRUD();

        await loadDashboard();

    }

    catch (error) {

        console.error(error);

    }

});

// ==========================================
// CONTRACT CRUD VARIABLES
// ==========================================

let editingContract = false;

const contractForm = document.getElementById("contractForm");

const contractId = document.getElementById("contractId");

const contractGigId = document.getElementById("contractGigId");

const freelancerId = document.getElementById("freelancerId");

const contractStatus = document.getElementById("contractStatus");

const saveContractBtn = document.getElementById("saveContractBtn");

const cancelContractEditBtn = document.getElementById("cancelContractEditBtn");

const contractsCrudTable = document.getElementById("contractsCrudTable");

// ==========================================
// LOAD CONTRACTS CRUD
// ==========================================

async function loadContractsCRUD() {

    try {

        const response = await fetch(`${API_BASE_URL}/contracts`);

        const result = await response.json();

        renderContractsCRUD(result.data);

    }

    catch(error){

        console.error(error);

    }

}

// ==========================================
// RENDER CONTRACTS CRUD
// ==========================================

function renderContractsCRUD(contracts){

    contractsCrudTable.innerHTML = "";

    contracts.forEach(contract=>{

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

// ==========================================
// EDIT CONTRACT
// ==========================================

async function editContract(id){

    try{

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

    catch(error){

        console.error(error);

    }

}

// ==========================================
// CANCEL CONTRACT EDIT
// ==========================================

cancelContractEditBtn.addEventListener("click",()=>{

    editingContract = false;

    contractForm.reset();

    contractId.value = "";

    saveContractBtn.textContent = "Add Contract";

    cancelContractEditBtn.style.display = "none";

});

// ==========================================
// DELETE CONTRACT
// ==========================================

async function deleteContract(id){

    if(!confirm("Are you sure?")) return;

    try{

        await fetch(`${API_BASE_URL}/contracts/${id}`,{

            method:"DELETE"

        });

        await loadContractsCRUD();

        await loadDashboard();

    }

    catch(error){

        console.error(error);

    }

}

// ==========================================
// ADD / UPDATE CONTRACT
// ==========================================

contractForm.addEventListener("submit",async(e)=>{

    e.preventDefault();

    const contract={

        Gig_ID:contractGigId.value,

        Freelancer_ID:freelancerId.value,

        Contract_Status:contractStatus.value

    };

    try{

        if(editingContract){

            await fetch(`${API_BASE_URL}/contracts/${contractId.value}`,{

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(contract)

            });

        }

        else{

            await fetch(`${API_BASE_URL}/contracts`,{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(contract)

            });

        }

        editingContract=false;

        contractForm.reset();

        contractId.value="";

        saveContractBtn.textContent="Add Contract";

        cancelContractEditBtn.style.display="none";

        await loadContractsCRUD();

        await loadDashboard();

    }

    catch(error){

        console.error(error);

    }

});



// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener("DOMContentLoaded", async () => {

    await loadDashboard();

    await loadUsersCRUD();

    await loadGigsCRUD();

    await loadContractsCRUD();

});