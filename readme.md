# SmestiMe!

## Overview
SmestiMe! is a university project developed as part of an assignment at the Faculty of Organizational Sciences in Belgrade. It is built using **Spring Boot** for the backend and **React** for the frontend. The application provides a platform for managing seats and tables at user-created events.

## Technologies Used
- **Backend:** Spring Boot
- **Frontend:** React
- **Database:** MySQL

## Features
- User and admin authentication and authorization
- Event creation
- Signing for events and table choice
- User roles (Admin, Participant)
- REST API with secured endpoints

## Installation & Setup
### Prerequisites
- Java 17+
- Node.js 16+

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/Rashoola/SmestiMe.git
   cd SmestiMe/backend
   ```
2. Configure the application properties in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/smesti_db
   spring.datasource.username="root"
   spring.datasource.password=
   ```
3. Build and run the backend:
   ```sh
   ./mvnw spring-boot:run
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```

## Usage
Once both the backend and frontend are running, open your browser and navigate to:
- **Frontend:** `http://localhost:3000`
- **Backend API:** `http://localhost:8080/api`

## License
This project is licensed under the Faculty of Organizational Sciences in Belgrade.

## Author
**Petar Rašula**


