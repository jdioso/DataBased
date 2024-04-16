CREATE DATABASE IF NOT EXISTS infinite_rso;
USE infinite_rso;

-- Create user table with first name and last name
CREATE TABLE user (
                      userID INT AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(64) NOT NULL,
                      password VARCHAR(64) NOT NULL,
                      firstName VARCHAR(64) NOT NULL,
                      lastName VARCHAR(64) NOT NULL,
                      universityID INT,
                      UNIQUE(email)
);

-- Create rso table
CREATE TABLE rso (
                     rsoID INT AUTO_INCREMENT PRIMARY KEY,
                     name VARCHAR(64) NOT NULL,
                     numMembers INT,
                     description VARCHAR(1024),
                     adminID INT, -- Foreign key to user who is the RSO admin
                     UNIQUE(name)
);

-- Create admin table linked to an RSO
CREATE TABLE admin (
                       adminID INT AUTO_INCREMENT PRIMARY KEY,
                       userID INT
);

-- Create super admin table linked to a university
CREATE TABLE super_admin (
                            saID INT AUTO_INCREMENT PRIMARY KEY,
                            universityID INT,
                            userID INT
);

-- Create university table
CREATE TABLE university (
                            universityID INT AUTO_INCREMENT PRIMARY KEY,
                            name VARCHAR(64) NOT NULL,
                            location VARCHAR(256) NOT NULL,
                            description VARCHAR(1024),
                            numStudents INT,
                            saID INT,
                            UNIQUE(name)
);

-- Create events table with rsoID which can be NULL and a foreign key
CREATE TABLE events (
                        eventID INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(64) NOT NULL,
                        eventType VARCHAR(16) NOT NULL,
                        privacy VARCHAR(16) NOT NULL,
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
                        rsoID INT DEFAULT NULL
);

-- Create comments table with foreign key linking to events and a rating
CREATE TABLE comments (
                          commentID INT AUTO_INCREMENT PRIMARY KEY,
                          text VARCHAR(1024),
                          rating TINYINT CHECK (rating BETWEEN 1 AND 5),
                          userID INT,
                          eventID INT
);

-- Create rso_members table to link users to RSOs (handles many-to-many relationship)
CREATE TABLE rso_members (
                             rsoID INT,
                             userID INT,
                             PRIMARY KEY (rsoID, userID)
);

-- Create university_pictures 
CREATE TABLE university_pictures (
                                    picID INT AUTO_INCREMENT PRIMARY KEY,
                                    universityID INT,
                                    picture_url VARCHAR(2048)
);

-- Create all foreign key conections between all tables
ALTER TABLE user
ADD FOREIGN KEY (universityID) REFERENCES university(universityID);

ALTER TABLE rso
ADD FOREIGN KEY (adminID) REFERENCES admin(adminID);

ALTER TABLE admin
ADD FOREIGN KEY (userID) REFERENCES user(userID),
ADD FOREIGN KEY (rsoID) REFERENCES rso(rsoID);

ALTER TABLE super_admin
ADD FOREIGN KEY (userID) REFERENCES user(userID),
ADD FOREIGN KEY (universityID) REFERENCES university(universityID);

ALTER TABLE university
ADD FOREIGN KEY (saID) REFERENCES super_admin(saID);

ALTER TABLE events
ADD FOREIGN KEY (universityID) REFERENCES university(universityID),
ADD FOREIGN KEY (rsoID) REFERENCES rso(rsoID);

ALTER TABLE comments
ADD FOREIGN KEY (userID) REFERENCES user(userID),
ADD FOREIGN KEY (eventID) REFERENCES events(eventID);

ALTER TABLE rso_members
ADD FOREIGN KEY (rsoID) REFERENCES rso(rsoID),
ADD FOREIGN KEY (userID) REFERENCES user(userID);

ALTER TABLE university_pictures
ADD FOREIGN KEY (universityID) REFERENCES university(universityID);


-- Index events by date and time
CREATE INDEX IDX_events_date ON events (date);
CREATE INDEX IDX_events_time ON events (time);

-- Insert sample data into user table
INSERT INTO user (email, password, firstName, lastName)
VALUES ('test@ucf.edu', 'testingAccount', 'John', 'Doe');
