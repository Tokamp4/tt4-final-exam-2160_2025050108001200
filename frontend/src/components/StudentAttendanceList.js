// src/components/StudentAttendanceList.jsx
import React, { useEffect, useState } from 'react';
import StudentAttendanceService from '../services/StudentAttendanceService';

const StudentAttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [formData, setFormData] = useState({
    studentName: '',
    date: '',
    present: false,
    remarks: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchAttendances = async () => {
    const response = await StudentAttendanceService.getAll();
    setAttendances(response.data);
  };

  useEffect(() => {
    fetchAttendances();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await StudentAttendanceService.update(editingId, { id: editingId, ...formData });
    } else {
      await StudentAttendanceService.create(formData);
    }
    setFormData({ studentName: '', date: '', present: false, remarks: '' });
    setEditingId(null);
    fetchAttendances();
  };

  const handleEdit = (attendance) => {
    setFormData({
      studentName: attendance.studentName,
      date: attendance.date.slice(0, 10),
      present: attendance.present,
      remarks: attendance.remarks
    });
    setEditingId(attendance.id);
  };

  const handleDelete = async (id) => {
    await StudentAttendanceService.delete(id);
    fetchAttendances();
  };

  return (
    <div>
      <h2>Student Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Student Name" required />
        <input name="date" type="date" value={formData.date} onChange={handleChange} required />
        <label>
          Present:
          <input name="present" type="checkbox" checked={formData.present} onChange={handleChange} />
        </label>
        <input name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks" />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
      </form>

      <ul>
        {attendances.map(att => (
          <li key={att.id}>
            {att.studentName} - {att.date.slice(0, 10)} - {att.present ? 'Present' : 'Absent'} - {att.remarks}
            <button onClick={() => handleEdit(att)}>Edit</button>
            <button onClick={() => handleDelete(att.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentAttendanceList;
