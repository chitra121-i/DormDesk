<?php

include "../db.php";

/*
---------------------------------
STEP 1:
Mark students as LEAVE
if current time is inside
approved gatepass period
---------------------------------
*/

$leaveQuery = "

UPDATE students s

INNER JOIN gatepasses g
ON s.id = g.student_id

SET s.status = 'leave'

WHERE g.status = 'Approved'

AND NOW() BETWEEN

TIMESTAMP(g.out_date,g.out_time)

AND

TIMESTAMP(g.return_date,g.return_time)

";

$conn->query($leaveQuery);


/*
---------------------------------
STEP 2:
Mark students PRESENT
when gatepass time ends
---------------------------------
*/

$presentQuery = "

UPDATE students s

INNER JOIN gatepasses g
ON s.id = g.student_id

SET s.status = 'present'

WHERE g.status = 'Approved'

AND NOW() >

TIMESTAMP(g.return_date,g.return_time)

";

$conn->query($presentQuery);


/*
---------------------------------
STEP 3:
Expire completed gatepasses
---------------------------------
*/

$expireGatepassQuery = "

UPDATE gatepasses

SET status='Expired'

WHERE status='Approved'

AND NOW() >

TIMESTAMP(return_date,return_time)

";

$conn->query($expireGatepassQuery);

?>