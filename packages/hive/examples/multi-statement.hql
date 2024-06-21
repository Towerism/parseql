CREATE TABLE IF NOT EXISTS my_table (
  id INT,
  name STRING
);

INSERT INTO my_table (id, name)
VALUES
  (1, 'Alice'),
  (2, 'Bob'),
  (3, 'Charlie');

SELECT * FROM my_table;
