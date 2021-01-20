-- create database first
CREATE DATABASE minifarm
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- then run this against the created database to enable uuid
CREATE EXTENSION "uuid-ossp";