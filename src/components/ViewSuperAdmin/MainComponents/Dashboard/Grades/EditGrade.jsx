import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateGrade } from "../../../../../redux/actions/action-grades";
import style from "./editGrade.module.css";

function GradeEdit() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [gradeData, setGradeData] = useState({
    gradename: "",
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
      setError("Please enter valid data");
      return;
    }

    if (!id) {
      setError("Grade ID is missing");
      return;
    }

    dispatch(updateGrade({ id, grade: gradeData }))
      .then(() => {
        setGradeData({
          gradename: "",
          gradequota: 0,
        });
        navigate("/viewSuperAdmin/dashboard");
      })
      .catch((error) => {
        console.error("Error updating grade data:", error);
        setError("Error updating grade data");
      });
  };
  return (
    <div className={style.main_container}>
      <form onSubmit={handleSubmit} className={style.form_container}>
        <h2 className={style.title}>Editar Grado</h2>
        <label className={style.label}>
          Nombre del Grado:
          <input
            type="text"
            name="gradename"
            value={gradeData.gradename}
            onChange={handleInputChange}
            className={style.input}
          />
        </label>
        <br />
        <label className={style.label}>
          Cupos Ocupados:
          <input
            type="number"
            name="gradequota"
            value={gradeData.gradequota}
            onChange={handleInputChange}
            className={style.input}
          />
        </label>

        <br />
        <button type="submit" className={style.submit_button}>
          Guardar
        </button>
      </form>
    </div>
  );
}

export default GradeEdit;
