-- select c.company_id
-- from company c
-- join employee e on e.company_id = c.company_id
-- where employee_id=$1;

select company_id from employee where employee_id=$1