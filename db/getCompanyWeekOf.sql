-- select * from schedules where company_id=$1 AND week_of=$2;
SELECT distinct u.user_id,e.employee_id,u.full_name,u.email,u.phone_number,u.address,u.emergency_contact,u.image,s.publish,s.monday_morning,s.monday_night,s.tuesday_morning,s.tuesday_night,s.wednesday_morning,s.wednesday_night,
s.thursday_morning,s.thursday_night,s.friday_morning,s.friday_night,
s.saturday_morning,s.saturday_night,s.sunday_morning,s.sunday_night,s.monday_m,s.monday_n,s.tuesday_m,s.tuesday_n,s.wednesday_m,s.wednesday_n,s.thursday_m,s.thursday_n,s.friday_m,s.friday_n,
s.saturday_m,s.saturday_n,s.sunday_m,s.sunday_n,e.manager
FROM schedules s
JOIN employee e on e.company_id=s.company_id
JOIN users u on u.user_id=e.user_id
WHERE e.company_id = $1
AND s.week_of = $2;