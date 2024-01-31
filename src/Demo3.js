import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import moment from "moment";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const Demo3 = () => {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [newRow, setNewRow] = useState({ id: '', name: '', age: '', gender: '', dob: '' });
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    age: false,
    gender: false,
    dob: false,
  });

  const handleEditCellChange = (editCellChangeParams) => {
    const { id, field, props } = editCellChangeParams;

    // Si la validación pasa, actualiza la fila
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: props.value,
            }
          : row
      )
    );

    return true;
  };

  const handleAddRow = () => {
    setOpenDialog(true);
  };

  const handleEditRow = (id) => {
    setOpenDialog(true);
    setEditRowId(id);
    const editRow = rows.find((row) => row.id === id);
    if (editRow) {
      setNewRow({ ...editRow });
    }
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditRowId(null);
    setNewRow({ id: '', name: '', age: '', gender: '', dob: '' });
    setValidationErrors({
      name: false,
      age: false,
      gender: false,
      dob: false,
    });
  };

  const handleSaveRow = () => {
    const errors = {
      name: !newRow.name,
      age: !newRow.age,
      gender: !newRow.gender,
      dob: !newRow.dob,
    };

    // Verificar si hay errores de validación
    if (Object.values(errors).some((error) => error)) {
      setValidationErrors(errors);
      return;
    }

    if (editRowId !== null) {
      // Editar fila existente
      const updatedRows = rows.map((row) => (row.id === editRowId ? newRow : row));
      setRows(updatedRows);
    } else {
      // Añadir nueva fila
      setRows([...rows, { ...newRow, id: rows.length + 1 }]);
    }
    handleCloseDialog();
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" onClick={handleAddRow} style={{ marginBottom: '10px' }}>
        Añadir Fila
      </Button>
      <DataGrid
        rows={rows}
        columns={[
          { field: 'id', headerName: 'ID', width: 90 },
          { field: 'name', headerName: 'Nombre', width: 150, editable: true },
          { field: 'age', headerName: 'Edad', type: 'number', width: 110, editable: true },
          {
            field: 'gender',
            headerName: 'Género',
            width: 110,
            editable: true,
            renderCell: (params) => (
              <TextField
                select
                value={params.value}
                onChange={(e) => handleEditCellChange({ ...params, props: { value: e.target.value } })}
                error={validationErrors.gender}
                helperText={validationErrors.gender ? 'El género es obligatorio' : ''}
                style={{ width: '100%' }}
              >
                <MenuItem value="U">U</MenuItem>
                <MenuItem value="I">I</MenuItem>
              </TextField>
            ),
          },
          {
            field: 'dob',
            headerName: 'Fecha de Nacimiento',
            type: 'date',
            width: 180,
            editable: true,
            valueFormatter: params =>
          moment(params?.value).format("DD/MM/YYYY"), 
            renderCell: (params) => (
              <TextField
                type="date"
                value={params.value}
                onChange={(e) => handleEditCellChange({ ...params, props: { value: e.target.value } })}
                error={validationErrors.dob}
                helperText={validationErrors.dob ? 'La fecha de nacimiento es obligatoria' : ''}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ),
          },
          {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
              <div>
                <Button variant="outlined" onClick={() => handleEditRow(params.row.id)}>
                  Editar
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteRow(params.row.id)}
                  style={{ marginLeft: '5px' }}
                >
                  Borrar
                </Button>
              </div>
            ),
          },
        ]}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        disableSelectionOnClick
        onEditCellChange={handleEditCellChange}
        onCellDoubleClick={(params) => handleEditRow(params.id)}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editRowId ? 'Editar Fila' : 'Añadir Fila'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre"
            type="text"
            fullWidth
            value={newRow.name}
            onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
            error={validationErrors.name}
            helperText={validationErrors.name ? 'El nombre es obligatorio' : ''}
          />
          <TextField
            margin="dense"
            id="age"
            label="Edad"
            type="number"
            fullWidth
            value={newRow.age}
            onChange={(e) => setNewRow({ ...newRow, age: e.target.value })}
            error={validationErrors.age}
            helperText={validationErrors.age ? 'La edad es obligatoria' : ''}
          />
          <TextField
            select
            margin="dense"
            id="gender"
            label="Género"
            fullWidth
            value={newRow.gender}
            onChange={(e) => setNewRow({ ...newRow, gender: e.target.value })}
            error={validationErrors.gender}
            helperText={validationErrors.gender ? 'El género es obligatorio' : ''}
          >
            <MenuItem value="U">U</MenuItem>
            <MenuItem value="I">I</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            id="dob"
            label="Fecha de Nacimiento"
            type="date"
            fullWidth
            value={newRow.dob}
            onChange={(e) => setNewRow({ ...newRow, dob: e.target.value })}
            error={validationErrors.dob}
            helperText={validationErrors.dob ? 'La fecha de nacimiento es obligatoria' : ''}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSaveRow} variant="contained" color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Demo3;
