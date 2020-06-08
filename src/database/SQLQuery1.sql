--Drop the tables if they exits
DROP TABLE IF Exists Login
Drop TABLE IF Exists Users

--Create the Users Table in your database
CREATE TABLE Users(
ID INT NOT NULL Identity(1,1) Constraint PK_Users_ID Primary Key,
Name nvarchar(max) NOT NULL,
Age int NOT NULL ,
DOB date NOT NULL
);

--Insert the some data into the users table
INSERT INTO USERS (Name, Age, DOB) VALUES ('Andrei', 31, '1930-01-25')
INSERT INTO USERS (Name, Age, DOB) VALUES ('Sally', 41, '1930-01-04')
INSERT INTO USERS (Name, Age, DOB) Values ('John', 45, '1935-04-04')
INSERT INTO USERS (Name, Age, DOB) Values ('Amy', 15, '1935-04-04')

--Alter the users table, add a column
ALTER TABLE USERS ADD score int

--Update the data in the users table, populating the score
Update Users Set score= 50 where name ='Andrei'
Update Users Set score=100 where name in('Sally', 'John')
Update Users Set score =88 where name ='Amy'

--Select all the data from the users table
SELECT * from Users
SELECT * from Users where name like 'a%'
SELECT * from Users where name like '%y'
SELECT * from Users Order By score desc
SELECT * from Users Order By score asc

SELECT Avg(score) as AvgScore from Users
Select Sum(age) as TotalAge from Users
Select Count(name) as NumUsers from Users

--Create the login table
CREATE TABLE Login(
ID int not null Identity(1,1) Constraint PK_Login_ID Primary Key,
Secret nvarchar(100) Not Null,
UserID int NOT NULL CONSTRAINT FK_Users_ID Foreign Key(UserID) References Users(ID)
);

--Populate the login data from Andrei, Sally, and John
INSERT INTO Login(Secret, UserID) VALUES 
	('abc', (SELECT ID FROM Users WHERE NAME ='Andrei')), 
	('xyz', (SELECT ID FROM Users Where NAME = 'Sally')),
	('lol', (SELECT ID from Users WHERE NAME ='John'))

--Perform a JOIN query (MSSQL Uses Inner JOIN, Left JOIN and Right JOIN)
SELECT Name, Age, DOB, Secret FROM Users INNER JOIN Login ON USERs.ID = Login.UserID

