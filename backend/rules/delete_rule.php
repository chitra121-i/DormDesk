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

$id = $data["id"] ?? null;

if (!$id) {

    echo json_encode([
        "success" => false,
        "message" => "Rule ID is required."
    ]);

    exit();
}

/* Get Rule */

$getRule = $conn->prepare("
SELECT rule_text
FROM hostel_rules
WHERE id=?
");

$getRule->bind_param("i",$id);
$getRule->execute();

$rule = $getRule->get_result()->fetch_assoc();

$ruleText = $rule["rule_text"];

/* Delete Rule */

$sql = "
DELETE FROM hostel_rules
WHERE id = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $id
);

if ($stmt->execute()) {

    // Warden Activity
    logWardenActivity(
        $conn,
        "Hostel Rule Deleted",
        "Deleted a hostel rule.",
        "red"
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
            "Hostel Rule Deleted",
            $ruleText,
            "red"
        );

    }

    echo json_encode([
        "success" => true,
        "message" => "Rule deleted successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to delete rule."
    ]);

}

$stmt->close();
$conn->close();

?>