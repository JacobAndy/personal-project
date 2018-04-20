select c.company_id
from company c
join employee e on e.company_id = c.company_id
where employee_id=$1;