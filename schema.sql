CREATE TABLE application(
application_id SERIAL PRIMARY KEY,
company_id int foreign key references company(company_id),
user_id int foreign key references users(user_id)
)

CREATE TABLE company(
company_id SERIAL PRIMARY KEY,
name text,
founded text,
founder text,
latitude numeric,
longitude numeric,
location text
)

CREATE TABLE employee(
employee_id SERIAL PRIMARY KEY,
company_id int foreign key references company(company_id),
user_id int foreign key references users(user_id),
manager int
)

CREATE TABLE jobs(
job_id SERIAL PRIMARY KEY,
name varchar(100),
description varchar(100)
)

CREATE TABLE schedules(
schedule_id SERIAL PRIMARY KEY,
company_id int foreign key references company(company_id),
employee_id int foreign key references employee(employee_id) NOT NULL,
publish text NOT NULL,
monday_morning text, 
monday_night text,
tuesday_morning text,
tuesday_night text,
wednesday_morning text,
wednesday_night text,
thursday_morning text,
thursday_night text,
friday_morning text,
friday_night text,
saturday_morning text,
saturday_night text,
sunday_morning text,
sunday_night text
)

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    full_name varchar,
    email varchar,
    phone_number int,
    address text varchar,
    emergency_contact int,
    image text
)