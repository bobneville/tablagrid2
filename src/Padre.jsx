import React, { useRef } from 'react';
import Hijo3 from './Hijo3';

const ParentComponent = () => {
  // Referencia para acceder al componente hijo
  const childRef = useRef(null);

  const handleShowData = () => {
    if (childRef.current) {
      // Llamar a la función en el componente hijo para obtener los datos
      const childData = childRef.current.getData();
      if (childData.length === 0) {
        console.error("No hay.");  
      }
      else {
         console.table(childData);
    }
    } else {
      console.error("Error: childRef es null o undefined.");
    }
  };

  return (
    <div>
      <h1>Componente Padre</h1>
      <button onClick={handleShowData}>Mostrar Datos del Hijo</button>
      {/* Pasar una referencia al componente hijo */}
      <Hijo3 ref={childRef} />
    </div>
  );
};

export default ParentComponent;