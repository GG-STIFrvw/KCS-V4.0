<?php
// Include the database connection
include 'db_connect.php';

$host = 'localhost'; // Keep 'localhost'
$dbname = 'kcs_db'; // Replace with your database name
$username = 'root'; // Default for local servers
$password = ''; // Default password is often blank

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Database connection successful
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $vehicleType = $_POST['vehicle_type'];
    $plateNumber = $_POST['plate_number'];
    $contactNumber = $_POST['contact_number'];
    $appointmentDateTime = $_POST['appointment_date_time'];
    $notes = $_POST['notes'];
    $services = $_POST['services']; // Array of service IDs

    // Validate data
    if (empty($name) || empty($vehicleType) || empty($plateNumber) || empty($contactNumber) || empty($appointmentDateTime) || empty($services)) {
        die("All fields are required.");
    }

    // Insert into CustomerData_TBL
    $customerSql = "INSERT INTO CustomerData_TBL (Customer_Name, Customer_ContactNumber) VALUES (?, ?)";
    $stmt = $conn->prepare($customerSql);
    $stmt->bind_param("ss", $name, $contactNumber);
    $stmt->execute();
    $customerId = $stmt->insert_id;

    // Insert into Vehicle_TBL
    $vehicleSql = "INSERT INTO Vehicle_TBL (Vehicle_Customers_ID, Vehicle_Make, License_Plate) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($vehicleSql);
    $stmt->bind_param("iss", $customerId, $vehicleType, $plateNumber);
    $stmt->execute();

    // Insert into Appointments_TBL for each selected service
    foreach ($services as $serviceId) {
        $appointmentSql = "INSERT INTO Appointments_TBL (Appointment_UserID, Appointment_Service_ID, Appointment_Date, Appointment_Notes) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($appointmentSql);
        $stmt->bind_param("iiss", $customerId, $serviceId, $appointmentDateTime, $notes);
        $stmt->execute();
    }

    // Success message
    echo "Appointment successfully booked!";
    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
