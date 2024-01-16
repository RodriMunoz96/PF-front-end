import { useState } from 'react';
import style from './adminForm.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { createUser } from '../../../../../../redux/actions/actions-user';

function AdminForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [newAdmin, setNewAdmin] = useState({
        email: "",
        password: "",
        type: "Admin",
        nombre: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        complete: true
    })
    const arrow = '<---'

    const onChange = (e) => {
        const { name, value } = e.target

        setNewAdmin({
            ...newAdmin,
            [name]: value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(newAdmin);
        dispatch(createUser(newAdmin))

        setNewAdmin({
            email: "",
            password: "",
            type: "Admin",
            nombre: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
        })
        navigate("/viewSuperAdmin/dashboard")
    }

    return (<>
        <div className={style.container}>
            <div className={style.container_details}>
                <nav>
                    <h1>Registrar nuevo administrador</h1>
                </nav>
                <form onSubmit={onSubmit}>
                    <div className={style.container_divs}>
                        <div className={style.container_divs_main}>
                            <label htmlFor="nombre">Nombre:</label>
                            <input type="text" onChange={onChange} name='nombre' />
                        </div>
                        <div className={style.container_divs_main}>
                            <label htmlFor="apellidoPaterno">Apellido paterno:</label>
                            <input type="text" onChange={onChange} name='apellidoPaterno' />
                        </div>
                    </div>
                    <div className={style.container_divs}>
                        <div className={style.container_divs_main}>
                            <label htmlFor="apellidoMaterno">Apellido materno:</label>
                            <input type="text" onChange={onChange} name='apellidoMaterno' />
                        </div>
                        <div className={style.container_divs_main}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" onChange={onChange} name='email' />
                        </div>
                    </div>
                    <div className={style.container_divs_last}>
                        <label htmlFor="password">Contraseña:</label>
                        <input type="text" onChange={onChange} name='password' />
                    </div>
                    <button className={style.btn_send} type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    </>);
}

export default AdminForm;