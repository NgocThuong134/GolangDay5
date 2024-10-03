import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import EditStudentModal from "./../UpdateStudent";
import StudentDetailModal from "../DetailStudent";
import AddStudentModal from "../AddStudent";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    math: "",
    english: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8080/get-students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleDelete = (id) => {
    toast(
      <div>
        <p>Are you sure you want to delete this student?</p>
        <button onClick={() => deleteStudent(id)}>Yes</button>
        <button onClick={() => toast.dismiss()}>No</button>
      </div>,
      {
        autoClose: true,
      }
    );
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8080/delete-student/${id}`);
      fetchStudents();
      toast.success("Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const openDetailModal = (student) => {
    setSelectedStudent(student);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedStudent(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setNewStudent({
      name: "",
      age: "",
      gender: "",
      email: "",
      math: "",
      english: "",
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8080/update-student/${selectedStudent.id}`,
        selectedStudent
      );
      fetchStudents();
      closeEditModal();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await axios.post("http://127.0.0.1:8080/add-student", newStudent);
      fetchStudents();
      closeAddModal();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updateValue;
    if (name === "math" || name === "english") {
      updateValue = parseFloat(value);

      if (updateValue > 10) {
        toast.error("Not more than 10");
        updateValue = 10;
      }
    } else {
      updateValue = value;
    }
    if (name === "age") {
      updateValue = parseInt(value, 10);
    }

    setSelectedStudent({ ...selectedStudent, [name]: updateValue });
  };

  const handleNewStudentChange = (e) => {
    const { name, value } = e.target;
    let updateValue;
    console.log(value)
    if (name === "math" || name === "english") {
      updateValue = parseFloat(value);

      if (updateValue > 10) {
        toast.error("Not more than 10");
        updateValue = 10;
      }
    } else {
      updateValue = value;
    }
    if (name === "age") {
      updateValue = parseInt(value, 10);
    }
    setNewStudent({ ...newStudent, [name]: updateValue });
  };

  return (
    <div className="table-container">
      <h2>Student List</h2>
      <button className="add-button" onClick={openAddModal}>
        +
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Math</th>
            <th>English</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td
                onClick={() => openDetailModal(student)}
                style={{ cursor: "pointer", color: "blue" }}
              >
                {student.id}
              </td>
              <td
                onClick={() => openDetailModal(student)}
                style={{ cursor: "pointer" }}
              >
                {student.name}
              </td>
              <td>{student.age}</td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.math}</td>
              <td>{student.english}</td>
              <td>
                <button onClick={() => openEditModal(student)}>Edit</button>
                <button
                  className="delete"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditStudentModal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        student={selectedStudent}
        onUpdate={handleUpdate}
        onChange={handleChange}
      />

      <StudentDetailModal
        isOpen={isDetailModalOpen}
        onRequestClose={closeDetailModal}
        student={selectedStudent}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
        onAdd={handleAdd}
        onChange={handleNewStudentChange}
        newStudent={newStudent}
      />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        draggablePercent={60}
      />
    </div>
  );
};

export default StudentList;
