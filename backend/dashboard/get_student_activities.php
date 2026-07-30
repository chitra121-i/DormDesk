<?php

include "../db.php";

header("Content-Type: application/json");

$student_id = intval($_GET["student_id"]);

$activities = [];

/* -----------------------------------
   PERSONAL STUDENT ACTIVITIES
------------------------------------ */

$sql = "

SELECT
id,
title,
description,
color,
created_at

FROM student_activities

WHERE student_id = '$student_id'

";

$result = $conn->query($sql);

while($row = $result->fetch_assoc()){

    $activities[] = $row;

}

/* -----------------------------------
   ALL NOTICES
------------------------------------ */

$sql = "

SELECT
id,
'Notice Published' AS title,
CONCAT('New Notice: ',title) AS description,
'orange' AS color,
created_at

FROM notices

";

$result = $conn->query($sql);

while($row = $result->fetch_assoc()){

    $activities[] = $row;

}

/* -----------------------------------
   ALL HOSTEL RULES
------------------------------------ */

$sql = "

SELECT
id,
'Hostel Rule Updated' AS title,
rule_text AS description,
'blue' AS color,
created_at

FROM hostel_rules

";

$result = $conn->query($sql);

while($row = $result->fetch_assoc()){

    $activities[] = $row;

}

/* -----------------------------------
   Sort Latest First
------------------------------------ */

usort($activities,function($a,$b){

    return strtotime($b["created_at"]) - strtotime($a["created_at"]);

});

/* -----------------------------------
   Keep Only Latest 10
------------------------------------ */

$activities = array_slice($activities,0,5);

echo json_encode([

    "success"=>true,
    "activities"=>$activities

]);

$conn->close();

?>