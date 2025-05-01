// src/services/StudentAttendanceService.jsx
import axios from 'axios';

const API_URL = '/api/StudentAttendance'; // Adjust as needed

const StudentAttendanceService = {
  getAll: () => axios.get(API_URL),
  getById: (id) => axios.get(`${API_URL}/${id}`),
  create: (attendance) => axios.post(API_URL, attendance),
  update: (id, attendance) => axios.put(`${API_URL}/${id}`, attendance),
  delete: (id) => axios.delete(`${API_URL}/${id}`)
};

export default StudentAttendanceService;
