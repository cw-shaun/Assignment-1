# E-commerce Database Schema

## SQL Commands

### Drop and Create Database
```sql
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;
Create Tables
Customers
sql

CREATE TABLE Customers(
    customer_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(50) NOT NULL,
    l_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone_no VARCHAR(20) NOT NULL
);
Products
sql

CREATE TABLE Products(
    product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price INT NOT NULL
);
Orders
sql

CREATE TABLE Orders(
    order_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    amount INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE
);
Cart
sql

CREATE TABLE Cart(
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES Products(product_id) ON DELETE CASCADE
);
Payment
sql

CREATE TABLE Payment(
    payment_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
);
Insert Data
Insert Dummy Data into Customers Table
sql

INSERT INTO Customers (f_name, l_name, email, password, phone_no) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', '123-456-7890'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456', '234-567-8901'),
('Mike', 'Johnson', 'mike.johnson@example.com', 'password789', '345-678-9012'),
('Emily', 'Davis', 'emily.davis@example.com', 'password101', '456-789-0123'),
('Sarah', 'Williams', 'sarah.williams@example.com', 'password202', '567-890-1234');
Insert Dummy Data into Products Table
sql

INSERT INTO Products (name, price) VALUES
('Laptop', 1200),
('Smartphone', 800),
('Headphones', 150),
('Book', 20),
('Desk Chair', 100);
Insert Dummy Orders into Orders Table
sql

INSERT INTO Orders (customer_id, amount) VALUES
(1, 1300),  -- John Doe orders Laptop + Headphones
(2, 800),   -- Jane Smith orders Smartphone
(3, 20),    -- Mike Johnson orders Book
(4, 100),   -- Emily Davis orders Desk Chair
(5, 950);   -- Sarah Williams orders Smartphone + Headphones
Insert Dummy Data into Cart Table
sql

INSERT INTO Cart (order_id, product_id, quantity) VALUES
(1, 1, 1),  -- Order 1: 1 Laptop
(1, 3, 1),  -- Order 1: 1 Headphones
(2, 2, 1),  -- Order 2: 1 Smartphone
(3, 4, 1),  -- Order 3: 1 Book
(4, 5, 1),  -- Order 4: 1 Desk Chair
(5, 2, 1),  -- Order 5: 1 Smartphone
(5, 3, 1);  -- Order 5: 1 Headphones
Insert Dummy Data into Payment Table
sql

INSERT INTO Payment (order_id, amount, status) VALUES
(1, 1300, 'Completed'),
(2, 800, 'Completed'),
(3, 20, 'Pending'),
(4, 100, 'Completed'),
(5, 950, 'Completed');
Retrieve Data
Retrieve Products Based on Price Range
sql

SELECT * FROM Products
WHERE price BETWEEN 100 AND 1000;
Retrieve Products Ordered by Price
sql

SELECT * FROM Products
ORDER BY price DESC;
Retrieve Products by Name
sql

SELECT * FROM Products
WHERE name LIKE '%Phone%' AND price > 500;
Update Data
Updating Customer Details
sql

UPDATE Customers
SET email = 'new.email@example.com', phone_no = '111-222-3333'
WHERE customer_id = 2;
Update Payment Status
sql

UPDATE Payment
SET status = 'Completed'
WHERE order_id = 3;
Update Quantity
sql

UPDATE Cart
SET quantity = 3
WHERE order_id = 1 AND product_id = 2;
Delete Data
Removing a Customer
sql

DELETE FROM Customers
WHERE customer_id = 4;
Deleting a Product
sql

DELETE FROM Products
WHERE product_id = 3;
Complex Queries
Get Customer and Their Order Details
sql

SELECT 
    o.order_id AS Order_ID, 
    c.f_name AS First_Name, 
    c.l_name AS Last_Name, 
    p.name AS Product_Name, 
    cart.quantity AS Quantity, 
    o.amount AS Total_Amount
FROM 
    Orders o
JOIN 
    Customers c ON o.customer_id = c.customer_id
JOIN 
    Cart cart ON o.order_id = cart.order_id
JOIN 
    Products p ON cart.product_id = p.product_id;
Total Number of Products Sold by Product Name
sql

SELECT 
    p.name AS Product_Name, 
    SUM(cart.quantity) AS Total_Quantity_Sold
FROM 
    Cart cart
JOIN 
    Products p ON cart.product_id = p.product_id
GROUP BY 
    p.name;
Indexing
sql

CREATE INDEX idx_orders_customer_id ON Orders(customer_id);
CREATE INDEX idx_cart_product_id ON Cart(product_id);
CREATE INDEX idx_products_name ON Products(name);
