import type { Student } from "../types/student";
import api from "./api";

export const getAllStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (err) {
    console.error("Error fetching students:", err);
    throw err;
  }
};

export const getStudentById = async (id: string) => {
  try {
    const response = await api.get(`/students/${id}`);
    return response.data;
  } catch (err) {
    console.error(`Error fetching student with ID ${id}:`, err);
    throw err;
  }
};

export const createStudent = async (studentData: Student) => {
  try {
    const response = await api.post("/students", studentData);
    return response.data;
  } catch (err) {
    console.error("Error creating student:", err);
    throw err;
  }
};

export const updateStudent = async (id: string, studentData: Student) => {
  try {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  } catch (err) {
    console.error(`Error updating student with ID ${id}:`, err);
    throw err;
  }
};

export const deleteStudent = async (id: string) => {
  try {
    await api.delete(`/students/${id}`);
  } catch (err) {
    console.error(`Error deleting student with ID ${id}:`, err);
    throw err;
  }
};
