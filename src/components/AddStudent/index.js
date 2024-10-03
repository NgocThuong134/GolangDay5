// src/components/AddStudentModal.js
import React from "react";
import Modal from "react-modal";
import "./style.css";

Modal.setAppElement("#root");

const AddStudentModal = ({
  isOpen,
  onRequestClose,
  onAdd,
  onChange,
  newStudent,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Student"
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">Add Student</div>
      <div className="modal-content">
        <div className="label-input-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newStudent.name}
            onChange={onChange}
          />
        </div>
        <div className="label-input-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={newStudent.age}
            onChange={onChange}
          />
        </div>
        <div className="label-input-group">
          <label>Gender:</label>
          <select name="gender" value={newStudent.gender} onChange={onChange}>
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="label-input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={newStudent.email}
            onChange={onChange}
          />
        </div>
        <div className="label-input-group">
          <label>Math:</label>
          <input
            type="number"
            name="math"
            max={10}
              min={0}
              step={0.1}
            value={newStudent.math}
            onChange={onChange}
          />
        </div>
        <div className="label-input-group">
          <label>English:</label>
          <input
            type="number"
            name="english"
            max={10}
              min={0}
              step={0.1}
            value={newStudent.english}
            onChange={onChange}
          />
        </div>
        <button className="update" onClick={onAdd}>
          Add
        </button>
        <button className="cancel" onClick={onRequestClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AddStudentModal;
