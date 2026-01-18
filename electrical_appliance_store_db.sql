-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.4.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for electrical_appliance_store_db
CREATE DATABASE IF NOT EXISTS `electrical_appliance_store_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `electrical_appliance_store_db`;

-- Dumping structure for table electrical_appliance_store_db.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.categories: ~6 rows (approximately)
INSERT INTO `categories` (`category_id`, `category_name`) VALUES
	(1, 'Televisions'),
	(2, 'Receivers'),
	(3, 'Refrigerators'),
	(4, 'Washing Machines'),
	(5, 'Air Conditioners'),
	(6, 'Ovens');

-- Dumping structure for table electrical_appliance_store_db.clients
CREATE TABLE IF NOT EXISTS `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `address` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.clients: ~3 rows (approximately)
INSERT INTO `clients` (`client_id`, `role_id`, `username`, `first_name`, `last_name`, `phone_number`, `email`, `password`, `address`, `status`, `created_at`, `updated_at`) VALUES
	(1, 2, 'Rashad Aridi', 'Rashad', 'Aridi', '+96103938128', 'rashadaridi@gmail.com', '$2b$10$mb4CBQlAVNJxUCR9EYpn6.VXB6eWyJuHFFoemn/2Ewge6/XNF8UR2', 'BAissour', 'active', '2025-08-12 15:41:36', NULL),
	(2, 2, 'Rabih Aridi', 'Rabih', 'aridi', '+96176590558', 'rabiharidi@gmail.com', '$2b$10$pCoeR/kyV1W8ZHCFEl.YfeDEaALfXavFVP7/F1RlT3H3IrYkv5ebS', 'aley', 'active', '2025-08-12 15:44:36', NULL),
	(3, 2, 'Ahmadd', 'Ahmadd', 'Husseini', '+96103938123', 'ahmad@gmail.com', '$2b$10$xngl5GCboCy3o/n.fH6qweW2Bg9qW86Bwpm81Ko/57YSNd0it.BhG', 'BAissour', 'active', '2026-01-18 16:45:01', NULL);

-- Dumping structure for table electrical_appliance_store_db.contact_requests
CREATE TABLE IF NOT EXISTS `contact_requests` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`request_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `contact_requests_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.contact_requests: ~0 rows (approximately)

-- Dumping structure for table electrical_appliance_store_db.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `order_status_id` int(11) NOT NULL,
  `order_date` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`order_id`),
  KEY `client_id` (`client_id`),
  KEY `order_status_id` (`order_status_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`order_status_id`) REFERENCES `order_statuses` (`order_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.orders: ~0 rows (approximately)

-- Dumping structure for table electrical_appliance_store_db.order_items
CREATE TABLE IF NOT EXISTS `order_items` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.order_items: ~0 rows (approximately)

-- Dumping structure for table electrical_appliance_store_db.order_statuses
CREATE TABLE IF NOT EXISTS `order_statuses` (
  `order_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_status_name` varchar(50) NOT NULL,
  PRIMARY KEY (`order_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.order_statuses: ~2 rows (approximately)
INSERT INTO `order_statuses` (`order_status_id`, `order_status_name`) VALUES
	(1, 'Completed'),
	(2, 'Cancelled');

-- Dumping structure for table electrical_appliance_store_db.payments
CREATE TABLE IF NOT EXISTS `payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paid_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  KEY `status_id` (`status_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `payment_statuses` (`status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.payments: ~0 rows (approximately)

-- Dumping structure for table electrical_appliance_store_db.payment_statuses
CREATE TABLE IF NOT EXISTS `payment_statuses` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(50) NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.payment_statuses: ~1 rows (approximately)
INSERT INTO `payment_statuses` (`status_id`, `status_name`) VALUES
	(1, 'Payment Modified');

-- Dumping structure for table electrical_appliance_store_db.products
CREATE TABLE IF NOT EXISTS `products` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `availability_status_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int(11) NOT NULL,
  `features` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `availability_status_id` (`availability_status_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`availability_status_id`) REFERENCES `product_statuses` (`availability_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.products: ~31 rows (approximately)
INSERT INTO `products` (`product_id`, `category_id`, `availability_status_id`, `name`, `price`, `stock_quantity`, `features`, `created_at`) VALUES
	(1, 1, 1, 'Elements LED UHD 4K Smart TV', 329.50, 10, '43" display, 4K resolution, Roku built-in', '2025-08-12 15:40:19'),
	(2, 1, 1, 'Hisense 4K UHD Smart TV', 399.00, 8, '50" display, 4K UHD, Dolby Vision, Android TV', '2025-08-12 15:40:19'),
	(3, 1, 1, 'Hisense MiniLED ULED TV', 699.30, 6, '55" MiniLED, ULED technology, Dolby Atmos, Google TV', '2025-08-12 15:40:19'),
	(4, 1, 1, 'KB Elements FHD Smart Android TV', 249.00, 4, '40" Full HD, Android TV, Wi-Fi, HDMI x2', '2025-08-12 15:40:19'),
	(5, 1, 1, 'Samsung FHD Smart TV', 349.10, 3, '43" Full HD, Tizen OS, Smart Hub, 2 HDMI ports', '2025-08-12 15:40:19'),
	(6, 1, 1, 'Samsung QLED 4K Smart TV', 850.10, 15, '55" QLED, Quantum HDR, Bixby Voice, 4K UHD', '2025-08-12 15:40:19'),
	(7, 1, 1, 'Xiaomi P1 4K UHD Smart TV', 449.99, 5, '50" 4K UHD, Android TV, HDR10+, Google Assistant', '2025-08-12 15:40:19'),
	(8, 2, 1, 'CLASS HD-15000X PLUS', 45.00, 15, 'Full HD, IPTV support, USB recording, H.265 decoding', '2025-08-12 15:40:19'),
	(9, 2, 1, 'MediaStar MS-MINI-FOREVER', 40.00, 10, 'H.265 support, Forever server, YouTube, compact size', '2025-08-12 15:40:19'),
	(10, 2, 1, 'STARSAT-90000 EXTREME', 95.00, 10, '4K support, Extreme server, built-in Wi-Fi, USB 3.0', '2025-08-12 15:40:19'),
	(11, 2, 1, 'Tiger One Billion V1 PRO', 110.00, 10, '4K UHD, Forever server, IPTV apps, HDMI output', '2025-08-12 15:40:19'),
	(12, 2, 1, 'Tiger T40 Forever', 35.00, 10, 'Full HD, Forever server, USB media playback, compact design', '2025-08-12 15:40:19'),
	(13, 3, 1, 'Avanti 22 - Top Freezer', 620.00, 10, '7.4 cu. ft., adjustable glass shelves, reversible door', '2025-08-12 15:40:19'),
	(14, 3, 1, 'Fisher & Paykel Series French Door', 2875.00, 13, '20.1 cu. ft., ActiveSmart technology, ice maker, stainless steel', '2025-08-12 15:40:19'),
	(15, 3, 1, 'Frigidaire Professional Counter-Depth', 1990.00, 5, '22.6 cu. ft., TwinTech cooling, Smudge-Proof finish, LED lighting', '2025-08-12 15:40:19'),
	(16, 3, 1, 'LG 33 - French Door', 1780.00, 7, '25 cu. ft., Door-in-Door, smart cooling, Wi-Fi enabled', '2025-08-12 15:40:19'),
	(17, 3, 1, 'Whirlpool Bottom-Freezer', 1120.00, 8, '22 cu. ft., Accu-Chill, LED lighting, fingerprint resistant finish', '2025-08-12 15:40:19'),
	(18, 4, 1, 'BOSCH Washer EcoSilence Drive', 1590.00, 7, '8 kg capacity, EcoSilence motor, AntiVibration design, front load', '2025-08-12 15:40:19'),
	(19, 4, 1, 'HISENSE Washer Front Load Inverter', 1090.00, 13, '8 kg capacity, inverter motor, steam wash, front load', '2025-08-12 15:40:19'),
	(20, 4, 1, 'SAMSUNG Washer Front Load Inox', 1870.00, 8, '9 kg capacity, Digital Inverter, EcoBubble, front load', '2025-08-12 15:40:19'),
	(21, 4, 1, 'TCL Washer Font Load INVERTER', 980.00, 10, '7 kg capacity, inverter technology, 16 programs, LED display', '2025-08-12 15:40:19'),
	(22, 4, 1, 'TCL Washer Top Load', 790.00, 10, '8 kg capacity, top load, fuzzy logic, soft-close lid', '2025-08-12 15:40:19'),
	(23, 5, 1, 'GREE Air Conditioner Split', 1590.00, 4, '1.5 Ton, Turbo cooling, Gold Fin, energy-saving mode', '2025-08-12 15:40:19'),
	(24, 5, 1, 'SAMSUNG Air Conditioners Split', 1850.00, 6, '1.5 Ton, Digital Inverter, Fast Cooling, Anti-bacterial filter', '2025-08-12 15:40:19'),
	(25, 5, 1, 'TCL Air Condition Split Inverter', 1420.00, 14, '1.5 Ton, Inverter compressor, auto restart, low noise operation', '2025-08-12 15:40:19'),
	(26, 5, 1, 'TCL Air Conditioner Split ELITE', 1650.00, 16, '2 Ton, ELITE series, Fast Cooling, Eco Mode, R410a refrigerant', '2025-08-12 15:40:19'),
	(27, 6, 1, 'BOSCH Oven Gas Electric Inox Oven', 1620.00, 4, '60 cm, dual fuel (gas + electric), stainless steel, multi-function oven', '2025-08-12 15:40:19'),
	(28, 6, 1, 'Cecotec Bolero Hexa Oven', 590.00, 10, '46 L capacity, convection function, LED display, 12 modes', '2025-08-12 15:40:19'),
	(29, 6, 1, 'ELBA Oven Electric Black', 810.00, 12, '60 cm, electric oven, black finish, fan-assisted, timer', '2025-08-12 15:40:19'),
	(30, 6, 1, 'GORENJE Oven  Gas Inox', 940.00, 5, 'Free-standing gas oven, stainless steel, double glass door, auto ignition', '2025-08-12 15:40:19'),
	(31, 6, 1, 'Midea Gaz Oven', 730.00, 6, 'Freestanding gas oven, 5 functions, mechanical timer, interior light', '2025-08-12 15:40:19');

-- Dumping structure for table electrical_appliance_store_db.product_images
CREATE TABLE IF NOT EXISTS `product_images` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `image_url` text NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.product_images: ~59 rows (approximately)
INSERT INTO `product_images` (`image_id`, `product_id`, `image_url`) VALUES
	(1, 1, '/products/Televisions/Elements-75 LED UHD 4K Smart TV-1.webp'),
	(2, 1, '/products/Televisions/Elements-75 LED UHD 4K Smart TV-2.webp'),
	(3, 1, '/products/Televisions/Elements-75 LED UHD 4K Smart TV-3.webp'),
	(4, 2, '/products/Televisions/Hisense 43A61H 43 inch 4K UHD Smart TV-1.webp'),
	(5, 2, '/products/Televisions/Hisense 43A61H 43 inch 4K UHD Smart TV-2.webp'),
	(6, 3, '/products/Televisions/Hisense 55U8HQ 55 MiniLED ULED TV-1.webp'),
	(7, 3, '/products/Televisions/Hisense 55U8HQ 55 MiniLED ULED TV-2.webp'),
	(8, 4, '/products/Televisions/KB Elements ELT24DE14S 24 FHD Smart Android TV-1.webp'),
	(9, 4, '/products/Televisions/KB Elements ELT24DE14S 24 FHD Smart Android TV-2.webp'),
	(10, 4, '/products/Televisions/KB Elements ELT24DE14S 24 FHD Smart Android TV-3.webp'),
	(11, 5, '/products/Televisions/Samsung 43 inch FHD Smart TV T5300-1.webp'),
	(12, 5, '/products/Televisions/Samsung 43 inch FHD Smart TV T5300-2.webp'),
	(13, 6, '/products/Televisions/Samsung 65 QLED 4K Smart TV Q80D-1.webp'),
	(14, 6, '/products/Televisions/Samsung 65 QLED 4K Smart TV Q80D-2.webp'),
	(15, 7, '/products/Televisions/Xiaomi P1 55 4K UHD Smart TV-1.webp'),
	(16, 7, '/products/Televisions/Xiaomi P1 55 4K UHD Smart TV-2.webp'),
	(17, 8, '/products/Receivers/CLASS HD-15000X PLUS.webp'),
	(18, 9, '/products/Receivers/MediaStar MS-MINI-FOREVER-1.png'),
	(19, 9, '/products/Receivers/Mediastar-MS-Mini FOREVER-2.jpg'),
	(20, 10, '/products/Receivers/STARSAT-90000 EXTREME-1.jpg'),
	(21, 10, '/products/Receivers/STARSAT-90000 EXTREME-2.png'),
	(22, 11, '/products/Receivers/Tiger One Billion V1 PRO-1.jpeg'),
	(23, 11, '/products/Receivers/Tiger One Billion V1 PRO-2.webp'),
	(24, 12, '/products/Receivers/Tiger T40 Forever 2.4G 5G Satellite Receiver-1.jpeg'),
	(25, 12, '/products/Receivers/Tiger T40 Forever 2.4G 5G Satellite Receiver-2.png'),
	(26, 13, '/products/Refrigirators/Avanti 22 - Top Freezer Refrigerator-1.avif'),
	(27, 13, '/products/Refrigirators/Avanti 22 - Top Freezer Refrigerator-2.avif'),
	(28, 14, '/products/Refrigirators/Fisher & Paykel Series 7 32 in French Door Refrigerator-1.avif'),
	(29, 14, '/products/Refrigirators/Fisher & Paykel Series 7 32 in French Door Refrigerator-2.avif'),
	(30, 15, '/products/Refrigirators/Frigidaire Professional 33 in Counter-Depth Refrigerator-1.avif'),
	(31, 15, '/products/Refrigirators/Frigidaire Professional 33 in Counter-Depth Refrigerator-2.avif'),
	(32, 16, '/products/Refrigirators/LG 33 in - French Door Refrigerator-1.avif'),
	(33, 16, '/products/Refrigirators/LG 33 in - French Door Refrigerator-2.avif'),
	(34, 17, '/products/Refrigirators/Whirlpool 33 in Bottom-Freezer Refrigerator-1.avif'),
	(35, 17, '/products/Refrigirators/Whirlpool 33 in Bottom-Freezer Refrigerator-2.avif'),
	(36, 18, '/products/Washing machines/BOSCH Washer  EcoSilence Drive -1.webp'),
	(37, 18, '/products/Washing machines/BOSCH Washer  EcoSilence Drive -2.webp'),
	(38, 19, '/products/Washing machines/HISENSE Washer Front Load  Inverter-1.webp'),
	(39, 19, '/products/Washing machines/HISENSE Washer Front Load  Inverter-2.webp'),
	(40, 20, '/products/Washing machines/SAMSUNG Washer Front Load Inox-1.webp'),
	(41, 20, '/products/Washing machines/SAMSUNG Washer Front Load Inox-2.webp'),
	(42, 20, '/products/Washing machines/SAMSUNG Washer Front Load Inox-3.webp'),
	(43, 21, '/products/Washing machines/TCL Washer 7Kg Font Load INVERTER-1.webp'),
	(44, 21, '/products/Washing machines/TCL Washer 7Kg Font Load INVERTER-2.webp'),
	(45, 22, '/products/Washing machines/TCL Washer Top Load -1.webp'),
	(46, 22, '/products/Washing machines/TCL Washer Top Load -2.webp'),
	(47, 23, '/products/Air Conditionars/GREE Air Conditioner Split 9000 BTU Wifi R32-1.webp'),
	(48, 23, '/products/Air Conditionars/GREE Air Conditioner Split 9000 BTU Wifi R32-2.webp'),
	(49, 24, '/products/Air Conditionars/SAMSUNG Air Conditioners Split 18000BTU -1.webp'),
	(50, 24, '/products/Air Conditionars/SAMSUNG Air Conditioners Split 18000BTU -2.webp'),
	(51, 25, '/products/Air Conditionars/TCL Air Condition Split Inverter -1.webp'),
	(52, 25, '/products/Air Conditionars/TCL Air Condition Split Inverter 24000BTU - 2.webp'),
	(53, 26, '/products/Air Conditionars/TCL Air Conditioner Split ELITE WIFI IVERTE-1.webp'),
	(54, 26, '/products/Air Conditionars/TCL Air Conditioner Split ELITE WIFI IVERTE-2.webp'),
	(55, 27, '/products/Ovens/BOSCH Oven Gas Electric Inox.webp'),
	(56, 28, '/products/Ovens/Cecotec - Built-In Bolero Hexa Oven.webp'),
	(57, 29, '/products/Ovens/ELBA Oven Electric Black.webp'),
	(58, 30, '/products/Ovens/GORENJE Oven  Gas Inox.webp'),
	(59, 31, '/products/Ovens/Midea 24BMG4G058 Gaz Oven.webp');

-- Dumping structure for table electrical_appliance_store_db.product_reviews
CREATE TABLE IF NOT EXISTS `product_reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `review_text` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `client_id` (`client_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`),
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.product_reviews: ~0 rows (approximately)

-- Dumping structure for table electrical_appliance_store_db.product_statuses
CREATE TABLE IF NOT EXISTS `product_statuses` (
  `availability_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `availability_status_name` varchar(50) NOT NULL,
  PRIMARY KEY (`availability_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.product_statuses: ~2 rows (approximately)
INSERT INTO `product_statuses` (`availability_status_id`, `availability_status_name`) VALUES
	(1, 'In Stock'),
	(2, 'Out of Stock');

-- Dumping structure for table electrical_appliance_store_db.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.roles: ~2 rows (approximately)
INSERT INTO `roles` (`role_id`, `role_name`) VALUES
	(1, 'Admin'),
	(2, 'User');

-- Dumping structure for table electrical_appliance_store_db.shopping_carts
CREATE TABLE IF NOT EXISTS `shopping_carts` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`cart_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `shopping_carts_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.shopping_carts: ~1 rows (approximately)
INSERT INTO `shopping_carts` (`cart_id`, `client_id`, `created_at`) VALUES
	(1, 1, '2025-08-12 15:42:14'),
	(2, 3, '2026-01-18 17:05:21');

-- Dumping structure for table electrical_appliance_store_db.shopping_cart_items
CREATE TABLE IF NOT EXISTS `shopping_cart_items` (
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`cart_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shopping_cart_items_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `shopping_carts` (`cart_id`) ON DELETE CASCADE,
  CONSTRAINT `shopping_cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table electrical_appliance_store_db.shopping_cart_items: ~4 rows (approximately)
INSERT INTO `shopping_cart_items` (`cart_id`, `product_id`, `quantity`) VALUES
	(1, 2, 1),
	(1, 3, 3),
	(1, 14, 7),
	(1, 19, 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
