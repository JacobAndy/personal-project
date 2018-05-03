INSERT INTO employee(company_id, user_id,manager)
values($1,$2,$3);
DELETE FROM application where application_id=$4;