Create Database KCS_DB;
Use KCS_DB;

-- USER MANAGEMENT: Users Table
Create Table Users_TBL(
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    User_Name Varchar(50),
    User_Pass_Hash Varchar(255),
    User_Email Varchar(50),
    User_Role Varchar(20),
    User_Created_Date DateTime,
    User_LastLogin_Date DateTime
);

-- USER MANAGEMENT: Roles Table
Create Table Roles_TBL(
    Role_ID INT PRIMARY KEY AUTO_INCREMENT,
    Role_Name Varchar(20),
    Role_Permissions Text
);

-- Appointment & Scheduling: Services Table
Create Table Services_TBL(
    Service_ID INT PRIMARY KEY AUTO_INCREMENT,
    Service_Name Varchar(50),
    Service_Description Text,
    Service_Price Decimal(10,2)
);

-- Appointment & Scheduling: Appointments table
CREATE TABLE Appointments_TBL (
    Appointment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Appointment_UserID INT,
    Appointment_Service_ID INT,
    Appointment_Date DATETIME,
    Appointment_Status VARCHAR(20),
    Appointment_Notes TEXT,
    
    FOREIGN KEY (Appointment_UserID) REFERENCES Users_TBL(UserID),
    FOREIGN KEY (Appointment_Service_ID) REFERENCES Services_TBL(Service_ID)
);

-- Appointment & Scheduling: Schedule Table
Create Table Schedule_TBL(
    Schedule_ID INT PRIMARY KEY AUTO_INCREMENT,
    Schedule_Appointment_ID INT,
    Schedule_Available_TimeSlot DATETIME,
    Schedule_Status VARCHAR(50),

    FOREIGN KEY (Schedule_Appointment_ID) REFERENCES Appointments_TBL(Appointment_ID)
);

-- Job Order Creation and Personnel Assignment: Personnel Table
Create Table Personnel_TBL(
    Personnel_ID INT PRIMARY KEY AUTO_INCREMENT,
    Personnel_Name VARCHAR(50),
    Personnel_Specialization VARCHAR(100),
    Personnel_Contact_Info VARCHAR(200)
);

-- Job Order Creation and Personnel Assignment: Job Orders Table
Create Table Job_Orders_TBL(
    Job_OrderID INT PRIMARY KEY AUTO_INCREMENT,
    Job_Order_Appointment_ID INT,
    Job_Order_Assigned_Personnel_ID INT,
    Job_OrderStatus VARCHAR(30),

    FOREIGN KEY (Job_Order_Appointment_ID) REFERENCES Appointments_TBL(Appointment_ID),
    FOREIGN KEY (Job_Order_Assigned_Personnel_ID) REFERENCES Personnel_TBL(Personnel_ID)
);

-- Quotation Management : Quotations Table
Create Table Quotations_TBL(
    Quotations_ID INT PRIMARY KEY AUTO_INCREMENT,
    Quotations_Appointment_ID INT,
    Quotations_Details TEXT,
    Quotations_Amount DECIMAL(10,2),
    Quotations_Approval_Status VARCHAR(20),

    FOREIGN KEY (Quotations_Appointment_ID) REFERENCES Appointments_TBL(Appointment_ID)
);

-- Customer Data Management : Customer Data Table
Create Table CustomerData_TBL(
    Customer_ID INT PRIMARY KEY AUTO_INCREMENT,
    Customer_Name VARCHAR(50),
    Customer_Address VARCHAR(100),
    Customer_ContactNumber VARCHAR(15),
    Customer_Email VARCHAR(100),
    Customer_Service_History TEXT
);

-- Payment and Billing : Payments Table
Create Table Payments_TBL(
    Payment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Payment_Appointment_ID INT,
    Payment_Amount DECIMAL(10,2),
    Payment_Date DATETIME,
    Payment_Status VARCHAR(20),

    FOREIGN KEY (Payment_Appointment_ID) REFERENCES Appointments_TBL(Appointment_ID)
);

-- Reporting and Analytics : Reports Table
Create Table Reports_TBL(
    Report_ID INT PRIMARY KEY AUTO_INCREMENT,
    Report_Type VARCHAR(20),
    Report_Date_Range VARCHAR(50),
    Report_Generated_Date DATETIME
);

-- Reporting and Analytics : Data Reports Table
Create Table Data_TBL(
    Data_ID INT PRIMARY KEY AUTO_INCREMENT,
    Data_ReportID INT,
    Data_Metric_Name VARCHAR(50),
    Data_Metric_Value DECIMAL(10,2),

    FOREIGN KEY (Data_ReportID) REFERENCES Reports_TBL(Report_ID)
);

-- Communication Module: Notifications Table
Create Table Notifications_TBL(
    Notif_ID INT PRIMARY KEY AUTO_INCREMENT,
    Notif_UserID INT,
    Notif_Message TEXT,
    Notif_DateSent DATETIME,
    Notif_Type VARCHAR(20),
    Notif_Status VARCHAR(10),

    FOREIGN KEY (Notif_UserID) REFERENCES Users_TBL(UserID)
);

-- Communication Module: Backup Table
Create Table BackupLog_TBL(
    Backup_ID INT PRIMARY KEY AUTO_INCREMENT,
    Backup_Date DATETIME,
    Backup_Type VARCHAR(20),
    Backup_Status VARCHAR(10)
);

-- Communication Module: System Table
Create Table SystemLog_TBL(
    SystemLog_ID INT PRIMARY KEY AUTO_INCREMENT,
    SystemLog_UserID INT,
    SystemLog_Action_Performed TEXT,
    SystemLog_Timestamp DATETIME,

    FOREIGN KEY (SystemLog_UserID) REFERENCES Users_TBL(UserID)
);

-- User Modules (Customer-Focused) : Vehicle Table
Create Table Vehicle_TBL(
    Vehicle_ID INT PRIMARY KEY AUTO_INCREMENT,
    Vehicle_Customers_ID INT,
    Vehicle_Make VARCHAR(30), 
    Vehicle_Model VARCHAR(30),
    Vehicle_Year INT,
    License_Plate VARCHAR(10),

    FOREIGN KEY (Vehicle_Customers_ID) REFERENCES CustomerData_TBL(Customer_ID)
);

-- Feedback Table 
Create Table FeedBack_TBL(
    Feedback_ID INT PRIMARY KEY AUTO_INCREMENT,
    Feedback_UserID INT,
    Feedback_Txt TEXT,
    Feedback_Rating INT,
    Feedback_Submission_Date DATETIME,

    FOREIGN KEY (Feedback_UserID) REFERENCES Users_TBL(UserID)
);
