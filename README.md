# College Events Portal

Welcome to our College Events Portal GitHub repository! This project is a full-stack web application designed to manage college events. It allows various user roles such as students, event organizers, and university admins to create, edit, and delete events, Registered Student Organizations (RSOs), and university details in a user-friendly, responsive interface.

## Features

- **User Authentication**: Secure login and registration system for different user levels.
- **Event Management**: Users can create, update, and delete events, with features to manage event details such as date, time, and location.
- **RSO Management**: Facilitates the creation and management of RSOs, allowing students to find and join groups of interest.
- **University Management**: University admins can add or update their university's information, ensuring accurate and up-to-date data.

## Built With

- **Frontend**: Implemented in [React.js](https://reactjs.org/) for a dynamic and responsive user interface.
- **API**: Developed using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), providing robust back-end functionality and routing.
- **Database**: Managed with [MySQL](https://www.mysql.com/), hosted on [AWS RDS](https://aws.amazon.com/rds/) ensuring efficient data storage and retrieval from anywhere.

## Team

- **Kevin, Daisy**: Frontend Development
- **Camilo, Jacob**: API Development
- **Jose**: Database Architecture

## Assignment Compliance

This project was developed following a detailed assignment rubric for a Database Systems course ensuring it meets all educational objectives and requirements. Here are some of the key rubric points addressed:

- **Responsive Design**: The application is fully responsive, ensuring it works on a variety of devices and screen sizes.
- **User Role Management**: Implemented multiple user levels with appropriate permissions for each role.
- **Secure Data Handling**: All data interactions are secured, with emphasis on protecting sensitive user information.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Install NPM and Node.js

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/jdioso/DataBased.git
   ```
2. Backend
   ```sh
   cd backend
   npm install
   npm run dev
   ```
3. Frontend

In a new terminal run:
``` sh
cd frontend
npm install
npm run start
```
5. Creating your env file.
- Create an AWS MySQL/Aurora instance.
- Create .env in root and fill in your information.
``` sh
MYSQL_HOST=<AWS ENDPOINT>
MYSQL_USER=<AWS DB USERNAME>
MYSQL_PASSWORD=<AWS DB PASSWORD>
MYSQL_DATABASE=<AWS DB NAME>
AWS_PORT=<AWS PORT>
NODE_PORT=8080
```
  
## Contact

For more details and any queries, feel free to contact any of the team members via email or through our project's issues section on GitHub.
