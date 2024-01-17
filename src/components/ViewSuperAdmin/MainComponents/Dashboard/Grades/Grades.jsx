import style from './grades.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../../../../redux/actions/actions-superadmin';
import Pagination from '../Pagination.jsx/Pagination';
import { useEffect, useState } from 'react';
import { filterByStateGrade, getAllGrades, getGradeById, removeGrade } from '../../../../../redux/actions/action-grades';

function Grades() {
     const dispatch = useDispatch()
     const { allGradesCopy, currentPage, gradesDetail } = useSelector((state) => state)
     const [statusOpen, setStatusOpen] = useState(false)

     /*****/

     const gradesPerPage = 10;
     const totalGrades = allGradesCopy.length

     const firstIndex = gradesPerPage * (currentPage - 1)
     const lastIndex = firstIndex + gradesPerPage

     let currentPageData = allGradesCopy.slice(firstIndex, lastIndex)


     const onPageChange = (pageNum) => {
          dispatch(setCurrentPage(pageNum))
     }

     /******/

     const showAllUsers = (e) => {
          e.preventDefault()

          dispatch(getAllGrades())
     }

     const filterRol = (e) => {
          dispatch(filterByStateGrade(e.target.value))
     }

     const openStatus = (id) => {
          dispatch(getGradeById(id))
          setStatusOpen(true)
     }

     const closeStatus = () => {
          setStatusOpen(false)
     }

     const banToGrade = (id) => {
          dispatch(removeGrade(id))
     }

     useEffect(() => {
          dispatch(getAllGrades())
     }, [])


     return (
          <>
               <div className={style.container}>
                    <div className={style.container_searchbar}>
                         <input type="text" placeholder='Busca por nombre' />
                         <button>🔍︎</button>
                    </div>
                    <div className={style.container_selects}>
                         <b>Estado:</b>
                         <select onChange={filterRol}>
                              <option value="todos">Todos</option>
                              <option value="active">Activos</option>
                              <option value="banned">Inactivos</option>
                         </select>
                    </div>
                    <table className={style.table}>
                         <thead>
                              <tr>
                                   <th></th>
                                   <th>Nombre</th>
                                   <th>Cupos</th>
                                   <th>Estado</th>
                              </tr>
                         </thead>
                         <tbody>
                              {currentPageData.length > 0 ? (
                                   currentPageData.map((grade, index) => {
                                        const rowClass =
                                             index % 2 === 0 ? style['row_even'] : style['row_odd'];
                                        // =======
                                        //     return (<>
                                        //         <div className={style.container}>
                                        //             <div className={style.container_searchbar}>
                                        //                 <input type="text" placeholder='Busca por nombre' />
                                        //                 <button>🔍︎</button>
                                        //             </div>
                                        //             <div className={style.container_selects}>
                                        //                 <b>Estado:</b>
                                        //                 <select onChange={filterRol}>
                                        //                     <option value="todos">Todos</option>
                                        //                     <option value="active">Activos</option>
                                        //                     <option value="banned">Inactivos</option>
                                        //                 </select>
                                        //             </div>
                                        //             <table className={style.table}>
                                        //                 <thead>
                                        //                     <tr>
                                        //                         <th></th>
                                        //                         <th>Nombre</th>
                                        //                         <th>Cupos</th>
                                        //                         <th>Estado</th>
                                        //                     </tr>
                                        //                 </thead>
                                        //                 <tbody>
                                        //                     {
                                        //                         currentPageData.length > 0
                                        //                             ? currentPageData.map((grade, index) => {
                                        //                                 const rowClass = index % 2 === 0 ? style['row_even'] : style['row_odd']
                                        // >>>>>>> 7575e399d6a3068880acc747eaa5e205d352d962

                                        return (
                                             <tr className={`${style.row} ${rowClass}`} key={grade.id}>
                                                  <td><button onClick={() => openStatus(grade.id)}>⁝</button></td>
                                                  <td>{grade.gradename}</td>
                                                  <td>{grade.gradeQuotaLimit - grade.gradequota}</td>
                                                  <td>{grade.state ? "Activo" : "Inactivo"}</td>
                                                  <td>
                                                       <NavLink to={`/grades/edit/${grade.id}`}>
                                                            <button>Editar</button>
                                                       </NavLink>
                                                  </td>
                                             </tr>
                                        );
                                   })
                              ) : null}
                         </tbody>
                    </table>
                    <Pagination
                         totalItems={totalGrades}
                         currentPage={currentPage}
                         pageSize={gradesPerPage}
                         onPageChange={onPageChange}
                    />
                    <div className={style.container_message}>
                         <p><b>¿No encontraste lo que buscabas?</b> Es posible que algunos grados
                              estén ocultas debido a los filtros que has seleccionado.</p>
                         <button className={style.show_admins} onClick={showAllUsers}>Mostrar todos los grados</button>
                         {
                              allGradesCopy.length !== 1
                                   ? <small>{allGradesCopy.length} grades encontrados</small>
                                   : <small>{allGradesCopy.length} grade encontrado</small>
                         }
                    </div>
               </div>
               {
                    statusOpen ? <div className={style.overlay}>
                         <div className={style.container_status_modify}>
                              <button onClick={closeStatus}>X</button>
                              <h2>¿Desea {gradesDetail.state ? "desabilitar" : "habilitar"} el grado: {gradesDetail.gradename}?</h2>
                              {
                                   gradesDetail.state
                                   && <button className={style.button_action} onClick={() => banToGrade(gradesDetail.id)}>Desabilitar grado</button>
                                   // : <button className={style.button_action} onClick={() => restoreToAdmin(gradesDetail.id)}>Restaurar admin</button>
                              }
                         </div>
                    </div> : null
               }
          </>
     );
}

export default Grades;