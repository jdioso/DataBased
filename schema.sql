-- Create the database if it does not exist and use it
CREATE DATABASE IF NOT EXISTS infinite_rso;
USE infinite_rso;

-- Create user table
CREATE TABLE user (
                      userID INT AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(64) NOT NULL,
                      password VARCHAR(64) NOT NULL
);

-- Create admin table
CREATE TABLE admin (
                       adminID INT AUTO_INCREMENT PRIMARY KEY,
                       rsoID INT,
                       FOREIGN KEY (rsoID) REFERENCES user(userID)
);

-- Create super_admin table
CREATE TABLE super_admin (
                             superAdminID INT AUTO_INCREMENT PRIMARY KEY,
                             universityID INT,
                             FOREIGN KEY (universityID) REFERENCES user(userID)
);

-- Create university table
CREATE TABLE university (
                            universityID INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(64),
                            domain VARCHAR(32),
                            location VARCHAR(256),
                            description VARCHAR(1024),
                            numStudents INT,
                            picture VARCHAR(2048),
                            userID INT,
                            FOREIGN KEY (userID) REFERENCES user(userID)
);

-- Create rso table
CREATE TABLE rso (
                     rsoID INT AUTO_INCREMENT PRIMARY KEY,
                     name VARCHAR(64),
                     numMembers INT,
                     description VARCHAR(1024),
                     userID INT,
                     FOREIGN KEY (userID) REFERENCES user(userID)
);

-- Create events table without the commentID foreign key initially
CREATE TABLE events (
                        eventID INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(64),
                        eventType VARCHAR(16),
                        privacy VARCHAR(16),
                        approved BOOLEAN,
                        time TIME,
                        date DATE,
                        longitude DECIMAL(11, 7),
                        latitude DECIMAL(10, 8),
                        contactName VARCHAR(64),
                        contactEmail VARCHAR(64),
                        contactNumber VARCHAR(16),
                        description VARCHAR(1024),
                        universityID INT,
                        FOREIGN KEY (universityID) REFERENCES university(universityID)
);

-- Create comments table without the eventID foreign key initially
CREATE TABLE comments (
                          commentID INT AUTO_INCREMENT PRIMARY KEY,
                          text VARCHAR(1024),
                          userID INT,
                          rating INT,
                          eventID INT,  -- Add without foreign key constraint
                          FOREIGN KEY (userID) REFERENCES user(userID)
);

-- Now, add the cross-referencing foreign keys
ALTER TABLE events ADD COLUMN commentID INT;
ALTER TABLE events ADD CONSTRAINT FK_CommentID FOREIGN KEY (commentID) REFERENCES comments(commentID);
ALTER TABLE comments ADD CONSTRAINT FK_EventID FOREIGN KEY (eventID) REFERENCES events(eventID);

-- Insert sample data into user table
INSERT INTO user (email, password)
VALUES ('test@ucf.edu', 'testingAccount');
