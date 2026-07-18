<?php

include "../gatepasses/update_expired_gatepasses.php";
include "../db.php";

header("Content-Type: application/json");

/* Total Capacity */

$capacityQuery = "

SELECT SUM(capacity) AS total_capacity

FROM rooms

";

$capacityResult = $conn->query($capacityQuery);

$totalCapacity =
$capacityResult->fetch_assoc()['total_capacity'];


/* Living Students */

$livingQuery = "

SELECT COUNT(*) AS living

FROM students

WHERE status != 'alumni'

";

$livingResult = $conn->query($livingQuery);

$living =
$livingResult->fetch_assoc()['living'];


/* On Leave */

$leaveQuery = "

SELECT COUNT(*) AS on_leave

FROM students

WHERE status='leave'

";

$leaveResult = $conn->query($leaveQuery);

$onLeave =
$leaveResult->fetch_assoc()['on_leave'];


/* Present */

$presentQuery = "

SELECT COUNT(*) AS present

FROM students

WHERE status='present'

";

$presentResult = $conn->query($presentQuery);

$present =
$presentResult->fetch_assoc()['present'];


echo json_encode([

    "success" => true,

    "capacity" => (int)$totalCapacity,

    "living" => (int)$living,

    "on_leave" => (int)$onLeave,

    "present" => (int)$present

]);

$conn->close();

?>