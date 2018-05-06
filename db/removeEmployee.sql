DELETE FROM schedules where employee_id=$1;
DELETE FROM employee where employee_id=$1;
