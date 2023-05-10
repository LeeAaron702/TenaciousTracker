# Tenacious Tracker

![TenaciousTracker GIF](https://github.com/LeeAaron702/TenaciousTracker/assets/112150883/e85fa3f9-3f2e-416e-b4d4-f825eb6ffbf3)

A web-based application that helps users manage and track the maintenance, fuel consumption, and expenses of their vehicles.

## Features

- User authentication and profile management
- Add, edit, and delete vehicles
- Add, edit, and delete gas and service records
- Visualize fuel consumption and maintenance cost distribution
- Display fuel efficiency in a line graph
- View gas and service records on a map
- Dashboard with vehicle-specific metrics

## Database

The Tenacious Tracker application relies on a backend database to store user information, vehicles, and their associated gas and service records. The database schema consists of three main tables:

- users: Stores user data, such as username, email, and password.
- vehicles: Stores vehicle information, such as make, model, and user ID as a foreign key.
- gas_records: Stores gas records for each vehicle, including fuel amount, cost, and vehicle ID as a foreign key.
- services: Stores service records for each vehicle, including service type, cost, and vehicle ID as a foreign key.

### Database Schema

Sure, here's the schema data organized in the tables:

#### users

| Column   | Type   | Description            |
| -------- | ------ | ---------------------- |
| id       | SERIAL | Primary key            |
| username | TEXT   | User's username        |
| email    | TEXT   | User's email address   |
| password | TEXT   | User's hashed password |

#### vehicles

| Column  | Type    | Description                   |
| ------- | ------- | ----------------------------- |
| id      | SERIAL  | Primary key                   |
| user_id | INTEGER | Foreign key referencing users |
| make    | TEXT    | Vehicle's make                |
| model   | TEXT    | Vehicle's model               |

#### gas_records

| Column     | Type    | Description                            |
| ---------- | ------- | -------------------------------------- |
| id         | SERIAL  | Primary key                            |
| vehicle_id | INTEGER | Foreign key referencing vehicles       |
| amount     | NUMERIC | Amount of fuel purchased               |
| cost       | NUMERIC | Cost of the fuel purchase              |
| location   | TEXT    | Location of the fuel purchase (string) |

#### services

| Column       | Type    | Description                            |
| ------------ | ------- | -------------------------------------- |
| id           | SERIAL  | Primary key                            |
| vehicle_id   | INTEGER | Foreign key referencing vehicles       |
| service_type | TEXT    | Type of the service performed (string) |
| cost         | NUMERIC | Cost of the service                    |
| location     | TEXT    | Location of the service (string)       |

## API EndPoints

### Authentication

- POST /token: Login and obtain a JWT token.
- DELETE /token: Logout and invalidate the JWT token.

### Account

- POST /api/signup: Create a new user account.
- GET /api/accounts/{username}: Get account information for the specified username.

### Vehicles

- GET /api/vehicles: Get all vehicles for the authenticated user.
- POST /api/vehicle: Create a new vehicle.
- GET /api/vehicle/{vehicle_id}: Get vehicle information for the specified vehicle ID.
- PUT /api/vehicle/{vehicle_id}: Update vehicle information for the specified vehicle ID.
- DELETE /api/vehicle/{vehicle_id}: Delete the specified vehicle.

### Gas Records

- GET /api/gas_records: Get all gas records for the authenticated user.
- POST /api/gas_record: Create a new gas record.
- GET /api/gas_record/{gas_record_id}: Get gas record information for the specified gas record ID.
- PUT /api/gas_record/{gas_record_id}: Update gas record information for the specified gas record ID.
- DELETE /api/gas_record/{gas_record_id}: Delete the specified gas record.
- GET /api/vehicle/{vehicle_id}/gas_records: Get gas records for the specified vehicle ID.

### Services

- GET /api/services: Get all services for the authenticated user.
- POST /api/service: Create a new service record.
- GET /api/service/{service_id}: Get service record information for the specified service ID.
- PUT /api/service/{service_id}: Update service record information for the specified service ID.
- DELETE /api/service/{service_id}: Delete the specified service record.
- GET /api/vehicle/{vehicle_id}/services: Get service records for the specified vehicle ID.

## Usage

1. Register for an account and log in.
2. Add a new vehicle by clicking the "New Vehicle" tab and filling out the form.
3. Select the vehicle from the list of tabs to view and manage its gas and service records.
4. Add, edit, or delete gas and service records as needed.
5. Visualize fuel consumption, maintenance cost distribution, and fuel efficiency in the provided graphs and charts.
6. View the locations of gas and service records on a map.
   7 Check vehicle-specific metrics in the dashboard.

## Components

- Dashboard: Main component that contains all the other components and handles fetching of data.
- VehicleList: Component that displays a list of vehicles.
- GasRecordList: Component that displays a list of gas records.
- VehicleForm: Component that allows the user to add a new vehicle.
- MetricsContainer: Component that displays vehicle-specific metrics.
- ServiceList: Component that displays a list of service records.
- FuelLogVisualization: Component that visualizes fuel consumption.
- MaintenanceCostDistribution: Component that visualizes maintenance cost distribution by service type.
- RecordsMap: Component that displays gas and service records on a map.
- FuelEfficiencyLineGraph: Component that displays fuel efficiency in a line graph.

## Installation and Setup

1. Clone the repository:

```
git clone https://github.com/yourusername/tenacious-tracker.git
```

Navigate to the project folder:

```
cd tenacious-tracker
```

Install the required dependencies:

```
npm install
```

Start the development server:

```
npm start
```

Open your browser and navigate to http://localhost:3000 to access the application.

## Fork the repository.

Create a new branch for your changes.
Make your changes and commit them with descriptive commit messages.
Push your changes to your fork.
Open a pull request to merge your changes into the main project.
Please ensure that your code is clean, well-documented, and has been tested before submitting a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
