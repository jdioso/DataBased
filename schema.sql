CREATE DATABASE infinite_rso;
USE infinite_rso;

CREATE TABLE user (
  userID integer PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL,
);

CREATE TABLE admin (
  FOREIGN KEY(universityID) REFERENCES user(userID),
);

CREATE TABLE super_admin (
  FOREIGN KEY(universityID) REFERENCES user(userID),
);

CREATE TABLE university (
  universityID PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  location VARCHAR(256),
  description VARCHAR(1024),
  FOREIGN KEY(userID),
);

CREATE TABLE rso (
  rsoID integer PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(64),
  FOREIGN KEY(userID),
);

CREATE TABLE events (
  eventID integer PRIMARY KEY AUTO_INCREMENT,
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
  FOREIGN KEY(universityID),
);

-- Below is sample code for the template that was here beforehand will reference later
-- INSERT INTO notes (title, content)
-- VALUES
-- ('My First Note', 'A note about something'),
-- ('My Second Note', 'A note about something else');
