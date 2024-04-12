CREATE DATABASE infinite_rso;
USE infinite_rso;

CREATE TABLE user (
                      userID INT AUTO_INCREMENT PRIMARY KEY,
                      email VARCHAR(64) NOT NULL,
                      password VARCHAR(64) NOT NULL
);

CREATE TABLE admin (
                       adminID INT AUTO_INCREMENT PRIMARY KEY,
                       universityID INT,
                       FOREIGN KEY (universityID) REFERENCES user(userID)
);

CREATE TABLE super_admin (
                             superAdminID INT AUTO_INCREMENT PRIMARY KEY,
                             universityID INT,
                             FOREIGN KEY (universityID) REFERENCES user(userID)
);

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

CREATE TABLE rso (
                     rsoID INT AUTO_INCREMENT PRIMARY KEY,
                     name VARCHAR(64),
                     numMembers INT,
                     description VARCHAR(1024),
                     userID INT,
                     FOREIGN KEY (userID) REFERENCES user(userID)
);

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
                        commentID INT,
                        FOREIGN KEY (universityID) REFERENCES university(universityID),
                        FOREIGN KEY (commentID) REFERENCES comments(commentID)
);

CREATE TABLE comments (
                          commentID INT AUTO_INCREMENT PRIMARY KEY,
                          text VARCHAR(1024),
                          userID INT,
                          eventID INT,
                          FOREIGN KEY (userID) REFERENCES user(userID),
                          FOREIGN KEY (eventID) REFERENCES events(eventID)
);

INSERT INTO user (email, password)
VALUES ('test@ucf.edu', 'testingAccount');


-- Below is sample code for the template that was here beforehand will reference later
-- INSERT INTO notes (title, content)
-- VALUES
-- ('My First Note', 'A note about something'),
-- ('My Second Note', 'A note about something else');
