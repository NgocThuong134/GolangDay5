// src/components/EditStudentModal.js
import React from "react";
import Modal from "react-modal";
import "./style.css";

Modal.setAppElement("#root");

const EditStudentModal = ({
  isOpen,
  onRequestClose,
  student,
  onUpdate,
  onChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Student"
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">Edit Student</div>
      {student && (
        <div className="modal-content">
          <div className="label-input-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={onChange}
            />
          </div>
          <div className="label-input-group">
            <label>Age:</label>
            <input
              type="number"
              name="age"
              max={200}
              min={18}
              value={student.age}
              onChange={onChange}
            />
          </div>
          <div className="label-input-group">
            <label>Gender:</label>
            <select name="gender" value={student.gender} onChange={onChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="label-input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={student.email}
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
              value={student.math}
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
              value={student.english}
              onChange={onChange}
            />
          </div>
          <button className="update" onClick={onUpdate}>
            Update
          </button>
          <button className="cancel" onClick={onRequestClose}>
            Cancel
          </button>
        </div>
      )}
    </Modal>
  );
};

export default EditStudentModal;
