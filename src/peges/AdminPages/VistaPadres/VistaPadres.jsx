import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
} from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar"; // Importa el componente de búsqueda
import PaginationComponent from "./PaginationComponent.jsx";

const VistaPadres = ({ urlEndpoint }) => {
  const [padres, setPadres] = useState([]);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [orderBy, setOrderBy] = useState("name");
  const [searchBy, setSearchBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  VistaPadres.propTypes = {
    urlEndpoint: PropTypes.string.isRequired, // Valida que urlEndpoint sea de tipo string y sea requerido
  };

  const fetchData = useCallback(() => {
    const url = `${urlEndpoint}?sort=${orderBy}&order=${
      ordenAscendente ? "asc" : "desc"
    }`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setPadres(data))
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

  const busquedaParents = padres.filter((padre) =>
    `${padre.name} ${padre.lastName} ${padre.email} ${padre.idDoc}`
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
          <SearchBar value={searchBy} onChange={handleSearchInputChange} />{" "}
          <CardTitle tag="h5" className="my-3">
            Listado de Padres
          </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6"></CardSubtitle>
          <div className="d-flex  align-items-center mb-3">
            <div>
              <button
                className="btn btn-primary"
                onClick={() => toggleOrden("name")}
              >
                Ordenar por Nombre{" "}
                {orderBy === "name" ? (ordenAscendente ? "↓" : "↑") : ""}
              </button>
            </div>
            <div className="mx-5 ms-4">
              <button
                className="btn btn-primary"
                onClick={() => toggleOrden("idDoc")}
              >
                Ordenar por Documento{" "}
                {orderBy === "idDoc" ? (ordenAscendente ? "↓" : "↑") : ""}
              </button>
            </div>
          </div>
          <hr />
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Correo Electrónico</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {busquedaParents
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((padre) => (
                  <tr key={padre.id}>
                    {/* <td>{`${padre.name} ${padre.lastName} `}</td> */}
                    <td>
                      <Link
                        to={`parentDetail/${padre.id}`}
                      >{`${padre.name} ${padre.lastName}`}</Link>
                    </td>
                    <td>{padre.idDoc}</td>
                    <td>{padre.email}</td>
                    <td>
                      {padre.validate
                        ? "Verificado✅"
                        : "Pendiente de validación❗"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
      <div className="d-flex justify-content-center mt-3 my-4">
        <PaginationComponent
          itemsPerPage={itemsPerPage}
          totalItems={busquedaParents.length}
          paginate={handlePaginate}
          className="mx-4"
        />
      </div>
    </Container>
  );
};

export default VistaPadres;
