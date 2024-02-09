// Componente Hijo
import React, { useState, forwardRef, useImperativeHandle } from 'react';

const Hijo3 = forwardRef((props, ref) => {
  const [rows, setRows] = useState([]);

  const handleLoadData = () => {
    // Simulación de carga de datos
    const data = [
      { id: 1, name: 'John Doe', age: 30, city: 'New York' },
      { id: 2, name: 'Jane Smith', age: 25, city: 'Los Angeles' },
      { id: 3, name: 'Bob Johnson', age: 40, city: 'Chicago' }
    ];
    setRows(data);
  };

  // Función para exponer los datos al componente padre
  useImperativeHandle(ref, () => ({
    getData: () => {
      return rows;
    }
  }));

  return (
    <div>
      <h2>Componente Hijo</h2>
      <button onClick={handleLoadData}>Cargar Datos</button>
    </div>
  );
});

export default Hijo3;
