Here is the English version of your README:

---

# Radix-Server

**Radix-Server** is a technical challenge project for Radix. The solution aims to handle real-time sensor data for 2,000 oil and gas equipment pieces while managing data gaps through CSV uploads.

## Table of Contents

- [Requirements](#requirements)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Contact](#contact)
- [License](#license)

---

## Requirements

The project requirements include:

1. **Real-time Data:** Receive JSON payloads from equipment sensors and store the data in a database.

   - Example payload:
     ```json
     {
       "equipmentId": "EQ-12495",
       "timestamp": "2023-02-15T01:30:00.000-05:00",
       "value": 78.42
     }
     ```
   - Fields:
     - `equipmentId`: Unique identifier of the equipment.
     - `timestamp`: Date and time of the reading with timezone.
     - `value`: Sensor value with two decimal precision.

2. **CSV Data Uploads:** Handle missing data via CSV file uploads. Example CSV format:
   | equipmentId | timestamp | value |
   |-------------|-------------------------------|-------|
   | EQ-12495 | 2023-02-12T01:30:00.000-05:00 | 78.8 |

3. **Visualization:** A frontend that displays average sensor values over different timeframes (24 hours, 48 hours, 1 week, 1 month) using charts.

4. **Documentation:** Comprehensive documentation of the API.

### Bonus Implemented:

- **Authentication System:** Integrated JWT and X-API-KEY for securing endpoints.

---

## Features

- **Real-Time Data Handling**: Efficiently processes JSON payloads from equipment sensors.
- **CSV Upload**: Parses CSV files for filling data gaps and integrates them into the database.
- **Authentication**: Ensures secure access with JWT tokens and API keys for specific equipment.
- **Dockerized Environment**: Simplifies setup with Docker Compose.

---

## Technologies Used

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (managed using Prisma ORM)
- **Containerization**: Docker, Docker Compose

---

## Installation and Setup

### Prerequisites

- Node.js installed on your system.
- Docker and Docker Compose.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/PatrickSchifter/radix-server
   cd radix-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the PostgreSQL container using Docker Compose:

   ```bash
   docker-compose up -d
   ```

4. Push the database schema with Prisma:

   ```bash
   npx prisma db push
   ```

5. Run the application:
   - In development mode:
     ```bash
     npm run dev
     ```
   - Build and run:
     ```bash
     npm run build
     npm run start
     ```

---

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```dotenv
# Database connection settings
DB_USER=radix_user
DB_PASSWORD=radix_password
DB_NAME=radix
DB_HOST=localhost
DB_PORT=5432

# Prisma settings
DATABASE_URL=postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public
SECRET_JWT=something

# Server configuration
PORT=3030
NODE_ENV=development

# Company configuration
COMPANY_NAME=Radix
```

---

## API Documentation

Access the API documentation at:

```
BASE_URL/api-docs/
```

Replace `BASE_URL` with `http://localhost:3030` for local development.

---

## Usage

### Authentication

1. **Register a User**:
   - Endpoint: `POST /api/auth/register`
2. **Login**:
   - Endpoint: `POST /api/auth/login`
   - Returns a JWT token.
3. **Create Equipment**:
   - Endpoint: `POST /api/equipment`
   - Returns an API key for the equipment.

Use the API key with `POST /api/sensor-reading` for sending sensor data.

For detailed information on the remaining endpoints, refer to the [API Documentation](#api-documentation).

---

## Contact

If you have any questions, feel free to reach out:

- **Email**: [schiftercorp@outlook.com](mailto:schiftercorp@outlook.com)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
