select * from company c
join employee e on e.company_id = c.company_id
where e.user_id = $1;