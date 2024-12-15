CREATE TYPE user_status AS ENUM ('member', 'admin', 'guest');

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(40),
    last_name VARCHAR(40),
    email VARCHAR(50),
    password VARCHAR(255),
    status user_status DEFAULT 'guest'
);

CREATE TABLE messages(
    text VARCHAR(500) NOT NULL,
    author_id INTEGER NOT NULL,
    sent_date TIMESTAMP NOT NULL,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

