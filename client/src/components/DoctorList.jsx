import React from 'react';
import { useNavigate } from 'react-router-dom';
const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card p-2 m-2"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/book-appoinment/${doctor._id}`)}>
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization</b> {doctor.specialization}
          </p>
          <p>
            <b>Experience</b> {doctor.specialization}
          </p>
          <p>
            <b>fees Per Consultation</b> {doctor.feeperconsultation}
          </p>
          <p>
            <b>Timings</b> {doctor.timings[0] - doctor.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
