SELECT u.full_name,u.email,u.phone_number,u.user_id, a.company_id,a.application_id FROM application a
JOIN users u ON u.user_id = a.user_id
where company_id=$1;