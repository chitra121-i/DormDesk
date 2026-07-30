<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

include "../db.php";
include "../helpers/activity_helper.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$rule_text = trim(
    $data["rule_text"] ?? ""
);

if ($rule_text === "") {

    echo json_encode([
        "success" => false,
        "message" => "Rule cannot be empty."
    ]);

    exit();
}

$sql = "
INSERT INTO hostel_rules
(rule_text)

VALUES (?)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "s",
    $rule_text
);

if ($stmt->execute()) {

    // Warden Activity
    logWardenActivity(
        $conn,
        "Hostel Rule Added",
        "Added a new hostel rule.",
        "blue"
    );

    // Student Activities
    $students = $conn->query("
        SELECT id
        FROM students
        WHERE approval_status='Approved'
    ");

    while($student = $students->fetch_assoc()){

        logStudentActivity(
            $conn,
            $student["id"],
            "Hostel Rule Added",
            $rule_text,
            "blue"
        );

    }

    echo json_encode([
        "success" => true,
        "message" => "Rule added successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to add rule."
    ]);

}

$stmt->close();
$conn->close();

?>