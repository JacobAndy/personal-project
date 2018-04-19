INSERT INTO users(auth_id, full_name,image)
VALUES($1,$2,$3) RETURNING *;