<?php

include "../db.php";

header("Content-Type: application/json");

/* Total Students */

$totalStudents =
$conn->query("
SELECT COUNT(*) AS total
FROM students
WHERE status != 'alumni'
")->fetch_assoc()['total'];

/* Total Rooms */

$totalRooms =
$conn->query("
SELECT COUNT(*) AS total
FROM rooms
")->fetch_assoc()['total'];

/* Pending Complaints */

$pendingComplaints =
$conn->query("
SELECT COUNT(*) AS total
FROM complaints
WHERE status='Pending'
")->fetch_assoc()['total'];

/* Pending Gatepasses */

$pendingGatepasses =
$conn->query("
SELECT COUNT(*) AS total
FROM gatepasses
WHERE status='Pending'
")->fetch_assoc()['total'];

/* Approved Today */

$approvedToday =
$conn->query("
SELECT COUNT(*) AS total
FROM gatepasses
WHERE status='Approved'
AND DATE(created_at)=CURDATE()
")->fetch_assoc()['total'];

/* Beds Available */

$capacity =
$conn->query("
SELECT SUM(capacity) AS total
FROM rooms
")->fetch_assoc()['total'];

$currentStudents =
$conn->query("
SELECT COUNT(*) AS total
FROM students
WHERE status!='alumni'
")->fetch_assoc()['total'];

$bedsAvailable =
$capacity - $currentStudents;

echo json_encode([

    "success" => true,

    "totalStudents" => (int)$totalStudents,

    "totalRooms" => (int)$totalRooms,

    "pendingComplaints" => (int)$pendingComplaints,

    "pendingGatepasses" => (int)$pendingGatepasses,

    "approvedToday" => (int)$approvedToday,

    "bedsAvailable" => (int)$bedsAvailable

]);

$conn->close();

?>