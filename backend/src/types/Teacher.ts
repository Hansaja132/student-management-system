import { Course } from "./Course";

export type Teacher = {
  id: string;
  user_id: string;
  employee_number: string;
  phone: string;
  address: string;
  hire_date: Date;
  specialization: Course[];
};
