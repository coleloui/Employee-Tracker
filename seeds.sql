USE employee_db; 

INSERT INTO department (name) VALUES (Owner)
INSERT INTO department (name) VALUES (Sales)
INSERT INTO department (name) VALUES (Framing)
INSERT INTO department (name) VALUES (Office)

INSERT INTO role (title, salary, department_id) VALUES (Bidder, 75.50, 1)
INSERT INTO role (title, salary, department_id) VALUES (Bidder, 50.00, 2)
INSERT INTO role (title, salary, department_id) VALUES (Foreman, 22.50, 3)
INSERT INTO role (title, salary, department_id) VALUES (Carpenter, 18.00, 3)
INSERT INTO role (title, salary, department_id) VALUES (Apprentice, 13.25, 3)
INSERT INTO role (title, salary, department_id) VALUES (Office Manager, 19.25, 4)
INSERT INTO role (title, salary, department_id) VALUES (Mail Clerk, 14.00, 4)

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Joe, Steel, 1)
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Ed, Blank, 2, 1)
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Donna, Stewart, 6, 1)
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (August, Rush, 3, 2)
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Pete, Stonard, 3, 2)
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Jose, Edwardo, 3, 2)
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Tom, Giordanno)
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (Tom, Giordanno)