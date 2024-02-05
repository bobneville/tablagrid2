import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { XMLBuilder } from 'fast-xml-parser';


function Demo5() {
  const [formData, setFormData] = useState({ nombre: '', apellidos: '' });
  const [gridData, setGridData] = useState([]);
  const [xmlGenerated, setXmlGenerated] = useState('');

  // Función para manejar cambios en el formulario
  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Función para manejar clic en el botón de generación de XML
  const handleGenerateXML = () => {
    // Leer los datos del formulario y el DataGrid
    const xmlData = {
      formData: formData,
      gridData: gridData,
      timestamp: new Date().toISOString() // Agregar la fecha y hora en formato ISO
    };

    // Convertir a XML usando fast-xml-parser
    const builder = new XMLBuilder()
    const xml = builder.build( {data:xmlData} );

//    const xml = fastXmlParser.convertToXml({ data: xmlData });

    // Establecer el XML generado y mostrarlo en la consola
    setXmlGenerated(xml);
    console.log(xml);
  };

  // Configuración de columnas para el DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'firstName', headerName: 'First name', width: 150 },
    { field: 'lastName', headerName: 'Last name', width: 150 },
    { field: 'age', headerName: 'Age', type: 'number', width: 110 },
  ];

  // Datos de ejemplo para el DataGrid
  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  return (
    <div>
      {/* Formulario */}
      <TextField
        id="nombre"
        name="nombre"
        label="Nombre"
        variant="outlined"
        value={formData.nombre}
        onChange={handleFormChange}
      />
      <TextField
        id="apellidos"
        name="apellidos"
        label="Apellidos"
        variant="outlined"
        value={formData.apellidos}
        onChange={handleFormChange}
      />
      {/* DataGrid */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onSelectionModelChange={(newSelection) => {
            setGridData(newSelection.selectionModel);
          }}
        />
      </div>
      {/* Botón para generar XML */}
      <Button variant="contained" color="primary" onClick={handleGenerateXML}>
        Generate XML
      </Button>
      {/* Mostrar el XML generado */}
      <div>
        <h2>XML Generated:</h2>
        <pre>{xmlGenerated}</pre>
      </div>
    </div>
  );
}

export default Demo5;
