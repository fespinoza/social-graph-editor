UPDATE pg_database SET datallowconn = TRUE where datname = 'template0';
\c template0
UPDATE pg_database SET datistemplate = FALSE where datname = 'template1';
drop database template1;
create database template1 with template = template0 encoding = 'UNICODE'  LC_CTYPE = 'en_US.UTF-8' LC_COLLATE = 'C';
UPDATE pg_database SET datistemplate = TRUE where datname = 'template1';
\c template1
UPDATE pg_database SET datallowconn = FALSE where datname = 'template0';