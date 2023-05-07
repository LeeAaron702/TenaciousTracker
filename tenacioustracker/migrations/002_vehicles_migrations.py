steps = [
    [
        """
        CREATE TABLE vehicles (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES accounts(id),
            make VARCHAR(50) NOT NULL,
            model VARCHAR(50) NOT NULL,
            year INTEGER NOT NULL,
            vin VARCHAR(17) NOT NULL UNIQUE,
            fuel_type VARCHAR(20),
            color VARCHAR(20),
            modifications TEXT
        );
        """,
        """
        DROP TABLE vehicles;
        """,
    ]
]
