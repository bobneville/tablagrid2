// Componente Hijo
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'city', headerName: 'City', width: 150 },
];

function ChildComponent({ updateGridData }) {
  // Estado para almacenar los datos del DataGrid
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // Simulación de carga de datos iniciales
    console.log("Cargando datos iniciales...");
    const initialData = [
      { id: 1, name: 'John Doe', age: 30, city: 'New York' },
      { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { id: 3, name: 'Bob Johnson', age: 40, city: 'Chicago' },
      // Añade más filas según sea necesario
    ];
    console.log("Datos iniciales cargados:", initialData);
    
    // Actualizar el estado del componente hijo con los datos iniciales
    setRows(initialData);
  }, []);

  // Función para manejar cambios en el DataGrid y actualizar el estado del padre
  const handleGridChange = (newRows) => {
    console.log("Cambio en el DataGrid:", newRows);
    setRows(newRows);
    updateGridData(newRows); // Llamar a la función de callback del padre para actualizar sus datos
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* DataGrid con sus propios datos y función de callback */}
      {rows.length > 0 && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          onRowsChange={(newRows) => handleGridChange(newRows.rows)}
        />
      )}
    </div>
  );
}

export default ChildComponent;


