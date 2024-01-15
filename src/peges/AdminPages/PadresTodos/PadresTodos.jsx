import { useState } from "react";
import VistaPadres from "../VistaPadres/VistaPadres";
const { VITE_BACK_URL } = import.meta.env;

const PadresTodos = () => {
  const [tipoPadres, setTipoPadres] = useState("All"); // Estado para controlar el tipo de padres a mostrar

  let urlEndpoint = ""; // Define las diferentes URL según el tipo de padres
  if (tipoPadres === "All") {
    urlEndpoint = `${VITE_BACK_URL}/admin/allParents`;
  } else if (tipoPadres === "Approved") {
    urlEndpoint = `${VITE_BACK_URL}/admin/parents-Active`;
  } else if (tipoPadres === "Pending") {
    urlEndpoint = `${VITE_BACK_URL}/admin/parents-Pending`;
  }

  return (
    <div>
      <h2 className="mt-4 mb-4">Padres Registrados</h2>
      <button
        className="btn btn-primary mx-1"
        onClick={() => setTipoPadres("All")}
      >
        Mostrar Todos
      </button>
      <button
        className="btn btn-primary mx-1"
        onClick={() => setTipoPadres("Approved")}
      >
        Mostrar Activos
      </button>
      <button
        className="btn btn-primary mx-1 my-1"
        onClick={() => setTipoPadres("Pending")}
      >
        Mostrar Pendientes
      </button>
      {/* Agrega más botones para cambiar el tipo de padres según sea necesario */}
      <VistaPadres urlEndpoint={urlEndpoint} />{" "}
      {/* Renderiza VistaPadres con la URL correspondiente */}
    </div>
  );
};

export default PadresTodos;
