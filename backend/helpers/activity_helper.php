<?php

function logStudentActivity(
    $conn,
    $student_id,
    $title,
    $description,
    $color = "orange"
)
{
    $student_id = intval($student_id);

    $title = $conn->real_escape_string($title);
    $description = $conn->real_escape_string($description);
    $color = $conn->real_escape_string($color);

    $sql = "
        INSERT INTO student_activities
        (
            student_id,
            title,
            description,
            color
        )
        VALUES
        (
            $student_id,
            '$title',
            '$description',
            '$color'
        )
    ";

    $conn->query($sql);
}


function logWardenActivity(
    $conn,
    $title,
    $description,
    $color = "orange",
    $student_id = null
)
{
    $title = $conn->real_escape_string($title);
    $description = $conn->real_escape_string($description);
    $color = $conn->real_escape_string($color);

    if ($student_id === null) {
        $student = "NULL";
    } else {
        $student = intval($student_id);
    }

    $sql = "
        INSERT INTO activities
        (
            student_id,
            title,
            description,
            color
        )
        VALUES
        (
            $student,
            '$title',
            '$description',
            '$color'
        )
    ";

    $conn->query($sql);
}

function addActivity(
    $conn,
    $student_id,
    $title,
    $description,
    $color
)
{
    logWardenActivity(
        $conn,
        $title,
        $description,
        $color,
        $student_id
    );
}

?>