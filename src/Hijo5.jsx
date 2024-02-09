import React, { useState } from 'react';
import  DataGrid  from 'react-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Hijo5 = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [action, setAction] = useState('add'); // 'add' o 'edit'

  const handleAddRow = () => {
    setAction('add');
    setRowData({});
    setOpen(true);
  };

  const handleEditRow = (row) => {
    setAction('edit');
    setRowData(row);
    setOpen(true);
  };

  const handleDeleteRow = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

  const handleSave = () => {
    if (action === 'add') {
      setData([...data, rowData]);
    } else if (action === 'edit') {
      const updatedData = [...data];
      const rowIndex = updatedData.findIndex(item => item.id === rowData.id);
      updatedData[rowIndex] = rowData;
      setData(updatedData);
    }
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRowData({ ...rowData, [name]: value });
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleAddRow}>Añadir fila</Button>
      <DataGrid
        columns={[
          { key: 'id', name: 'ID' },
          { key: 'name', name: 'Name' },
          { key: 'age', name: 'Age' },
          { key: 'actions', name: 'Actions', formatter: ({ row }) => (
            <>
              <Button variant="contained" color="primary" onClick={() => handleEditRow(row)}>Editar</Button>
              <Button variant="contained" color="error" onClick={() => handleDeleteRow(row.index)}>Eliminar</Button>
            </>
          )},
        ]}
        rows={data}
      />
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{action === 'add' ? 'Añadir fila' : 'Editar fila'}</DialogTitle>
        <DialogContent>
          <TextField label="ID" name="id" value={rowData.id || ''} onChange={handleInputChange} />
          <TextField label="Name" name="name" value={rowData.name || ''} onChange={handleInputChange} />
          <TextField label="Age" name="age" value={rowData.age || ''} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave} color="primary">Guardar</Button>
          <Button onClick={() => setOpen(false)} color="secondary">Cancelar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Hijo5;
