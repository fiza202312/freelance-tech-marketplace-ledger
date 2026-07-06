-- ============================================
-- FREELANCE TECH MARKETPLACE LEDGER DATABASE
-- ============================================

-- Remove existing database if it exists
DROP DATABASE IF EXISTS freelance_marketplace;

-- Create Database
CREATE DATABASE freelance_marketplace;

-- Use Database
USE freelance_marketplace;

-- ============================================
-- USERS TABLE
-- ============================================

CREATE TABLE Users (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_Name VARCHAR(100) NOT NULL,
    User_Role VARCHAR(50) NOT NULL,
    Skill_Rating DECIMAL(2,1) NOT NULL
);

-- ============================================
-- GIGS TABLE
-- ============================================

CREATE TABLE Gigs (
    Gig_ID INT AUTO_INCREMENT PRIMARY KEY,
    Client_ID INT NOT NULL,
    Project_Title VARCHAR(200) NOT NULL,
    Budget_Amount DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (Client_ID)
    REFERENCES Users(User_ID)
);

-- ============================================
-- CONTRACTS TABLE
-- ============================================

CREATE TABLE Contracts (
    Contract_ID INT AUTO_INCREMENT PRIMARY KEY,
    Gig_ID INT NOT NULL,
    Freelancer_ID INT NOT NULL,
    Contract_Status VARCHAR(50) NOT NULL,

    FOREIGN KEY (Gig_ID)
    REFERENCES Gigs(Gig_ID),

    FOREIGN KEY (Freelancer_ID)
    REFERENCES Users(User_ID)
);

-- ============================================
-- INSERT USERS
-- ============================================

INSERT INTO Users
(User_Name, User_Role, Skill_Rating)
VALUES
('Alice Johnson', 'Freelancer', 4.9),
('Bob Smith', 'Client', 0.0),
('Charlie Brown', 'Freelancer', 4.7),
('David Wilson', 'Client', 0.0),
('Emma Davis', 'Freelancer', 4.8),
('Frank Thomas', 'Freelancer', 4.3);

-- ============================================
-- INSERT GIGS
-- ============================================

INSERT INTO Gigs
(Client_ID, Project_Title, Budget_Amount)
VALUES
(2, 'E-Commerce Website', 50000),
(4, 'Portfolio Website', 15000),
(2, 'Inventory Management System', 75000),
(4, 'Restaurant Ordering App', 60000);

-- ============================================
-- INSERT CONTRACTS
-- ============================================

INSERT INTO Contracts
(Gig_ID, Freelancer_ID, Contract_Status)
VALUES
(1, 1, 'Active'),
(2, 3, 'Completed'),
(3, 5, 'Active'),
(4, 6, 'Pending');