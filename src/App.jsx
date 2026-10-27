import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");

  const getStudents = async () => {
    const response = await fetch("http://localhost:3000/students");
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  const addStudent = async () => {
    await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        age: Number(age),
        course: course,
        marks: Number(marks),
      }),
    });

    setName("");
    setAge("");
    setCourse("");
    setMarks("");

    getStudents();
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>Add Student</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <input
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <h2>Student Records</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Marks</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>{student.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
// Feature branch: Student CRUD improvements
export default App;