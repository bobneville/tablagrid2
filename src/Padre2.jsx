import React, { useState } from 'react';
import Hijo5 from './Hijo5';

import { Button } from '@mui/material';

const Padre2 = () => {
  const [data, setData] = useState([]);

  const handleReadData = () => {
    console.log(data);
  };

  return (
    <>
      <Hijo5 data={data} setData={setData} />
      <Button variant="contained" color="primary" onClick={handleReadData}>Leer datos del grid</Button>
    </>
  );
}

export default Padre2;