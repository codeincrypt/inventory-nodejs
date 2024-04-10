-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2024 at 05:48 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mobile` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `name`, `mobile`, `email`, `password`, `status`) VALUES
(1, 'Admin', '9523510235', 'admin@gmail.com', '$2b$10$HaUZR9x6VVEjrPiXTFWvO.utaBbV2EihS16QUwOJlMldG514HOS1.', 1);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `order_id`, `product_id`, `quantity`, `price`) VALUES
(1, 1, 1, 1, 90000),
(2, 1, 5, 1, 24500),
(3, 2, 1, 1, 90000),
(4, 12, 1, 1, 90000),
(5, 12, 5, 1, 24500),
(6, 13, 1, 1, 90000),
(7, 13, 5, 1, 24500),
(8, 14, 2, 1, 110000),
(9, 14, 4, 1, 60000);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `status` int(11) NOT NULL,
  `orderdate` varchar(30) NOT NULL,
  `doc` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userid`, `total_price`, `status`, `orderdate`, `doc`) VALUES
(1, 5, 114500, 1, '10-10-2024', '2024-04-10 14:42:54'),
(2, 1, 90000, 2, '10-10-2024', '2024-04-10 14:43:15'),
(12, 5, 114500, 0, '10-04-2024', '2024-04-10 15:40:44'),
(13, 1, 114500, 0, '10-04-2024', '2024-04-10 15:40:46'),
(14, 5, 170000, 0, '10-04-2024', '2024-04-10 15:14:20');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_desc` text NOT NULL,
  `price` float NOT NULL,
  `available_quantity` varchar(10) NOT NULL,
  `createdAt` varchar(30) NOT NULL,
  `doc` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `product_name`, `product_desc`, `price`, `available_quantity`, `createdAt`, `doc`) VALUES
(1, 'iPhone 14', 'iPhone 14 - RAM 8GB - STORAGE - 256GB', 90000, '3', '10-04-2024 05:36 pm', '2024-04-10 15:14:02'),
(2, 'iPhone 15', 'iPhone 15 - RAM 8GB - STORAGE - 256GB', 110000, '2', '10-04-2024 05:36 pm', '2024-04-10 15:14:20'),
(3, 'Samsung s23', 'Samsung s23 - RAM 8GB - STORAGE - 256GB', 75000, '3', '10-04-2024 05:49 pm', '2024-04-10 12:23:32'),
(4, 'iPhone 13', 'iPhone 13 - RAM 8GB - STORAGE - 256GB', 60000, '2', '10-04-2024 05:50 pm', '2024-04-10 15:14:20'),
(5, 'Mi Note 9', 'Mi Note 9 - RAM 8GB - STORAGE - 256GB', 24500, '6', '10-04-2024 06:27 pm', '2024-04-10 15:14:02'),
(6, 'vivo v27', 'Vivo v27 - RAM 12GB - STORAGE - 512GB', 27000, '0', '10-04-2024 06:27 pm', '2024-04-10 15:48:23');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `customer_id` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` varchar(50) NOT NULL,
  `doc` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `customer_id`, `name`, `mobile`, `email`, `password`, `status`, `createdAt`, `doc`) VALUES
(1, '', 'Kartik Kumar Swarnkar', '9523510235', 'kartikkr555@gmail.com', '$2b$10$HaUZR9x6VVEjrPiXTFWvO.utaBbV2EihS16QUwOJlMldG514HOS1.', 1, '', '2024-04-10 13:35:30'),
(5, '', 'Kartik Kumar Swarnkar', '9523510239', 'kartikkr555@gmail.cop', '$2b$10$iRKV0wxWkA0rqBb0r.rEOOAgPV54P5gSwgwBjvggnJRsOcbTxpJfy', 1, '', '2024-04-10 13:35:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
