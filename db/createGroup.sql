insert into company(name,founded,founder)
values($1,$2,$3)
RETURNING *;