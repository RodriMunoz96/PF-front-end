// SearchBar.js
import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";

const SearchBar = ({ value, onChange }) => {
  
  return (
    <Input
    type="text"
    placeholder="Buscar por Nombre/Apellido, Correo Electrónico o Documento"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="mb-3 my-2"
    />
    );
  };
 

export default SearchBar;
