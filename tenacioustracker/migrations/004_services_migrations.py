steps = [
    [
        """
        CREATE TABLE services (
            service_id SERIAL PRIMARY KEY,
            vehicle_id INTEGER REFERENCES vehicles(id),
            service_date DATE NOT NULL,
            service_type VARCHAR(50) NOT NULL,
            service_description TEXT,
            service_cost DECIMAL(8, 2) NOT NULL,
            service_shop_name VARCHAR(255) NOT NULL,
            service_shop_location VARCHAR(255),
            service_mileage DECIMAL(8, 2),
            parts_used VARCHAR(255),
            warranty BOOLEAN,
            notes TEXT
            );
        """,
        """
        DROP TABLE services;
        """,
    ]
]
