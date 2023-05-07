steps = [
    [
        """
        CREATE TABLE gas_purchases (
            id SERIAL PRIMARY KEY,
            vehicle_id INTEGER REFERENCES vehicles(id),
            purchase_date DATE NOT NULL,
            gallons DECIMAL(8, 2) NOT NULL,
            price DECIMAL(8, 2) NOT NULL,
            location VARCHAR(255) NOT NULL,
            mpg_per_tank DECIMAL(5, 2) NULL,
            odometer_reading DECIMAL(8, 2),
            fuel_grade VARCHAR(20),
            payment_method VARCHAR(20),
            notes TEXT,
            fuel_brand VARCHAR(50)
        );
        """,
        """
        DROP TABLE gas_purchases;
        """,
    ]
]
