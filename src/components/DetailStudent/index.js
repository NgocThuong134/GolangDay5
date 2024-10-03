// src/components/StudentDetailModal.js
import React from 'react';
import Modal from 'react-modal';
import './style.css';

Modal.setAppElement('#root');

const StudentDetailModal = ({ isOpen, onRequestClose, student }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Student Details"
      ariaHideApp={false}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-header">Student Details</div>
      {student && (
        <div className="modal-content">
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Age:</strong> {student.age}</p>
          <p><strong>Gender:</strong> {student.gender}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Math:</strong> {student.math}</p>
          <p><strong>English:</strong> {student.english}</p>
          <button className="cancel" onClick={onRequestClose}>Close</button>
        </div>
      )}
    </Modal>
  );
};

export default StudentDetailModal;