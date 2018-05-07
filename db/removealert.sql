delete from emails where email_id=$1;
select * from emails where recipient=$2;