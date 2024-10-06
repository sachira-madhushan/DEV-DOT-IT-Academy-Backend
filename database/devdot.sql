-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2024 at 07:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `devdot`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `a_id` int(11) NOT NULL,
  `a_username` varchar(100) NOT NULL,
  `a_email` varchar(200) NOT NULL,
  `a_password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`a_id`, `a_username`, `a_email`, `a_password`) VALUES
(2, 'admin', 'admin@gmail.com', '$2a$10$zKABx.2mWMiNjp0nQHIEPO4i9seiDBE6Q/tV/bu.C9q8v2KP1VWhO'),
(4, 'Sachira', 'sachira@gmail.com', '$2a$10$MXHWZT0e/c4.tio2vPeCb.0LLssvSMzHp7xrLX5sv4tXdC2ksgmw.'),
(5, 'Madhushan', 'admin@gmail.com', '$2a$10$K80XZ1sFT7n8hAElsznEK.HjQVyA2snd64vohY4gPQJM5HVIMiTHe');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `c_id` int(11) NOT NULL,
  `c_title` varchar(100) NOT NULL,
  `c_description` varchar(200) NOT NULL,
  `c_price` double NOT NULL,
  `c_instructor` varchar(200) NOT NULL,
  `c_banner` varchar(200) NOT NULL,
  `c_intro` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`c_id`, `c_title`, `c_description`, `c_price`, `c_instructor`, `c_banner`, `c_intro`) VALUES
(8, 'Game Development Sinhala Full Course', 'A comprehensive game development course, from basics to advanced concepts, using Unity and Unreal Engine. Delivered in Sinhala, this course covers everything from 2D and 3D game creation, C# programmi', 5000, 'J.P.Sachira Madhushan', 'https://miro.medium.com/v2/resize:fit:1400/1*3gh-krzOrAoNyX8mJGyc2Q.jpeg', 'https://youtu.be/9AkBx889f-o?si=dqCWhbFe_U-2Zkiv'),
(9, 'My Channel', 'Test Course', 1000, 'Sachira Madhushan', 'https://cc.sj-cdn.net/instructor/3svpz2ui2j6ce-heap-university/courses/169wcplaoqd6f/promo-image.1679000214.png', 'https://youtu.be/EDAeorwE-jk'),
(10, 'Programming Challenges', 'Programming Challenges Full Courses (Java,C++,C#,Python)', 3000, 'Sachira Madhushan', 'https://www.codecademy.com/resources/blog/wp-content/uploads/2022/12/code-practice.png', 'https://youtu.be/9ixjB4eCvjQ?si=AMmHk8_8hzK7PKIV');

-- --------------------------------------------------------

--
-- Table structure for table `course_chapters`
--

CREATE TABLE `course_chapters` (
  `c_id` int(11) NOT NULL,
  `chap_id` int(11) NOT NULL,
  `chap_title` varchar(200) NOT NULL,
  `chap_description` varchar(1000) NOT NULL,
  `chap_video` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_chapters`
--

INSERT INTO `course_chapters` (`c_id`, `chap_id`, `chap_title`, `chap_description`, `chap_video`) VALUES
(8, 7, 'Chapter 01', 'Background Desing', 'https://youtu.be/QyGJUP3H7p0?si=hdccTZxsN5FHT1xv'),
(8, 8, 'Chapter 02', 'Character Controll', 'https://youtu.be/91BHlfpKZnA?si=iqlyiY1dxjjUDm6B'),
(9, 9, 'Chapter 01', 'Play Console Problem', 'https://youtu.be/W_Dnhy1u-gU?si=b5xhSsRkvwZFBsM3'),
(9, 10, 'Chapter 02', 'Transfer Play Console Account', 'https://youtu.be/1_OuPi66FQ8?si=fc2AF6R719kUrr5k'),
(10, 11, 'Chapter 01', 'Java Programming Challenges', 'https://youtu.be/NKJ3i91rPoo?si=Cs85AYDpp2ZTaoQJ'),
(10, 12, 'Chapter 02', 'Python Programming Challenges', 'https://youtu.be/ssYm9kjbgRE?si=8WyE_PQhICfQ368Z'),
(10, 13, 'Chapter 03', 'C# Programming Challenges', 'https://youtu.be/Ud3GK1n8YvI?si=w47MA-0jVuwyD1ia');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `e_id` int(11) NOT NULL,
  `u_id` int(11) NOT NULL,
  `c_id` int(11) NOT NULL,
  `e_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`e_id`, `u_id`, `c_id`, `e_date`) VALUES
(3, 6, 8, '2024-09-19 06:16:47'),
(4, 26, 8, '2024-09-19 06:23:44'),
(5, 31, 8, '2024-10-05 16:13:22'),
(6, 32, 10, '2024-10-06 05:36:01'),
(7, 32, 8, '2024-10-06 05:37:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `u_id` int(11) NOT NULL,
  `u_username` varchar(100) NOT NULL,
  `u_fullname` varchar(200) NOT NULL,
  `u_birthday` date NOT NULL,
  `u_phone` varchar(200) NOT NULL,
  `u_email` varchar(200) NOT NULL,
  `u_password` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`u_id`, `u_username`, `u_fullname`, `u_birthday`, `u_phone`, `u_email`, `u_password`) VALUES
(20, 'fdsfsdf', 'fdsfafds', '2024-09-05', '024152125', 'vcvbcv@gmail.com', '$2a$10$dJExnQPXZSOPspVI/13PGONztd3Ril2A7QHLO7fWIEXn38b5wrDcW'),
(21, 'fdsafsdfafs', 'fdsfsadfsfsdfsa', '2024-09-12', '04124242', 'fdsfsda@gmail.com', '$2a$10$w9VcUjFVsPNNP.KTj7dmGuhTvTJePvl7mepJf./Ajt03mLJqcFwxy'),
(22, 'fdsfsd', 'fdsfsdf', '2024-09-05', 'fdsfsf', 'fdsfdf', '$2a$10$3KgAQ7ecz8qHmG6NwFv0WeLsvEqpcH/Vo9As7T3v18xmEhI9eQdxu'),
(27, 'dasdasdas', 'dasdsaddasd', '2024-09-05', 'dasdasdaasda', 'dasdasd', '$2a$10$NKa17bqy6uR.HyIY3NQhpe3bS9eGwLInQt76Kz6uxHSUqBj2rizJC'),
(29, 'dasdasdasdsdad', 'dasdsaddasddasda', '2024-09-05', '0782323223232', 'dasdasd@gmail.com', '$2a$10$Z0t3rQSwNqcN6AXQmv0KFu/p2qLpE40wnjukcAeuDK0CMiLd6aCNa'),
(32, 'Sachira Madhushan', 'Sachira Madhushan S', '2000-07-24', '0783398454', 'sacheeramadushan455@gmail.com', '$2a$10$NWClzztRegdqOHgpD8lIXO2iVjifBWGHRYvpmAI98DAivFaDDBy.S');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`a_id`,`a_email`),
  ADD UNIQUE KEY `a_username` (`a_username`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`c_id`);

--
-- Indexes for table `course_chapters`
--
ALTER TABLE `course_chapters`
  ADD PRIMARY KEY (`chap_id`),
  ADD KEY `fk_course_id` (`c_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`e_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`u_id`),
  ADD UNIQUE KEY `u_username` (`u_username`),
  ADD UNIQUE KEY `u_phone` (`u_phone`),
  ADD UNIQUE KEY `u_email` (`u_email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `a_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `c_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `course_chapters`
--
ALTER TABLE `course_chapters`
  MODIFY `chap_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `e_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `u_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course_chapters`
--
ALTER TABLE `course_chapters`
  ADD CONSTRAINT `fk_course_id` FOREIGN KEY (`c_id`) REFERENCES `courses` (`c_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
