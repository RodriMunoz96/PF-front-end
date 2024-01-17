import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateGrade } from '../../../../../redux/actions/action-grades';

function GradeEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [gradeData, setGradeData] = useState({
    gradename: '',
    gradequota: 0,
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {

    const { name, value } = e.target;
    setGradeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!gradeData.gradename || isNaN(gradeData.gradequota)) {
      setError('Please enter valid data');
      return;
    }
  
    if (!id) {
      setError('Grade ID is missing');
      return;
    }

  
    dispatch(updateGrade({ id, grade: gradeData }))
      .then(() => {
        setGradeData({
          gradename: '',
          gradequota: 0,
        });
        navigate('/viewSuperAdmin/dashboard');
      })
      .catch((error) => {
        console.error('Error updating grade data:', error);
        setError('Error updating grade data');
      });
  };
  return (
    <div>
      <h2>Edit Grade</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Grado:
          <input
            type="text"
            name="gradename"
            value={gradeData.gradename}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cupos Ocupados:
          <input
            type="number"
            name="gradequota"
            value={gradeData.gradequota}
            onChange={handleInputChange}
          />
        </label>

        <br />
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default GradeEdit;