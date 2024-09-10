
# E-Commerce Database Schema

![alt text](draw-image-export-2024-09-10.png)

### Database Schema

1. **Customers**: Stores customer information.
2. **Products**: Stores product information.
3. **Orders**: Stores order data, which links customers to their purchases.
4. **Cart**: Relates orders to products and manages quantities of purchased products.
5. **Payment**: Stores payment details for each order.

## Database Creation

```sql
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE ecommerce;
USE ecommerce;
```

## Table Structure

### Customers Table
```sql
CREATE TABLE `Customers`(
    `customer-id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `f-name` VARCHAR(50) NOT NULL,
    `l-name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password` VARCHAR(100) NOT NULL,
    `phone-no` VARCHAR(20) NOT NULL
);
```

### Products Table
```sql
CREATE TABLE `Products`(
    `product-id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL UNIQUE,
    `price` INT NOT NULL
);
```

### Orders Table
```sql
CREATE TABLE `Orders`(
    `order-id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `customer-id` INT,
    `amount` INT NOT NULL,
    `order-date` DATE,
    FOREIGN KEY (`customer-id`) REFERENCES `Customers`(`customer-id`) ON DELETE CASCADE
);
```

### Cart Table
```sql
CREATE TABLE `Cart`(
    `order-id` INT NOT NULL,
    `product-id` INT NOT NULL,
    `quantity` INT NOT NULL,
    FOREIGN KEY (`order-id`) REFERENCES `Orders`(`order-id`) ON DELETE CASCADE,
    FOREIGN KEY (`product-id`) REFERENCES `Products`(`product-id`) ON DELETE CASCADE
);
```

### Payment Table
```sql
CREATE TABLE `Payment`(
    `payment-id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `order-id` INT,
    `amount` INT NOT NULL,
    `status` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`order-id`) REFERENCES `Orders`(`order-id`) ON DELETE CASCADE
);
```

## Inserting Data

### Insert Dummy Data into Customers Table
```sql
INSERT INTO `Customers` (`f-name`, `l-name`, `email`, `password`, `phone-no`) VALUES
('John', 'Doe', 'john.doe@example.com', 'password123', '123-456-7890'),
('Jane', 'Smith', 'jane.smith@example.com', 'password456', '234-567-8901'),
('Mike', 'Johnson', 'mike.johnson@example.com', 'password789', '345-678-9012'),
('Emily', 'Davis', 'emily.davis@example.com', 'password101', '456-789-0123'),
('Sarah', 'Williams', 'sarah.williams@example.com', 'password202', '567-890-1234');
```

### Insert Dummy Data into Products Table
```sql
INSERT INTO `Products` (`name`, `price`) VALUES
('Laptop', 1200),
('Smartphone', 800),
('Headphones', 150),
('Book', 20),
('Desk Chair', 100);
```

### Insert Dummy Orders into Orders Table
```sql
INSERT INTO `Orders` (`customer-id`, `amount`, `order-date`) VALUES
(1, 1300, '2024-09-01'),  -- John Doe orders Laptop + Headphones
(2, 800, '2024-09-02'),   -- Jane Smith orders Smartphone
(3, 20, '2024-09-03'),    -- Mike Johnson orders Book
(4, 100, '2024-09-03'),   -- Emily Davis orders Desk Chair
(5, 950, '2024-09-04');   -- Sarah Williams orders Smartphone + Headphones
Insert Dummy Data into Cart Table
```

### Insert Dummy Data into Cart Table (Relating Orders to Products)
```sql
INSERT INTO `Cart` (`order-id`, `product-id`, `quantity`) VALUES
(1, 1, 1),  -- Order 1: 1 Laptop
(1, 3, 1),  -- Order 1: 1 Headphones
(2, 2, 1),  -- Order 2: 1 Smartphone
(3, 4, 1),  -- Order 3: 1 Book
(4, 5, 1),  -- Order 4: 1 Desk Chair
(5, 2, 1),  -- Order 5: 1 Smartphone
(5, 3, 1);  -- Order 5: 1 Headphones
```

### Insert Dummy Data into Payment Table
```sql
INSERT INTO `Payment` (`order-id`, `amount`, `status`) VALUES
(1, 1300, 'Completed'),
(2, 800, 'Completed'),
(3, 20, 'Pending'),
(4, 100, 'Completed'),
(5, 950, 'Completed');
```

## Sample Queries

### Retrieve Products based on price range
```sql
SELECT * FROM `Products`
WHERE `price` BETWEEN 100 AND 1000;
```

### Retrieve Products ordered by Price
```sql
SELECT * FROM `Products`
ORDER BY `price` DESC;
```

### Retrieve Products by Name
```sql
SELECT * FROM `Products`
WHERE `name` LIKE '%Phone%' AND `price` > 500;
```

### Update Customer Details
```sql
UPDATE `Customers`
SET `email` = 'new.email@example.com', `phone-no` = '111-222-3333'
WHERE `customer-id` = 2;
```

### Update Payment Status
```sql
UPDATE `Payment`
SET `status` = 'Completed'
WHERE `order-id` = 3;
```

### Update Quantity
```sql
UPDATE `Cart`
SET `quantity` = 3
WHERE `order-id` = 1 AND `product-id` = 2;
```

### Remove a Customer
```sql
DELETE FROM `Customers`
WHERE `customer-id` = 4;
```

### Delete a Product
```sql
DELETE FROM `Products`
WHERE `product-id` = 3;
```

### Get Customer and their Order Details
```sql
SELECT 
    o.`order-id` AS `Order ID`, 
    c.`f-name` AS `First Name`, 
    c.`l-name` AS `Last Name`, 
    p.`name` AS `Product Name`, 
    cart.`quantity` AS `Quantity`, 
    o.`amount` AS `Total Amount`
FROM 
    `Orders` o
JOIN 
    `Customers` c ON o.`customer-id` = c.`customer-id`
JOIN 
    `Cart` cart ON o.`order-id` = cart.`order-id`
JOIN 
    `Products` p ON cart.`product-id` = p.`product-id`;
```
### Get Revenue within a time period
```sql
SELECT 
    SUM(o.`amount`) AS `Total Revenue`
FROM 
    `Orders` o
WHERE 
    o.`order-date` BETWEEN '2024-09-01' AND '2024-09-03';
```
### Total No of products sold by product name
```sql
SELECT 
    p.`name` AS `Product Name`, 
    SUM(cart.`quantity`) AS `Total Quantity Sold`
FROM 
    `Cart` cart
JOIN 
    `Products` p ON cart.`product-id` = p.`product-id`
GROUP BY 
    p.`name`;
```

## Indexing
```sql
CREATE INDEX idx_orders_customer_id ON `Orders`(`customer-id`);
CREATE INDEX idx_cart_product_id ON `Cart`(`product-id`);
CREATE INDEX idx_products_name ON `Products`(`name`);
```

