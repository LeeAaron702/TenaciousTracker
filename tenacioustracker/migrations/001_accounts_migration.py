steps = [
    [
        """
        CREATE TABLE accounts (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(30) NOT NULL UNIQUE,
            hashed_password TEXT NOT NULL
        );
        """,
        """
        DROP TABLE accounts;
        """,
    ]
]
