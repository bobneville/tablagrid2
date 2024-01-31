import * as React from 'react';
import moment from "moment";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,  
  esES,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};



const initialRows = [ 
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = randomId();
    setRows((oldRows) => [...oldRows, {
      id,
      numero_factura_tasadora: '',
      fecha_factura_tasadora: '',
      referencia: '',
      tipo_factura: 'U',
      ingreso_tasadora_neto_factura: '',
      isNew: true
    }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'numero_factura_tasadora' },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Añadir factura
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowAdd = (newRow) => {
    // Aquí puedes realizar tu validación
    // Por ejemplo, validar si el nuevo elemento cumple con ciertas condiciones antes de añadirlo

    // Supongamos que queremos validar que el campo 'name' no esté vacío
    if (!newRow.numero_factura_tasadora) {
      alert('El campo numero_factura_tasadora no puede estar vacío');
      return;
    }

    // Si pasa la validación, añadimos la nueva fila
    setRows((prevRows) => [...prevRows, newRow]);
  };


  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    
   debugger;

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  

  const columns = [    
     { field: 'numero_factura_tasadora', headerName: 'Factura', width: 120, editable: true
    // ,    
    // preProcessEditCellProps(params) {      
    //   //debugger;
    //   const invalid = params.props.value.length < 1;    
    //   return { ...params.props, error: invalid }    
    // }
  
  },
    {
      field: 'fecha_factura_tasadora',
      headerName: 'Fecha',
      type: 'date',
      width: 120,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      valueFormatter: params =>
        moment(params?.value).format("DD/MM/YYYY"),
        preProcessEditCellProps(params) {      
          //debugger;
          const invalid = params.props.value === null || params.props.value === 'undefined' || params.props.value === 'Invalid date';    
          return { ...params.props, error: invalid }    
        }

    },
    { field: 'referencia', headerName: 'Referencia', width: 120, editable: true, 
    preProcessEditCellProps(params) {      
      //debugger;
      const invalid = params.props.value.length < 1;    
      return { ...params.props, error: invalid }    
    }

  },
    { field: 'tipo_factura', headerName: 'Tipo', width: 25, editable: true },
    { field: 'ingreso_tasadora_neto_factura', headerName: 'Ingreso neto', type: 'number', align: 'right', width: 110, editable: true },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Guardar"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Borrar"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}                
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}