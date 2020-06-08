--USE master
--CREATE Database SmartBrain
--GO

--Use SmartBrain
--Go

--CREATE TABLE Users(
--ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_User_ID Primary Key,
--Name NVARCHAR(100) NOT NULL,
--Email NVARCHAR(100) NOT NULL CONSTRAINT UN_User_Email Unique,
--Entries bigint NOT NULL Default 0,
--Joined DateTime NOT NULL
--);

CREATE TABLE Login(
ID INT NOT NULL IDENTITY(1,1) CONSTRAINT PK_Login_ID Primary Key,
Hash varbinary(max) NOT NULL,
Email nvarchar(100) NOT NULL Constraint UN_Login_Email Unique,
CONSTRAINT FK_Login_Email Foreign Key (Email) References Users(Email)
)
