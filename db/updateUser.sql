update users set email=$1,phone_number=$2, address=$3,emergency_contact=$4 where auth_id=$5 RETURNING *;