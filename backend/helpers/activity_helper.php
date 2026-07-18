<?php

function addActivity($conn, $student_id, $title, $description, $color){

    if($student_id == "" || $student_id == null){
        $student = "NULL";
    }else{
        $student = "'$student_id'";
    }

    $sql = "

    INSERT INTO activities
    (student_id, title, description, color)

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

?>