import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudentsByParents } from "../../../../redux/actions/actions-students";
import { getParentId } from "../../../../redux/actions/actions-parents";
import axios from "axios";
import style from "./myChildren.module.css";
import { Card, Button } from "react-bootstrap";
import { getAllGrades } from "../../../../redux/actions/action-grades";
import { useState } from "react";
const { VITE_BACK_URL } = import.meta.env;

function MyChildren() {
  const dispatch = useDispatch();
  const [idGradoSeleccionado, setIdGradoSeleccionado] = useState("");
  const grados = useSelector((state) => state.allGrades);
  const parentId = useSelector((state) => state.parentId);
  const { estudianteDetail } = useSelector((state) => state.studentsByParent);
  const gradoSeleccionado = grados.find(
    (grado) => grado.id === idGradoSeleccionado
  );

  const filteredParentId =
    parentId &&
    parentId.parentDetails &&
    parentId.parentDetails[0] &&
    parentId.parentDetails[0].id;
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    console.log("Lo que hay en estudianteDetail:", estudianteDetail);

    dispatch(getParentId(userId));

    if (filteredParentId) {
      dispatch(getStudentsByParents(filteredParentId));
    }
  }, [dispatch, filteredParentId]);

  useEffect(() => {
    dispatch(getAllGrades());
  }, [dispatch]);
  //MercadoPago
  const FuncionComprar = async (studentId, gradeId) => {
    const producto = {
      studentId,
      gradeId,
      parentid: filteredParentId,
      id: toString(Math.floor(10000000 + Math.random() * 89999999)),
      title: "Inscripcion",
      unit_price: 1500,
      quantity: 1,
    };
    try {
      const response = await axios.post(
        `${VITE_BACK_URL}/mercadopago`,
        producto
      );
      console.log("response", response);
      window.location.href = response.data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
    }
  };
  //MercadoPago

  const onChangeGrade = (e) => {
    setIdGradoSeleccionado(e.target.value);
  };

  return (
    <div>
      <h2>Lista de Estudiantes matriculados</h2>
      {estudianteDetail ? (
        estudianteDetail.length > 0 ? (
          <div>
            {estudianteDetail.map((student) => (
              <Card key={student.id} className={style.studentCard}>
                <Card.Img
                  variant="top"
                  src={student.fotoPerfil}
                  className={style.image}
                />
                <Card.Body>
                  <Card.Title>Nombre: {student.nombres}</Card.Title>
                  <Card.Text>
                    Apellidos: {student.apellidoPat} {student.apellidoMat}
                  </Card.Text>
                  <Card.Text>Documento: {student.idDocumento}</Card.Text>

                  {student.validate ? (
                    <select name="grados" id="grados" onChange={onChangeGrade}>
                      <option value="" selected>
                        Seleccionar un grado
                      </option>
                      {grados.map((grado) => (
                        <option key={grado.id} value={grado.id}>
                          {grado.gradename}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p>
                      El estudiante está en proceso de validación por parte del
                      administrador escolar.
                    </p>
                  )}
                  {gradoSeleccionado && !gradoSeleccionado.state && (
                    <p>El curso seleccionado no tiene cupos</p>
                  )}
                  {!student.estadoPago &&
                    student.validate &&
                    gradoSeleccionado &&
                    gradoSeleccionado.state && (
                      <Button
                        name="paymet"
                        onClick={() =>
                          FuncionComprar(student.id, idGradoSeleccionado)
                        }
                        className={style.link_to_paymet}
                      >
                        Pagar Aquí
                      </Button>
                    )}
                  {student.estadoPago && (
                    <p>
                      Este estudiante finalizó el proceso de inscripción con
                      éxito en el grado seleccionado.
                    </p>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <p>No ha matriculado a ningún estudiante</p>
        )
      ) : (
        <p>Primero debe completar sus datos como padre</p>
      )}
    </div>
  );
}

export default MyChildren;
