select u.full_name, u.phone_number, u.address, u.emergency_contact, u.image,
from users u
 join employee e 
 on e.user_id = u.user_id
 join company on company_id=$1;
 