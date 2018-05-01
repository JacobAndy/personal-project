insert into company(name,founded,founder,latitude,longitude,location)
values($1,$2,$3,$4,$5,$6)
RETURNING *;