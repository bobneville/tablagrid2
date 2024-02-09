import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Doe', age: 25 },
  ]);

  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleOpen = (rowData, editMode) => {
    setRowData(rowData);
    setEditMode(editMode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Guardar los datos aquí (agregar o editar según corresponda)
    setOpen(false);
  };

  const handleAdd = () => {
    handleOpen({}, false);
  };

  return (
    <div>
      <MaterialTable
        title="Data"
        columns={[
          { title: 'ID', field: 'id', editable: 'never' },
          { title: 'Name', field: 'name' },
          { title: 'Age', field: 'age' },
        ]}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                resolve();
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const updatedData = [...data];
                const index = updatedData.findIndex(item => item.id === oldData.id);
                updatedData[index] = newData;
                setData(updatedData);
                resolve();
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const updatedData = data.filter(item => item.id !== oldData.id);
                setData(updatedData);
                resolve();
              }, 600);
            }),
        }}
        actions={[
          {
            icon: AddIcon,
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: handleAdd,
          },
          {
            icon: EditIcon,
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleOpen(rowData, true),
          },
          {
            icon: DeleteIcon,
            tooltip: 'Delete User',
            onClick: (event, rowData) => alert('You want to delete ' + rowData.name),
          },
        ]}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editMode ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={rowData.name || ''} onChange={e => setRowData({ ...rowData, name: e.target.value })} />
          <TextField label="Age" value={rowData.age || ''} onChange={e => setRowData({ ...rowData, age: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
