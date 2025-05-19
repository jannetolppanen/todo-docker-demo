CREATE DATABASE IF NOT EXISTS tododb;
USE tododb;

-- Luodaan todos-taulu
CREATE TABLE IF NOT EXISTS todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lisätään testidataa
INSERT INTO todos (task) VALUES ('These are test tasks');
INSERT INTO todos (task) VALUES ('They should show up when the container is created');
INSERT INTO todos (task) VALUES ('Create a new task and see if it gets removed when the container is removed');