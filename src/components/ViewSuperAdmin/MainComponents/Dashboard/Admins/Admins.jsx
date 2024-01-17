import { useEffect, useState } from 'react';
import style from './admins.module.css'
import { NavLink } from 'react-router-dom'
import { banAdmin, filterByState, getAdminByEmail, getAdminById, getAdminByName, getAllAdmins, restoreAdmin, setCurrentPage } from '../../../../../redux/actions/actions-superadmin';
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../Pagination.jsx/Pagination';

function Admins() {
    const dispatch = useDispatch()
    const { allAdminsCopy, adminDetail, currentPage } = useSelector((state) => state)
    const [detailOpen, setDetailOpen] = useState(false)
    const [name, setName] = useState("")
    const [statusOpen, setStatusOpen] = useState(false)
    const [user, setUser] = useState(null)

    /*****/

    const adminsPerPage = 10;
    const totalAdmins = allAdminsCopy.length

    const firstIndex = adminsPerPage * (currentPage - 1)
    const lastIndex = firstIndex + adminsPerPage

    let currentPageData = allAdminsCopy.slice(firstIndex, lastIndex)


    const onPageChange = (pageNum) => {
        dispatch(setCurrentPage(pageNum))
    }

    /******/

    const openDetail = (id) => {
        dispatch(getAdminById(id))
        setDetailOpen(true)
    }

    const closeDetail = () => {
        setDetailOpen(false)
    }

    const openStatus = (id) => {
        dispatch(getAdminById(id))
        setStatusOpen(true)
    }
    const closeStatus = () => {
        setStatusOpen(false)
        setUser(null)
    }

    const showAllUsers = (e) => {
        e.preventDefault()

        dispatch(getAllAdmins())
    }

    const lookAtAdmin = (e) => {
        const { name, value } = e.target

        if (value === "") {
            dispatch(getAllAdmins())
        }
        setName(value)
    }

    const searchToAdmin = () => {
        if (name.includes("@")) {
            dispatch(getAdminByEmail(name))
            setName("")
        } else {
            dispatch(getAdminByName(name))
            setName("")
        }
        setName("")
    }

    const banToAdmin = (id) => {
        dispatch(banAdmin({ id }))
    }

    const restoreToAdmin = (id) => {
        dispatch(restoreAdmin(id))
    }

    const filterRol = (e) => {
        dispatch(filterByState(e.target.value))
    }

    useEffect(() => {
        dispatch(getAllAdmins())
    }, [])

    return (<>
        <div className={style.container}>
            <div className={style.container_searchbar}>
                <input type="text" value={name} onChange={lookAtAdmin} placeholder='Busca por nombre o email' />
                <button onClick={searchToAdmin}>🔍︎</button>
            </div>
            <div className={style.container_selects}>
                <b>Estado:</b>
                <select onChange={filterRol}>
                    <option value="todos">Todos</option>
                    <option value="active">Activos</option>
                    <option value="banned">Baneados</option>
                </select>
            </div>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Rol</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Estado</th>
                        <th>Info</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentPageData.length > 0
                            ? currentPageData.map((admin, index) => {
                                const rowClass = index % 2 === 0 ? style['row_even'] : style['row_odd']

                                return (
                                    <tr className={`${style.row} ${rowClass}`} key={admin.id}>
                                        <td><button onClick={() => openStatus(admin.id)}>⁝</button></td>
                                        <td>{admin.type}</td>
                                        <td>{admin.nombre}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.state ? "Activo" : "Baneado"}</td>
                                        <td><button onClick={() => openDetail(admin.id)}>🛈</button></td>
                                    </tr>
                                )
                            }) : null
                    }
                </tbody>
            </table>
            <Pagination
                totalItems={totalAdmins}
                currentPage={currentPage}
                pageSize={adminsPerPage}
                onPageChange={onPageChange}
            />
        </div>
        {
            detailOpen ? <div className={style.overlay}>
                <div className={style.container_details}>
                    <button onClick={closeDetail}>X</button>
                    <h1>ID: {adminDetail.id}</h1>
                    <h2>{adminDetail.nombre} {adminDetail.apellidoPaterno} {adminDetail.apellidoMaterno}</h2>
                    <div>
                        <p>Nombre: <b>{adminDetail.nombre}</b></p>
                        <p>Apellido paterno: <b>{adminDetail.apellidoPaterno}</b></p>
                        <p>Apellido materno: <b>{adminDetail.apellidoMaterno}</b></p>
                        <p>Email: <b>{adminDetail.email}</b></p>
                        <p>Estado: <b>{adminDetail.state ? "Activo" : "Baneado"}</b></p>
                    </div>
                </div>
            </div> : null
        }
        {
            statusOpen ? <div className={style.overlay}>
                <div className={style.container_status_modify}>
                    <button onClick={closeStatus}>X</button>
                    <h2>¿Desea {adminDetail.state ? "banear" : "desbanear"} a {adminDetail.nombre}?</h2>
                    {
                        adminDetail.state
                            ? <button className={style.button_action} onClick={() => banToAdmin(adminDetail.id)}>Banear admin</button>
                            : <button className={style.button_action} onClick={() => restoreToAdmin(adminDetail.id)}>Restaurar admin</button>
                    }
                </div>
            </div> : null
        }
    </>);
}

export default Admins;