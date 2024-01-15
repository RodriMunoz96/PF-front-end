import { useState } from "react";
import VistaEstudiantes from "../VistaEstudiantes/VistaEstudiantes";

const { VITE_BACK_URL } = import.meta.env;

const EstudiantesTodos = () => {
  const [studentStatus, setStudentStatus] = useState("All");

  let urlEndpoint = "";
  if (studentStatus === "All") {
    urlEndpoint = `${VITE_BACK_URL}/admin/allStudents`;
  } else if (studentStatus === "Approved") {
    urlEndpoint = `${VITE_BACK_URL}/admin/students-Active`;
  } else if (studentStatus === "Pending") {
    urlEndpoint = `${VITE_BACK_URL}/admin/students-Pending`;
  }

  return (
    <div>
      <h2 className="mt-4 mb-4">Estudiantes Registrados</h2>
      <button
        className="btn btn-primary mx-1"
        onClick={() => setStudentStatus("All")}
      >
        Mostrar Todos
      </button>
      <button
        className="btn btn-primary mx-1"
        onClick={() => setStudentStatus("Approved")}
      >
        Mostrar Activos
      </button>
      <button
        className="btn btn-primary mx-1 my-1"
        onClick={() => setStudentStatus("Pending")}
      >
        Mostrar Pendientes
      </button>
      <VistaEstudiantes urlEndpoint={urlEndpoint} />{" "}
    </div>
  );
};

export default EstudiantesTodos;

// import { useCallback, useEffect, useState } from "react";
// import {
//   Container,
//   Card,
//   CardBody,
//   CardTitle,
//   CardSubtitle,
//   Table,
// } from "react-bootstrap";

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const [ordenAscendente, setOrdenAscendente] = useState(true);
//   const [orderBy, setOrderBy] = useState("name"); // Estado para rastrear la columna actualmente ordenada

//   const fetchData = useCallback(() => {
//     const url = `http://localhost:3000/admin/allStudents?sort=${orderBy}&order=${
//       ordenAscendente ? "ASC" : "DESC"
//     }`;

//     fetch(url)
//       .then((response) => response.json())
//       .then((data) => setStudents(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, [ordenAscendente, orderBy]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const toggleOrden = (columna) => {
//     if (orderBy !== columna) {
//       setOrderBy(columna);
//       setOrdenAscendente(true);
//     } else {
//       setOrdenAscendente((prev) => !prev);
//     }
//   };

//   return (
//     <Container>
//       <h2 className="mt-4 mb-4">Estudiantes</h2>
//       <Card>
//         <CardBody>
//           <CardTitle tag="h5">Estudiantes Inscriptos/En espera</CardTitle>
//           <br />
//           <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
//           <div className="d-flex  align-items-center mb-3">
//             <div>
//               <button
//                 className="btn btn-primary"
//                 onClick={() => toggleOrden("nombres")}
//               >
//                 Ordenar por Nombre{" "}
//                 {orderBy === "nombres" ? (ordenAscendente ? "↓" : "↑") : ""}
//               </button>
//             </div>
//             <div className="mx-5 ms-4">
//               <button
//                 className="btn btn-primary"
//                 onClick={() => toggleOrden("idDocumento")}
//               >
//                 Ordenar por Documento{" "}
//                 {orderBy === "idDocumento" ? (ordenAscendente ? "↓" : "↑") : ""}
//               </button>
//             </div>
//           </div>
//           <hr />
//           <Table responsive striped bordered hover>
//             <thead>
//               <tr>
//                 <th>Nombre</th>
//                 <th>Documento</th>
//                 <th>Telefono Emergencia</th>
//                 <th>Estado</th>
//               </tr>
//             </thead>
//             <tbody>
//               {students.map((student) => (
//                 <tr key={student.id}>
//                   <td>{`${student.nombres} ${student.apellidoPat} `}</td>
//                   <td>{student.idDocumento}</td>
//                   <td>{student.contactoEmerg}</td>
//                   <td>{student.validate ? "Verificado✅" : "Pendiente❗"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </CardBody>
//       </Card>
//     </Container>
//   );
// };

// export default AllStudents;
