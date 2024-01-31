import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { StyledEngineProvider } from '@mui/material/styles';
import Demo from './Demo';
import Demo2 from './Demo2';
import Demo3 from './Demo3';

ReactDOM.createRoot(document.querySelector("#root")).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <Demo2 />
    </StyledEngineProvider>
  </React.StrictMode>
);