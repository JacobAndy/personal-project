select e.manager,c.company_id,c.name,c.founded,c.founder,c.latitude,c.longitude,c.location from company c
join employee e on e.company_id = c.company_id
where e.user_id = $1;