import { useState } from 'react';
import style from './gradeForm.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { postGrade } from '../../../../../../redux/actions/action-grades';

function GradeForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [newGrade, setNewGrade] = useState({
        gradename: "",
        gradeQuotaLimit: ""
    })
    const arrow = '<---'

    const onChange = (e) => {
        const { name, value } = e.target

        setNewGrade({
            ...newGrade,
            [name]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(postGrade(newGrade))
        setNewGrade({
            gradename: "",
            gradeQuotaLimit: ""
        })
        navigate("/viewSuperAdmin/dashboard")
    }

    return (<>
        <div className={style.container}>
            <div className={style.container_details}>
                <nav>
                    <h1>Añadir nuevo grado</h1>
                </nav>
                <form onSubmit={onSubmit}>
                    <div className={style.container_labels}>
                        <label htmlFor="gradename">Nombre del grado:</label>
                        <input onChange={onChange} type="text" name='gradename' />
                    </div>
                    <div className={style.container_labels}>
                        <label htmlFor="gradeQuotaLimit">Cupos:</label>
                        <input onChange={onChange} type="number" name='gradeQuotaLimit' />
                    </div>
                    <button className={style.btn_send} type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    </>);
}

export default GradeForm;
