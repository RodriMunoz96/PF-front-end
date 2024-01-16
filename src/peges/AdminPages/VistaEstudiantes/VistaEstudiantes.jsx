import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  // CardSubtitle,
  Table,
} from "react-bootstrap";
import SearchBarStudents from "../SearchBarStudent/SearchBarStudents";
import PaginationComponent from "../VistaPadres/PaginationComponent";

const VistaEstudiantes = ({ urlEndpoint }) => {
  const [students, setStudents] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [orderBy, setOrderBy] = useState("nombres");
  const [searchBy, setSearchBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  VistaEstudiantes.propTypes = {
    urlEndpoint: PropTypes.string.isRequired,
  };

  const fetchData = useCallback(() => {
    const url = `${urlEndpoint}?sort=${orderBy}&order=${
      ordenAscendente ? "asc" : "desc"
    }`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching data:", error));
    setCurrentPage(1);
  }, [ordenAscendente, orderBy, urlEndpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleOrden = (columna) => {
    if (orderBy !== columna) {
      setOrderBy(columna);
      setOrdenAscendente(true);
    } else {
      setOrdenAscendente((prev) => !prev);
    }
  };

  const handleSearchInputChange = (value) => {
    setSearchBy(value);
  };

  const busquedaStudents = students.filter((student) =>
    `${student.nombres} ${student.apellidoPat} ${student.apellidoMat} ${student.idDocumento}`
      .toLowerCase()
      .includes(searchBy.toLowerCase())
  );

  const handlePaginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container>
      <Card>
        <CardBody>
          <CardTitle tag="h5" className="my-3">
            ¿Prefiere una búsqueda?
          </CardTitle>
          <SearchBarStudents
            value={searchBy}
            onChange={handleSearchInputChange}
          />{" "}
          <CardTitle tag="h5" className="my-3">
            Listado de Estudiantes
          </CardTitle>
          <div className="d-flex  align-items-center mb-3">
            <div>
              <button
                className="btn btn-primary"
                onClick={() => toggleOrden("nombres")}
              >
                Ordenar por Nombre{" "}
                {orderBy === "nombres" ? (ordenAscendente ? "↓" : "↑") : ""}
              </button>
            </div>
            <div className="mx-5 ms-4">
              <button
                className="btn btn-primary"
                onClick={() => toggleOrden("idDocumento")}
              >
                Ordenar por Documento{" "}
                {orderBy === "idDocumento" ? (ordenAscendente ? "↓" : "↑") : ""}
              </button>
            </div>
          </div>
          <hr />
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Telefono Emergencia</th>
                <th>Estado</th>
                <th>Estado del Pago</th>
              </tr>
            </thead>
            <tbody>
              {busquedaStudents
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  (currentPage - 1) * itemsPerPage + itemsPerPage
                )
                .map((student) => (
                  <tr key={student.id}>
                    <td>
                      <Link
                        to={`studentDetail/${student.id}`}
                      >{`${student.nombres} ${student.apellidoPat} ${student.apellidoMat} `}</Link>
                    </td>
                    <td>{student.idDocumento}</td>
                    <td>{student.contactoEmerg}</td>
                    <td>{student.validate ? "Verificado✅" : "Pendiente❗"}</td>
                    <td>{student.estadoPago ? "Pagado✅" : "Adeudado❗"}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-center mt-3 my-4">
        <PaginationComponent
          itemsPerPage={itemsPerPage}
          totalItems={busquedaStudents.length}
          paginate={handlePaginate}
        />
      </div>
    </Container>
  );
};

export default VistaEstudiantes;
