-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.

SELECT p.productname, c.CategoryName
FROM Product as p
JOIN category as c ON p.categoryId = c.id


-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.

SELECT o.id, s.CompanyName
FROM [Order] as o
JOIN shipper as s ON o.ShipVia = s.Id
WHERE o.OrderDate < '2012-08-09'


-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.

SELECT p.productname, p.quantityperunit, o.Id
FROM orderdetail AS od
JOIN product AS p ON od.ProductId = p.Id
JOIN [order] as o ON od.OrderId = o.Id
WHERE o.Id = 10251


-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.id as OrderId, c.companyname as "Customer's Company Name", e.lastname as "Employee's Last Name"
FROM [Order] as o
JOIN Customer as c ON o.CustomerId = c.Id
JOIN Employee as e ON o.EmployeeId = e.Id