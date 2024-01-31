import React, { useState,  useRef } from 'react';
import moment from "moment";
import { DataGrid, esES } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';


const Demo2 = () => {
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editRowId, setEditRowId] = useState(null);
  const [newRow, setNewRow] = useState({ id: '', 
  numero_factura_tasadora: '',
  fecha_factura_tasadora: '',
  referencia: '',
  tipo_factura: 'N',
  ingreso_tasadora_neto_factura: '',
  ingreso_tasadora_impuesto_factura: '',
  ingreso_tasadora_total_factura: '',
  estado_factura: 'O',


});
    const dataGridRef = useRef(null);  
  const [validationErrors, setValidationErrors] = useState({
    numero_factura_tasadora: false,
    fecha_factura_tasadora: false,
    referencia: false,
    tipo_factura: false,
    ingreso_tasadora_neto_factura: false,
    ingreso_tasadora_impuesto_factura: false,
    ingreso_tasadora_total_factura: false,
    estado_factura: false,
    // importe_neto_factura_tasador: false,
    // importe_iva_factura_tasador: false,
    // importe_total_factura_tasador: false,
    // total_dias_uci: false,
    // total_dias_tasadora: false,
  });  

  const handleEditCellChange = (editCellChangeParams) => {
    const { id, field, props } = editCellChangeParams;

    // Validación al editar una celda
    if (field === 'numero_factura_tasadora' && props.value === '') {
      alert('Debe indicar el número de factura');
      return false;
    }

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
    setNewRow({ numero_factura_tasadora: '',
    fecha_factura_tasadora: '',
    referencia: '',
    tipo_factura: 'N',
    ingreso_tasadora_neto_factura: '', 
    ingreso_tasadora_impuesto_factura: '', 
    ingreso_tasadora_total_factura: '', 
    estado_factura: 'O',});
    setValidationErrors({
        numero_factura_tasadora: false,
        fecha_factura_tasadora: false,
        referencia: false,
        tipo_factura: false,
        ingreso_tasadora_neto_factura: false,
        ingreso_tasadora_impuesto_factura: false,
        ingreso_tasadora_total_factura: false,
        estado_factura: false,
        // importe_neto_factura_tasador: false,
        // importe_iva_factura_tasador: false,
        // importe_total_factura_tasador: false,
        // total_dias_uci: false,
        // total_dias_tasadora: false,
});


  };

  const handleSaveRow = () => {    
    const errors = {
        numero_factura_tasadora: !newRow.numero_factura_tasadora,
        fecha_factura_tasadora: !newRow.fecha_factura_tasadora,
        referencia: !newRow.referencia,
        tipo_factura: !newRow.tipo_factura,
        ingreso_tasadora_neto_factura: !newRow.ingreso_tasadora_neto_factura,
        ingreso_tasadora_impuesto_factura: !newRow.ingreso_tasadora_impuesto_factura,
        ingreso_tasadora_total_factura: !newRow.ingreso_tasadora_total_factura,
        estado_factura: !newRow.estado_factura,
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
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        ref={dataGridRef}
        rows={rows}
        columns={[
          { field: 'id', headerName: 'Orden', width: 40 },
          { field: 'numero_factura_tasadora', headerName: 'Factura', width: 120, editable: true },
          { field: 'fecha_factura_tasadora', headerName: 'Fecha', type: 'date', width: 120, editable: true,  valueFormatter: params =>
          moment(params?.value).format("DD/MM/YYYY") },
          { field: 'referencia', headerName: 'Referencia', width: 120, editable: true },
          { field: 'tipo_factura', headerName: 'Tipo', width: 50, editable: true },
          { field: 'ingreso_tasadora_neto_factura', headerName: 'Ingreso neto', type: 'number', align: 'right', width: 110, editable: true },                              
           { field: 'ingreso_tasadora_impuesto_factura', headerName: 'Impuestos', type: 'number', align: 'right', width: 110, editable: true },                              
           { field: 'ingreso_tasadora_total_factura', headerName: 'Total', type: 'number', align: 'right', width: 110, editable: true },                              
           { field: 'estado_factura', headerName: 'Estado', width: 55, editable: true },
          {
            field: 'actions',
            headerName: 'Acciones',
            width: 250,
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
        pageSize={10}
        rowsPerPageOptions={[10, 20]}        
        disableSelectionOnClick
        onEditCellChange={handleEditCellChange}
        onCellDoubleClick={(params) => handleEditRow(params.id)}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editRowId ? 'Editar factura' : 'Añadir factura'}</DialogTitle>        
        <DialogContent>        
          <TextField
            autoFocus
            required
            margin="dense"
            id="numero_factura_tasadora"
            label="Factura"
            type="text"        
            size="small"    
            value={newRow.numero_factura_tasadora}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, numero_factura_tasadora: e.target.value })}
            error={validationErrors.numero_factura_tasadora}
            helperText={validationErrors.numero_factura_tasadora ? 'Campo obligatorio' : ''}
          />
          
          <TextField
            margin="dense"
            required
            id="fecha_factura_tasadora"
            label="Fecha factura"
            size="small"
            type="date"            
            value={newRow.fecha_factura_tasadora}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, fecha_factura_tasadora: e.target.value })}
            error={validationErrors.fecha_factura_tasadora}
            helperText={validationErrors.fecha_factura_tasadora ? 'La fecha de factura es obligatoria' : ''}
          />
                    
          <TextField
            autoFocus
            required
            margin="dense"
            id="referencia"
            label="Referencia"
            size="small"
            type="text"
            fullWidth
            value={newRow.referencia}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, referencia: e.target.value })}
            error={validationErrors.referencia}
            helperText={validationErrors.referencia ? 'La referencia es obligatoria' : ''}            
          />
          
        <TextField
            select
            margin="dense"
            id="tipo_factura"
            label="Tipo"       
            size="small"     
            value={newRow.tipo_factura}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, tipo_factura: e.target.value })}
          >
            <MenuItem value="N">N</MenuItem>            
          </TextField>

          <TextField
            margin="dense"
            required
            id="ingreso_tasadora_neto_factura"
            label="Ingreso neto"
            size="small"
            type="number"            
            value={newRow.ingreso_tasadora_neto_factura}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, ingreso_tasadora_neto_factura: e.target.value })}
            error={validationErrors.ingreso_tasadora_neto_factura}
            helperText={validationErrors.ingreso_tasadora_neto_factura ? 'Campo obligatorio' : ''}            
          />

        <TextField
            margin="dense"
            required
            id="ingreso_tasadora_impuesto_factura"
            label="Impuestos"
            size="small"
            type="number"            
            value={newRow.ingreso_tasadora_impuesto_factura}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, ingreso_tasadora_impuesto_factura: e.target.value })}
            error={validationErrors.ingreso_tasadora_impuesto_factura}
            helperText={validationErrors.ingreso_tasadora_impuesto_factura ? 'Campo obligatorio' : ''}            
          />

        <TextField
            margin="dense"
            required
            id="ingreso_tasadora_total_factura"
            label="Total"
            size="small"
            type="number"            
            value={newRow.ingreso_tasadora_total_factura}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, ingreso_tasadora_total_factura: e.target.value })}
            error={validationErrors.ingreso_tasadora_total_factura}
            helperText={validationErrors.ingreso_tasadora_total_factura ? 'Campo obligatorio' : ''}            
          />          

        <TextField style={{width: 70}}
            select
            margin="dense"
            id="estado_factura"
            label="Estado"     
            size="small"       
            value={newRow.estado_factura}
            InputLabelProps={{ sx: { fontSize: "14px" }, shrink: true }}
            onChange={(e) => setNewRow({ ...newRow, estado_factura: e.target.value })}
          >
            <MenuItem value="O">0</MenuItem>            
          </TextField>
          

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

export default Demo2;
