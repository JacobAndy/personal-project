insert into emails(recipient, email_contents)
values($1,$2) RETURNING *;