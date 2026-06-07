# API Endpoints Documentation

This document outlines all available REST API endpoints for the backend of the Student Management System.

All endpoints are prefixed with `/api`.

---

## 🔐 Auth

### Login User
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword123"
  }
  ```

---

## 👤 Users

### Get All Users
- **URL**: `/api/users`
- **Method**: `GET`
- **Request Body**: *None*

### Create User
- **URL**: `/api/users`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "securepassword123",
    "role": "student" 
  }
  ```

### Get User by ID
- **URL**: `/api/users/:id`
- **Method**: `GET`
- **Request Body**: *None*

### Update User
- **URL**: `/api/users/:id`
- **Method**: `PATCH`
- **Request Body** (All fields optional):
  ```json
  {
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "role": "admin"
  }
  ```

### Delete User
- **URL**: `/api/users/:id`
- **Method**: `DELETE`
- **Request Body**: *None*

---

## 🎓 Students

### Get All Students
- **URL**: `/api/students`
- **Method**: `GET`
- **Request Body**: *None*

### Create Student
- **URL**: `/api/students`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "user_id": "uuid-from-users-table",
    "student_number": "STU-2026-001",
    "date_of_birth": "2005-05-15",
    "gender": "female",
    "phone_number": "+1234567890",
    "address": "123 Campus Drive, Cityville",
    "enrollment_date": "2026-06-01"
  }
  ```

### Get Student by ID
- **URL**: `/api/students/:id`
- **Method**: `GET`
- **Request Body**: *None*

### Update Student
- **URL**: `/api/students/:id`
- **Method**: `PATCH`
- **Request Body** (All fields optional):
  ```json
  {
    "phone_number": "+1987654321",
    "address": "456 New Address St"
  }
  ```

### Delete Student
- **URL**: `/api/students/:id`
- **Method**: `DELETE`
- **Request Body**: *None*

---

## 👩‍🏫 Teachers

### Get All Teachers
- **URL**: `/api/teachers`
- **Method**: `GET`
- **Request Body**: *None*

### Create Teacher
- **URL**: `/api/teachers`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "user_id": "uuid-from-users-table",
    "employee_number": "EMP-T-042",
    "phone": "+1987654321",
    "address": "456 Faculty Lane, Cityville",
    "hire_date": "2020-08-15",
    "specialization": "Computer Science"
  }
  ```

### Get Teacher by ID
- **URL**: `/api/teachers/:id`
- **Method**: `GET`
- **Request Body**: *None*

### Update Teacher
- **URL**: `/api/teachers/:id`
- **Method**: `PATCH`
- **Request Body** (All fields optional):
  ```json
  {
    "phone": "+1000000000",
    "specialization": "Advanced Networking"
  }
  ```

### Delete Teacher
- **URL**: `/api/teachers/:id`
- **Method**: `DELETE`
- **Request Body**: *None*

---

## 📚 Courses

### Get All Courses
- **URL**: `/api/courses`
- **Method**: `GET`
- **Request Body**: *None*

### Create Course
- **URL**: `/api/courses`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "course_code": "CSC2333",
    "course_name": "Computer Networking",
    "credits": 3,
    "description": "An introduction to computer networks and protocols.",
    "teacher_id": "uuid-from-teachers-table"
  }
  ```

### Get Course by ID
- **URL**: `/api/courses/:id`
- **Method**: `GET`
- **Request Body**: *None*

### Update Course
- **URL**: `/api/courses/:id`
- **Method**: `PATCH`
- **Request Body** (All fields optional):
  ```json
  {
    "course_name": "Advanced Computer Networking",
    "credits": 4
  }
  ```

### Delete Course
- **URL**: `/api/courses/:id`
- **Method**: `DELETE`
- **Request Body**: *None*

---

## 📝 Enrollments

### Get All Enrollments
- **URL**: `/api/enrollments`
- **Method**: `GET`
- **Request Body**: *None*

### Enroll Student in Course
- **URL**: `/api/enrollments`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "studentId": "uuid-from-students-table",
    "courseId": "uuid-from-courses-table"
  }
  ```

### Get Enrollment by ID
- **URL**: `/api/enrollments/:id`
- **Method**: `GET`
- **Request Body**: *None*

### Remove Enrollment
- **URL**: `/api/enrollments/:id`
- **Method**: `DELETE`
- **Request Body**: *None*

---

## 🏥 Health Checks

### Basic Health Check
- **URL**: `/api/health`
- **Method**: `GET`
- **Request Body**: *None*

### Database Health Check
- **URL**: `/api/dbHealth`
- **Method**: `GET`
- **Request Body**: *None*
