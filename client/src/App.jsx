import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ lname: "", fname: "", course: "", year: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:3000/get-list");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/add-student", form);
      console.log("New Student Added:", res.data); 
      setForm({ lname: "", fname: "", course: "", year: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };
  

  const deleteStudent = async (id) => {
    try {
      console.log("Attempting to delete student with ID:", id);
      
      const res = await axios.delete(`http://localhost:3000/delete-student/${id}`);
  
      console.log("Delete response:", res.data);
      
      fetchStudents(); // Refresh list
    } catch (error) {
      console.error("Error deleting students:", error.response?.data || error.message);
    }
  };
  
  
  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Student Information System</h1>

      <form className="mb-4 flex flex-col gap-2" onSubmit={addStudent}>
        <input
          className="border p-2"
          type="text"
          placeholder="Last Name"
          value={form.lname}
          onChange={(e) => setForm({ ...form, lname: e.target.value })}
          required
        />
        <input
          className="border p-2"
          type="text"
          placeholder="First Name"
          value={form.fname}
          onChange={(e) => setForm({ ...form, fname: e.target.value })}
          required
        />
        <input
          className="border p-2"
          type="text"
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          required
        />
        <input
          className="border p-2"
          type="text"
          placeholder="Year"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          required
        />
        <button className="bg-blue-500 text-white p-2">Add Student</button>
      </form>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Last Name</th>
            <th className="border p-2">First Name</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id}>
              <td className="border p-2">{student.student_id}</td>
              <td className="border p-2">{student.lname}</td>
              <td className="border p-2">{student.fname}</td>
              <td className="border p-2">{student.course}</td>
              <td className="border p-2">{student.year}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white p-1"
                  onClick={() => deleteStudent(student.student_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
