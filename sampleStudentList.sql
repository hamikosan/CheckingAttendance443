drop database if exists `sampleStudentList`; 
create database if not exists `sampleStudentList`;
use `sampleStudentList`;
CREATE TABLE `student_info` (
  `StudentID` int(7) primary key,
  `Firstname` varchar(45) NOT NULL,
  `Lastname` varchar(45)  NOT NULL,
  `Present` boolean NOT NULL
);
INSERT INTO `student_info` (`StudentID`, `Firstname`, `Lastname`, `Present`) VALUES
(6288008, 'Kanyakorn', 'Viphaya', False),
(6288052, 'Mananchayaporn', 'Thamsiripong', False),
(6288120, 'Pimpavee', 'Saisamorn', False);