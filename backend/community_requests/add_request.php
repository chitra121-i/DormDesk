<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") {
    exit();
}

include "../db.php";
include "../helpers/activity_helper.php";

$data = json_decode(file_get_contents("php://input"), true);

$title = trim($data["title"]);
$description = trim($data["description"]);
$category = trim($data["category"]);
$created_by = $data["created_by"];

if (
    empty($title) ||
    empty($description) ||
    empty($category) ||
    empty($created_by)
) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required."
    ]);
    exit();
}

$sql = "INSERT INTO community_requests
(title, description, category, created_by)
VALUES
(?, ?, ?, ?)";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "sssi",
    $title,
    $description,
    $category,
    $created_by
);

if ($stmt->execute()) {

    $request_id = $stmt->insert_id;

    // Automatically support own request

    $support_sql = "
    INSERT INTO request_supports
    (request_id, student_id)
    VALUES (?, ?)
    ";

    $support_stmt = $conn->prepare($support_sql);

    $support_stmt->bind_param(
        "ii",
        $request_id,
        $created_by
    );

    $support_stmt->execute();

    // Student Activity

    logStudentActivity(
        $conn,
        $created_by,
        "Community Request Submitted",
        "Your community request has been submitted.",
        "orange"
    );

    // Warden Activity

    logWardenActivity(
        $conn,
        "Community Request Submitted",
        "A new community request was submitted.",
        "orange"
    );

    echo json_encode([
        "success" => true,
        "message" => "Request submitted successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Something went wrong."
    ]);

}

$conn->close();

?>
