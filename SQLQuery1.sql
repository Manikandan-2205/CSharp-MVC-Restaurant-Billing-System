Create Table Orders(
OrderId int,
OrderNumber Varchar(250),
OrderDate datetime,
CustomerId int,
PaymentTypeId int);

drop table Orders;

-- Drop the OrderDetails table
DROP TABLE [dbo].[OrderDetails];

-- Drop the Orders table
DROP TABLE [dbo].[Orders];


CREATE TABLE [dbo].[Orders] (
    [OrderId]       INT           Primary key,
	[PaymentTypeId] INT           NOT NULL,
    [CustomerId]    INT           NOT NULL,
    [OrderNumber]   VARCHAR (250) NOT NULL,
    [OrderDate]     DATETIME      NOT NULL,
	[FindTotal]		DECIMAL(18,2) NOT NULL    
);

CREATE TABLE [dbo].[OrderDetails] (
    [OrderDetailId] INT             NOT NULL,
    [OrderId]       INT             NOT NULL,
    [ItemId]        INT             NOT NULL,
    [UnitPrice]     DECIMAL (18, 2) NOT NULL,
    [Discount]      DECIMAL (18, 2) NOT NULL,
    PRIMARY KEY CLUSTERED ([OrderDetailId] ASC),
    FOREIGN KEY ([OrderId]) REFERENCES [dbo].[Orders] ([OrderId])
);


drop table Transactions;

CREATE TABLE Transactions(
TransactionId int Primary key,
ItemId int Not Null,
Quantity decimal(18,2) Not Null,
TransactionDate datetime Not Null,
TypeId int Null,
);

select * from Items;

drop table Transactionis;
truncate table Transactions;
INSERT INTO Transactions (TransactionId, ItemId, Quantity, TransactionDate, TypeId)
VALUES
  (1, 1, 1499.25, '2024-01-24', 1),
  (2, 2, 2249.25, '2024-01-24', 1),
  (3, 3, 2999.25, '2024-01-24', 1),
  (4, 4, 3749.25, '2024-01-24', 2),
  (5, 5, 1949.25, '2024-01-24', 2);

drop table Orders;
truncate table Orders;
  INSERT INTO orders (OrderId, PaymentTypeId, CustomerId, OrderNumber, OrderDate, FindTotal)
VALUES
  (1, 1, 201, 'ORD12345', '2024-01-24', 1500.75),
  (2, 1, 202, 'ORD23456', '2024-01-25', 2200.50),
  (3, 1, 203, 'ORD34567', '2024-01-26', 3000.25),
  (4, 2, 204, 'ORD45678', '2024-01-27', 3700.99),
  (5, 2, 205, 'ORD56789', '2024-01-28', 1900.25);

  select * from Orders;

  -- Insert records into OrderDetails table
INSERT INTO OrderDetails (OrderDetailId, OrderId, ItemId, UnitPrice, Discount)
VALUES
  (1, 1, 101, 20.00, 5.00),
  (2, 1, 102, 15.50, 2.50),
  (3, 2, 103, 25.75, 7.20),
  (4, 3, 104, 30.40, 4.80),
  (5, 3, 105, 18.90, 3.75);


  select * from OrderDetails;
  select * from Orders;
  select * from Transactions;


  truncate table Orders;
  truncate table OrderDetails;
  truncate table Transactions;

  drop table OrderDetails;

  drop table Orders;
