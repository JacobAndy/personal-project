SELECT s.publish,s.monday_morning,s.monday_night,s.tuesday_morning,s.tuesday_night,s.wednesday_morning,s.wednesday_night,s.thursday_morning,s.thursday_night,s.friday_morning,s.friday_night,
s.saturday_morning,s.saturday_night,s.sunday_morning,s.sunday_night,s.monday_m,s.monday_n,s.tuesday_m,s.tuesday_n,s.wednesday_m,s.wednesday_n,s.thursday_m,s.thursday_n,s.friday_m,s.friday_n,
s.saturday_m,s.saturday_n,s.sunday_m,s.sunday_n 
FROM schedules s
JOIN company c on s.company_id = $1
AND s.publish = $2;
